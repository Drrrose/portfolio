/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["172.28.28.119"],
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
