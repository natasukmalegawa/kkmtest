/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  images: {
    domains: ['cdn.sanity.io'], // hanya ini
    // remotePatterns: [...], // hapus sementara
  },

  transpilePackages: ['@sanity'],
};

module.exports = nextConfig;
