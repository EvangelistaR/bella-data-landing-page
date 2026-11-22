/** @type {import('next').NextConfig} */
const basePath = "/bella-data-landing-page";

const nextConfig = {
  output: "export",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};
export default nextConfig;
