/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com', 'res.cloudinary.com'], // Add the hostname here
  },
}

module.exports = nextConfig
