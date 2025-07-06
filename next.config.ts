import type { NextConfig } from "next"
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin"

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optional: Disable TypeScript type checking during build (not recommended)
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
}

export default nextConfig
