/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["nft-bazaar.infura-ipfs.io", "infura-ipfs.io"],
  },
};

module.exports = nextConfig;
