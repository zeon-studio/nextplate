/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://nextplate.netlify.app/",
  generateRobotsTxt: true,
};
