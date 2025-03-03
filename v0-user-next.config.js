/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      "img.freepik.com",
      "cdn.pixabay.com",
      "videos.pexels.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  // Add output: 'standalone' for better Vercel deployment
  output: "standalone",
  // Skip type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig

