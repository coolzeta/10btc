import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 使用自定义域名，不需要 basePath
  basePath: '',
  reactCompiler: true,
};

export default nextConfig;
