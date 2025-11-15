/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dx6qr8zyx/image/upload/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    CRON_SECRET: process.env.CRON_SECRET,
    NEXT_EXPRESS_API_URL: process.env.EXPRESS_API_URL
  }
};

export default nextConfig;