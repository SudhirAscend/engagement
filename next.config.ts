import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      // Add more image hosting services as needed
      // For example, if using Cloudinary, Imgur, etc.:
      // {
      //   protocol: "https",
      //   hostname: "res.cloudinary.com",
      //   port: "",
      //   pathname: "/**",
      // },
    ],
    // Allow SVG images from placehold.co (they return SVG format)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
