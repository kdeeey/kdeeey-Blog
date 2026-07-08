/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",        // static export - deploy anywhere (GitHub Pages, Netlify, Vercel)
  images: { unoptimized: true }, // required for static export; sprite/pixel art must not be resampled anyway
};
module.exports = nextConfig;
