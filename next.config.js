/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'zanerisportfolio.wordpress.com',
          },
          {
            protocol: 'https',
            hostname: 'public-api.wordpress.com',
          },
        ],
      }
}

module.exports = nextConfig
