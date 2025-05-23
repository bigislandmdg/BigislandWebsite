import type { NextConfig } from "next";
import i18nConfig from "./next-i18next.config";

const nextConfig: NextConfig = {
  /* config options here */
   ...i18nConfig,
  experimental: {
    serverActions: {
      // No additional properties are needed here as 'enabled' is not a valid option.
    },
  },
  reactStrictMode: true,
};

export default nextConfig;
