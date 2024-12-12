/**
 * Parses a comma-separated .env string into an array, removing extra whitespace.
 * @param {string} envVariable - The .env variable value as a string.
 * @returns {string[]} - An array of trimmed email addresses.
 */
export function parseEnvList(envVariable: string | undefined): string[] {
  if (!envVariable) return [];
  return envVariable
    .replace(/"/g, "") // Remove enclosing double quotes if present
    .split(",") // Split by commas
    .map((email: string) => email.trim()); // Remove extra spaces
}
