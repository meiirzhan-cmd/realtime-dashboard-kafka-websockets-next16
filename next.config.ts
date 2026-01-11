import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    serverComponentsExternalPackages: ["kafkajs"], // allow Kafka client
  },
};

export default nextConfig;
