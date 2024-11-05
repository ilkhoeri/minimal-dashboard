import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com"
      }
    ]
  },
  async redirects() {
    return [
      // {
      //   source: "/:slug",
      //   destination: "/dashboard/:slug",
      //   permanent: true
      // },
      {
        source: "/products",
        destination: "/",
        permanent: false
      }
    ];
  }
};

export default nextConfig;
