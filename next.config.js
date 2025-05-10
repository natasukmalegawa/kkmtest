/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  // Penting untuk Sanity Studio
  transpilePackages: ['@sanity'],
  
  // Konfigurasi routing eksperimental untuk memastikan rute /studio bekerja dengan benar
  experimental: {
    appDir: true,
  }
}

module.exports = nextConfig
