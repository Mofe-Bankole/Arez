import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Clear that experimental warning from your logs
  // experimental: { turbopack: true }, <— REMOVE THIS
  // Add this to handle snarkjs and Umbra's Node.js dependencies
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = {
  //       ...config.resolve.fallback,
  //       fs: false,
  //       path: false,
  //       crypto: require.resolve("crypto-browserify"),
  //       stream: require.resolve("stream-browserify"),
  //     };
  //   }
  //   return config;
  // },
};

export default nextConfig;

module.exports = {};
