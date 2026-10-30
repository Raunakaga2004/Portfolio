import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image uploads from /admin go through server actions (default limit is 1 MB).
  experimental: { serverActions: { bodySizeLimit: "5mb" } },
};

export default nextConfig;
