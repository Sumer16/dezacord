/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil"
    });

    return config;
  },
  images: {
    domains: [
      "uploadthing.com",
      "utfs.io"
    ]
  },
  ...withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
  })
}

module.exports = nextConfig
