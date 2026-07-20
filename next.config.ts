import type { NextConfig } from "next";
import { withEve } from "eve/next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/optin',
        permanent: false,
      },
    ];
  },
};

export default withEve(nextConfig);
