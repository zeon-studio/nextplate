import { glob } from "glob";
import { parse } from "node-html-parser";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import TurndownService from "turndown";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG_PATH = path.join(__dirname, "../src/config/config.json");
const MANIFEST_PATH = path.join(__dirname, "../.generated/llms-manifest.json");

// ─── Default patterns to always skip ────────────────────────────────────────
const DEFAULT_EXCLUDES = [
  "node_modules",
  "_next",
  "404",
  "404.html",
  "not-found",
  "not-found.html",
  "_not-found",
  "_not-found.html",
  "error",
  "error.html",
  "_error",
  "_error.html",
  "global-error",
  "global-error.html",
  "_global-error",
  "_global-error.html",
  "**/*.xml",
  "**/*.txt",
];

// ─── URL path prefixes that are API / system routes ──────────────────────────
const API_ROUTE_PREFIXES = ["/api/", "/_", "/cdn-cgi/"];

function isApiRoute(urlPath) {
  return API_ROUTE_PREFIXES.some((prefix) => urlPath.startsWith(prefix));
}

// ─── Config ──────────────────────────────────────────────────────────────────
function getConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error("config.json not found");
  }

  const config = JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));

  if (!config.llms) {
    throw new Error("llms configuration not found in config.json");
  }

  return config;
}

// ─── Build output detection ──────────────────────────────────────────────────

/**
 * Detect Next.js build output directory.
 * For static export: out/
 * For App Router: .next/server/app
 * For Pages Router: .next/server/pages
 */
function detectBuildOutputDir() {
  // Check for static export first
  if (fs.existsSync(path.join(process.cwd(), "out"))) {
    return "./out";
  }

  // Check for App Router standalone/static build
  const appRouterDir = path.join(process.cwd(), ".next", "server", "app");
  if (fs.existsSync(appRouterDir)) {
    return "./.next/server/app";
  }

  // Check for Pages Router
  const pagesDir = path.join(process.cwd(), ".next", "server", "pages");
  if (fs.existsSync(pagesDir)) {
    return "./.next/server/pages";
  }

  return null;
}

// ─── Path helpers ────────────────────────────────────────────────────────────

function normalizePattern(baseDir, pattern) {
  const cleanPattern = pattern.replace(/^\/+/, "");
  const fullPath = path.join(baseDir, cleanPattern);

  try {
    if (fs.statSync(fullPath).isDirectory()) {
      return path.join(fullPath, "**/*.html");
    }
  } catch {
    // treat as glob pattern
  }

  return fullPath;
}

async function discoverHtmlFiles(inputDir) {
  const patterns = [path.join(inputDir, "**/*.html")];

  const ignore = DEFAULT_EXCLUDES.map((p) => path.join(inputDir, p));

  let files = await glob(patterns, {
    ignore,
    absolute: true,
  });

  files = files.filter((f) => fs.statSync(f).isFile() && f.endsWith(".html"));

  return files.sort();
}

/**
 * Convert file path to URL path for Next.js.
 * Handles both App Router (about/page.html -> about, about.html -> about)
 * and Pages Router (about/index.html -> about, index.html -> /).
 */
function fileToUrlPath(filePath, inputDir) {
  const relativePath = filePath.replace(path.resolve(inputDir), "");
  let urlPath = relativePath.replace(/\\/g, "/").replace(/^\//, "");

  // Handle App Router nested page.html files
  if (urlPath.endsWith("/page.html")) {
    urlPath = urlPath.replace(/\/page\.html$/, "");
  } else {
    // Handle Pages Router or static export
    urlPath = urlPath.replace(/\.html$/, "");
    if (urlPath.endsWith("/index") || urlPath === "index") {
      urlPath = urlPath.replace(/\/index$/, "").replace(/^index$/, "");
    }
  }

  return "/" + urlPath;
}

function normalizeUrlPath(urlPath) {
  if (!urlPath) return "/";
  const withLeading = urlPath.startsWith("/") ? urlPath : `/${urlPath}`;
  return withLeading === "/" ? "/" : withLeading.replace(/\/+$/, "");
}

/**
 * Match a URL path against a pattern.
 *
 * Pattern syntax:
 *   /blog        → exact match for /blog
 *   /blog/       → prefix match (matches /blog/anything)
 *   /blog/*      → matches one segment under /blog/ (e.g. /blog/post-1)
 *   /blog/**     → matches any depth under /blog/
 *   /blog/page/* → matches one segment under /blog/page/
 */
function matchesPattern(urlPath, pattern) {
  if (!pattern || typeof pattern !== "string") return false;
  const trimmed = pattern.trim();
  if (!trimmed.startsWith("/")) return false;

  const normalizedPath = normalizeUrlPath(urlPath);

  // html-style exact match (e.g. /blog/index.html → /blog)
  if (trimmed.endsWith(".html")) {
    const htmlRoute = normalizeUrlPath(trimmed.replace(/\.html$/, ""));
    return normalizedPath === htmlRoute;
  }

  // Double wildcard /**  → recursive prefix match
  if (trimmed.endsWith("/**")) {
    const base = trimmed.slice(0, -3); // remove /**
    if (normalizedPath === base) return true;
    return normalizedPath.startsWith(`${base}/`);
  }

  // Single wildcard /*  → matches exactly one segment under the base
  if (trimmed.endsWith("/*")) {
    const base = trimmed.slice(0, -2); // remove /*
    if (!normalizedPath.startsWith(`${base}/`)) return false;
    const afterBase = normalizedPath.slice(base.length + 1);
    // must be exactly one non-empty segment (no further slashes)
    return afterBase.length > 0 && !afterBase.includes("/");
  }

  // Prefix match when pattern ends with /
  if (trimmed.endsWith("/")) {
    const base = trimmed.slice(0, -1); // remove trailing /
    if (normalizedPath === base) return true;
    return normalizedPath.startsWith(`${base}/`);
  }

  // Exact match
  return normalizedPath === normalizeUrlPath(trimmed);
}

function shouldExcludeRoute(urlPath, excludePatterns = []) {
  return excludePatterns.some((pattern) => matchesPattern(urlPath, pattern));
}

function shouldIncludeRoute(urlPath, includePatterns = []) {
  return includePatterns.some((pattern) => matchesPattern(urlPath, pattern));
}

// ─── HTML parsing helpers ────────────────────────────────────────────────────

function getTitle(root, titleSelector) {
  let el;
  if (titleSelector) el = root.querySelector(titleSelector);
  if (!el) el = root.querySelector("h1");
  if (!el) el = root.querySelector("h2");
  if (!el) el = root.querySelector("h3");
  if (!el) el = root.querySelector("title");
  return el?.text?.trim() || "";
}

function getContentElement(root, contentSelector) {
  let el;
  if (contentSelector) el = root.querySelector(contentSelector);
  if (!el) el = root.querySelector("main");
  if (!el) el = root.querySelector("body");
  if (!el) el = root.querySelector("html");
  return el;
}

async function processHtml(html, llmsConfig) {
  const root = parse(html);

  const title = getTitle(root, llmsConfig?.title_selector);

  const metaDescription = root.querySelector('meta[name="description"]');
  const description = metaDescription?.getAttribute("content")?.trim() || "";

  const contentElement = getContentElement(root, llmsConfig?.content_selector);
  let content = "";

  if (contentElement) {
    contentElement
      .querySelectorAll("script, style, noscript, iframe, svg")
      .forEach((el) => el.remove());

    const turndownService = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
      bulletListMarker: "-",
    });

    turndownService.addRule("removeChrome", {
      filter: ["nav", "footer", "header", "aside"],
      replacement: () => "",
    });

    content = turndownService.turndown(contentElement.innerHTML);
  }

  return { title, description, content };
}

async function processHtmlFile(filePath, llmsConfig) {
  const html = fs.readFileSync(filePath, "utf8");
  return processHtml(html, llmsConfig);
}

// ─── Fetch helpers ───────────────────────────────────────────────────────────

/**
 * Fetches a page from a server and processes it as HTML.
 * Returns null if the fetch fails or the page returns an error status.
 */
async function fetchAndProcessPage(url, llmsConfig) {
  try {
    const response = await fetch(url, {
      headers: { Accept: "text/html" },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) return null;

    const html = await response.text();
    return processHtml(html, llmsConfig);
  } catch {
    return null;
  }
}

// ─── Temporary server management ─────────────────────────────────────────────

const TEMP_PORT = 14321;
const TEMP_HOST = "127.0.0.1";

/**
 * Checks if a server is already reachable at the given URL.
 */
async function isServerRunning(url) {
  try {
    const r = await fetch(url + "/", {
      signal: AbortSignal.timeout(2_000),
      headers: { Accept: "text/html" },
    });
    return r.status < 500;
  } catch {
    return false;
  }
}

/**
 * Spawns the Next.js standalone server on TEMP_PORT and waits until it's ready.
 * Returns { process, baseUrl } or null if it can't be started.
 */
async function startTempServer(distFolder) {
  const standaloneServerPath = path.join(
    process.cwd(),
    ".next",
    "standalone",
    "server.js",
  );

  if (!fs.existsSync(standaloneServerPath)) {
    console.log(
      "   ⚠️  No standalone server entry (.next/standalone/server.js) found.",
    );
    return null;
  }

  console.log(
    `   Spawning built server on port ${TEMP_PORT} to render SSR pages...`,
  );

  const serverProcess = spawn(process.execPath, [standaloneServerPath], {
    env: {
      ...process.env,
      PORT: String(TEMP_PORT),
      HOST: TEMP_HOST,
    },
    stdio: ["ignore", "pipe", "pipe"],
    detached: false,
  });

  serverProcess.stderr.on("data", (d) => {
    if (process.env.LLMS_DEBUG) process.stderr.write(d);
  });

  const tempBaseUrl = `http://${TEMP_HOST}:${TEMP_PORT}`;

  // Poll until the server responds or timeout
  const ready = await new Promise((resolve) => {
    const TIMEOUT_MS = 20_000;
    const POLL_MS = 400;

    const deadline = setTimeout(() => {
      clearInterval(poll);
      resolve(false);
    }, TIMEOUT_MS);

    const poll = setInterval(async () => {
      try {
        const r = await fetch(tempBaseUrl + "/", {
          signal: AbortSignal.timeout(1_000),
        });
        if (r.status < 500) {
          clearInterval(poll);
          clearTimeout(deadline);
          resolve(true);
        }
      } catch {
        // not ready yet
      }
    }, POLL_MS);

    serverProcess.on("error", () => {
      clearInterval(poll);
      clearTimeout(deadline);
      resolve(false);
    });

    serverProcess.on("exit", (code) => {
      if (code !== null) {
        clearInterval(poll);
        clearTimeout(deadline);
        resolve(false);
      }
    });
  });

  if (!ready) {
    console.log("   ⚠️  Temp server did not become ready in time.");
    serverProcess.kill();
    return null;
  }

  console.log(`   ✓ Temp server ready at ${tempBaseUrl}`);
  return { process: serverProcess, baseUrl: tempBaseUrl };
}

function stopTempServer(serverHandle) {
  if (serverHandle?.process) {
    serverHandle.process.kill();
    console.log("   Stopped temporary server.\n");
  }
}

// ─── SSR page discovery from source ──────────────────────────────────────────

/**
 * Checks whether a non-dynamic route already has a corresponding HTML file
 * in the Next.js build output.
 */
function hasHtmlFile(urlPath, inputDir) {
  const htmlFileName = urlPath === "/" ? "index.html" : `${urlPath}.html`;
  const htmlPath = path.join(inputDir, htmlFileName);
  if (fs.existsSync(htmlPath)) return true;

  // App Router stores static pages as <route>/page.html
  const appRouterPath = path.join(inputDir, urlPath, "page.html");
  if (fs.existsSync(appRouterPath)) return true;

  return false;
}

/**
 * Scans src/app/ (App Router) or src/pages/ (Pages Router) for static
 * (non-dynamic) route files and returns their URL paths.
 * Dynamic routes ([slug]) and the api/ folder are excluded.
 */
function discoverSsrPageRoutes(srcDir, basePath, inputDir) {
  if (!fs.existsSync(srcDir)) return [];

  const isAppRouter = srcDir.endsWith("app");
  const routes = [];

  function scanDir(dir, urlPrefix) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const name = entry.name;

      // Skip hidden items, the api/ directory, and dynamic route directories
      if (
        name.startsWith(".") ||
        name === "api" ||
        name.startsWith("[") ||
        name.startsWith("_")
      )
        continue;

      const fullPath = path.join(dir, name);

      if (entry.isDirectory()) {
        scanDir(fullPath, `${urlPrefix}/${name}`);
      } else if (entry.isFile()) {
        // App Router: page.tsx, page.jsx, page.ts, page.js
        // Pages Router: .tsx, .jsx, .ts, .js (excluding _app, _document, _error)
        const isPageFile = isAppRouter
          ? /^page\.(tsx|jsx|ts|js)$/.test(name)
          : /\.(tsx|jsx|ts|js)$/.test(name) &&
            !/^_(app|document|error)/.test(name);

        if (!isPageFile) continue;

        const stem = isAppRouter ? "" : name.replace(/\.(tsx|jsx|ts|js)$/, "");

        if (stem === "404") continue;

        const routePath =
          stem === "" || stem === "index"
            ? urlPrefix || "/"
            : `${urlPrefix}/${stem}`;

        const normalizedRoute = routePath || "/";

        if (isApiRoute(normalizedRoute)) continue;

        // Only include routes that don't already have an HTML file
        if (!hasHtmlFile(normalizedRoute, inputDir)) {
          routes.push(normalizedRoute);
        }
      }
    }
  }

  scanDir(srcDir, basePath === "/" ? "" : basePath.replace(/\/$/, ""));

  return [...new Set(routes)].sort();
}

// ─── Output generators ────────────────────────────────────────────────────────

function generateMarkdownFile(page, siteUrl, basePath) {
  const basePathClean = basePath === "/" ? "" : basePath;
  const url = `${siteUrl}${basePathClean}${page.urlPath}`.replace(
    /(?<=.)\/$/,
    "",
  );

  let md = "---\n";
  md += `title: "${page.title.replace(/"/g, '\\"')}"\n`;
  md += `url: "${url}"\n`;
  if (page.description) {
    md += `description: "${page.description.replace(/"/g, '\\"')}"\n`;
  }
  md += "---\n\n";
  md += page.content;

  return md;
}

function generateLlmsTxtContent(
  pages,
  siteUrl,
  basePath,
  siteName,
  siteDescription,
  generateIndividualMd,
) {
  const basePathClean = basePath === "/" ? "" : basePath;
  let content = `# ${siteName}\n\n`;

  if (siteDescription) {
    content += `> ${siteDescription}\n\n`;
  }

  content +=
    "This file helps language models discover the most useful content on this site.\n\n";

  const grouped = {};
  pages.forEach((page) => {
    const parts = page.urlPath.split("/").filter(Boolean);
    const group = parts.length === 0 ? "Home" : parts[0];

    if (!grouped[group]) grouped[group] = [];
    grouped[group].push(page);
  });

  const sortedGroups = Object.keys(grouped).sort((a, b) => {
    if (a === "Home") return -1;
    if (b === "Home") return 1;
    return a.localeCompare(b);
  });

  sortedGroups.forEach((group) => {
    const groupName = group.charAt(0).toUpperCase() + group.slice(1);
    content += `## ${groupName}\n\n`;

    grouped[group].forEach((page) => {
      let linkUrl;
      if (generateIndividualMd) {
        const mdPath =
          page.urlPath === "/" ? "/index.md" : `${page.urlPath}.md`;
        linkUrl = `${siteUrl}${basePathClean}${mdPath}`.replace(
          /([^:])\/\//g,
          "$1/",
        );
      } else {
        linkUrl = `${siteUrl}${basePathClean}${page.urlPath}`.replace(
          /(?<=.)\/$/,
          "",
        );
      }
      const linkText = page.title || page.urlPath;

      if (page.description) {
        content += `- [${linkText}](${linkUrl}): ${page.description}\n`;
      } else {
        content += `- [${linkText}](${linkUrl})\n`;
      }
    });

    content += "\n";
  });

  return content;
}

function generateLlmsFullTxtContent(pages, siteUrl, basePath, siteName) {
  const basePathClean = basePath === "/" ? "" : basePath;
  let content = `# ${siteName}\n\n`;
  content += `URL: ${siteUrl}${basePathClean}\n\n`;

  pages.forEach((page, index) => {
    const url = `${siteUrl}${basePathClean}${page.urlPath}`.replace(
      /(?<=.)\/$/,
      "",
    );
    content += `## ${page.title}\n\n`;
    content += `URL: ${url}\n\n`;

    if (page.description) {
      content += `${page.description}\n\n`;
    }

    content += page.content;

    if (index < pages.length - 1) {
      content += "\n\n---\n\n";
    }
  });

  return content;
}

// ─── Cleanup helpers ─────────────────────────────────────────────────────────

function removeFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
  } catch {
    // ignore
  }
  return false;
}

function removeEmptyDirectories(dir) {
  let removedCount = 0;

  function scan(currentDir) {
    if (!fs.existsSync(currentDir)) return;

    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        scan(path.join(currentDir, entry.name));
      }
    }

    const remaining = fs.readdirSync(currentDir);
    if (remaining.length === 0 && currentDir !== dir) {
      try {
        fs.rmdirSync(currentDir);
        removedCount++;
      } catch {
        // ignore
      }
    }
  }

  scan(dir);
  return removedCount;
}

function readManifest() {
  try {
    if (fs.existsSync(MANIFEST_PATH)) {
      return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
    }
  } catch {
    // ignore corrupted manifest
  }
  return null;
}

function writeManifest(files) {
  try {
    const dir = path.dirname(MANIFEST_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(files, null, 2), "utf8");
  } catch {
    // ignore manifest write errors
  }
}

function cleanupGeneratedFiles(outputDir) {
  const manifest = readManifest();
  let removedCount = 0;

  if (manifest && Array.isArray(manifest)) {
    for (const filePath of manifest) {
      if (removeFile(filePath)) {
        removedCount++;
      }
    }
  } else {
    // Fallback: clean up known generated files if no manifest exists
    const knownFiles = [
      path.join(outputDir, "llms.txt"),
      path.join(outputDir, "llms-full.txt"),
    ];
    for (const filePath of knownFiles) {
      if (removeFile(filePath)) {
        removedCount++;
      }
    }
  }

  if (removedCount > 0) {
    console.log(`   ✓ Removed ${removedCount} old generated file(s)`);
  }

  const removedDirs = removeEmptyDirectories(outputDir);
  if (removedDirs > 0) {
    console.log(`   ✓ Removed ${removedDirs} empty directories`);
  }

  // Remove the old manifest itself
  removeFile(MANIFEST_PATH);
}

// ─── Standalone copy helper ──────────────────────────────────────────────────

function copyToStandalone(outputDir) {
  const standalonePublicDir = path.join(
    process.cwd(),
    ".next",
    "standalone",
    "public",
  );
  if (!fs.existsSync(standalonePublicDir)) {
    return;
  }

  const filesToCopy = ["llms.txt", "llms-full.txt"];
  for (const file of filesToCopy) {
    const src = path.join(outputDir, file);
    const dest = path.join(standalonePublicDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  }

  function copyMdFiles(srcDir, destDir) {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const entries = fs.readdirSync(srcDir, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(srcDir, entry.name);
      const destPath = path.join(destDir, entry.name);

      if (entry.isDirectory()) {
        copyMdFiles(srcPath, destPath);
      } else if (entry.name.endsWith(".md")) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  copyMdFiles(outputDir, standalonePublicDir);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function generateLlmsFiles() {
  const config = getConfig();
  const llms = config.llms;
  const outputDir = path.resolve("./public");
  const generatedFiles = [];

  const buildDir = detectBuildOutputDir();

  if (!buildDir) {
    console.error("❌ Next.js build output not found. Run 'next build' first.");
    console.error(
      "   Expected one of: .next/server/app, .next/server/pages, or out/",
    );
    process.exit(1);
  }

  const inputDir = path.resolve(buildDir);

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Clean up old generated files first
  console.log("🧹 Cleaning up previously generated files...");
  cleanupGeneratedFiles(outputDir);
  console.log("");

  const siteUrl = config.site.base_url.replace(/\/$/, "");
  const basePath = (config.site.base_path || "/").replace(/\/$/, "") || "/";
  const siteName = config.site.title;
  const siteDescription = config.metadata?.meta_description || "";

  // ── Step 1: Discover pre-rendered HTML files ────────────────────────────
  console.log("🔍 Discovering pre-rendered HTML files...");
  const htmlFiles = await discoverHtmlFiles(inputDir);
  console.log(`   Found ${htmlFiles.length} pre-rendered HTML files`);

  const pages = [];
  const seenPaths = new Set();

  for (const file of htmlFiles) {
    try {
      const urlPath = fileToUrlPath(file, inputDir);

      if (isApiRoute(urlPath)) {
        console.log(`   ⤷ Skipping API route: ${urlPath}`);
        continue;
      }

      const isExcluded = shouldExcludeRoute(urlPath, llms.exclude);
      const isIncluded = shouldIncludeRoute(urlPath, llms.include);

      if (isExcluded && !isIncluded) {
        console.log(`   ⤷ Skipping excluded route: ${urlPath}`);
        continue;
      }

      if (seenPaths.has(urlPath)) continue;
      seenPaths.add(urlPath);

      const pageData = await processHtmlFile(file, llms);

      if (!pageData.title) {
        console.log(`   ⚠️  No title found for ${urlPath}, skipping`);
        continue;
      }

      pages.push({
        urlPath,
        filePath: file,
        source: "prerendered",
        ...pageData,
      });
      console.log(`   ✓ [static] ${urlPath}: "${pageData.title}"`);
    } catch (error) {
      console.error(`   ✗ Error processing ${file}: ${error.message}`);
    }
  }

  // ── Step 2: Fetch SSR-only pages ───────────────────────────────────────
  // Determine source directories for App Router and Pages Router
  const srcAppDir = path.join(process.cwd(), "src", "app");
  const srcPagesDir = path.join(process.cwd(), "src", "pages");

  let ssrRoutes = [];
  if (fs.existsSync(srcAppDir)) {
    ssrRoutes = discoverSsrPageRoutes(srcAppDir, basePath, inputDir);
  } else if (fs.existsSync(srcPagesDir)) {
    ssrRoutes = discoverSsrPageRoutes(srcPagesDir, basePath, inputDir);
  }

  const missingRoutes = ssrRoutes.filter((r) => {
    if (seenPaths.has(r)) return false;
    const isExcluded = shouldExcludeRoute(r, llms.exclude);
    const isIncluded = shouldIncludeRoute(r, llms.include);
    return !(isExcluded && !isIncluded);
  });

  if (missingRoutes.length > 0) {
    console.log(
      `\n🌐 Fetching ${missingRoutes.length} SSR-only route(s): ${missingRoutes.join(", ")}`,
    );

    // Determine which server to use: the configured siteUrl or a temp server
    let fetchBase = null;
    let tempServerHandle = null;

    if (await isServerRunning(siteUrl)) {
      fetchBase = siteUrl;
      console.log(`   Using running server at ${fetchBase}`);
    } else {
      tempServerHandle = await startTempServer(inputDir);
      if (tempServerHandle) {
        fetchBase = tempServerHandle.baseUrl;
      } else {
        console.log(
          "   ⚠️  No server available. SSR pages will be skipped.\n" +
            "       Run 'pnpm preview' before 'pnpm generate-llms' to include them.",
        );
      }
    }

    if (fetchBase) {
      for (const route of missingRoutes) {
        const url = `${fetchBase}${route}`;
        process.stdout.write(`   ⤷ Fetching ${route} ... `);

        const pageData = await fetchAndProcessPage(url, llms);

        if (!pageData) {
          console.log("❌ failed");
          continue;
        }

        if (!pageData.title) {
          console.log("⚠️  no title, skipping");
          continue;
        }

        seenPaths.add(route);
        pages.push({
          urlPath: route,
          filePath: null,
          source: "ssr",
          ...pageData,
        });
        console.log(`✓ "${pageData.title}"`);
      }
    }

    stopTempServer(tempServerHandle);
  } else {
    console.log("\n✓ All source routes already captured by static HTML.");
  }

  // Sort pages: home first, then alphabetically
  pages.sort((a, b) => {
    if (a.urlPath === "/") return -1;
    if (b.urlPath === "/") return 1;
    return a.urlPath.localeCompare(b.urlPath);
  });

  console.log(`\n   ✅ Total pages processed: ${pages.length}\n`);

  // ── Step 3: Generate individual .md files ──────────────────────────────
  if (llms.generate_individual_md) {
    console.log("📝 Generating individual .md files...");

    for (const page of pages) {
      const mdRelative =
        page.urlPath === "/" ? "index" : page.urlPath.replace(/^\//, "");
      const mdPath = path.join(outputDir, mdRelative + ".md");

      const mdContent = generateMarkdownFile(page, siteUrl, basePath);

      const mdDir = path.dirname(mdPath);
      if (!fs.existsSync(mdDir)) {
        fs.mkdirSync(mdDir, { recursive: true });
      }

      fs.writeFileSync(mdPath, mdContent, "utf8");
      generatedFiles.push(mdPath);
      console.log(`   ✓ ${path.relative(process.cwd(), mdPath)}`);
    }

    console.log(`   Created ${pages.length} .md files\n`);
  }

  // ── Step 4: Generate llms.txt ──────────────────────────────────────────
  if (llms.generate_llms_txt) {
    console.log("📋 Generating llms.txt...");

    const llmsTxtContent = generateLlmsTxtContent(
      pages,
      siteUrl,
      basePath,
      siteName,
      siteDescription,
      llms.generate_individual_md,
    );
    const llmsTxtPath = path.join(outputDir, "llms.txt");

    fs.writeFileSync(llmsTxtPath, llmsTxtContent, "utf8");
    generatedFiles.push(llmsTxtPath);
    console.log(`   ✓ ${path.relative(process.cwd(), llmsTxtPath)}\n`);
  }

  // ── Step 5: Generate llms-full.txt ────────────────────────────────────
  if (llms.generate_llms_full_txt) {
    console.log("📚 Generating llms-full.txt...");

    const llmsFullContent = generateLlmsFullTxtContent(
      pages,
      siteUrl,
      basePath,
      siteName,
    );
    const llmsFullPath = path.join(outputDir, "llms-full.txt");

    fs.writeFileSync(llmsFullPath, llmsFullContent, "utf8");
    generatedFiles.push(llmsFullPath);
    console.log(`   ✓ ${path.relative(process.cwd(), llmsFullPath)}\n`);
  }

  // Copy to standalone output if exists
  if (buildDir.includes(".next/server")) {
    copyToStandalone(outputDir);
  }

  // Persist manifest for next cleanup run
  writeManifest(generatedFiles);

  // ── Summary ────────────────────────────────────────────────────────────
  console.log("✅ LLMS generation complete!\n");
  console.log("Summary:");
  console.log(`  Pages processed : ${pages.length}`);
  console.log(
    `  Sources         : ${pages.filter((p) => p.source === "prerendered").length} static HTML, ${pages.filter((p) => p.source === "ssr").length} SSR-fetched`,
  );
  if (llms.generate_individual_md) {
    console.log(
      `  .md files       : ${pages.length} (in ${path.relative(process.cwd(), outputDir)}/)`,
    );
  }
  if (llms.generate_llms_txt) {
    console.log(
      `  llms.txt        : ${path.relative(process.cwd(), path.join(outputDir, "llms.txt"))}`,
    );
  }
  if (llms.generate_llms_full_txt) {
    console.log(
      `  llms-full.txt   : ${path.relative(process.cwd(), path.join(outputDir, "llms-full.txt"))}`,
    );
  }
}

generateLlmsFiles().catch((error) => {
  console.error("❌ Error:", error.message);
  process.exit(1);
});
