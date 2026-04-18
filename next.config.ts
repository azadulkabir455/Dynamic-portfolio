import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/admin/singup",
        destination: "/admin/signup",
        permanent: true,
      },
      {
        source: "/admin/forgot-password",
        destination: "/admin/forgotPassword",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
