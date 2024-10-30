/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.cbaleague.com',
        pathname: '/playerheader/*/*.jpg',
      },
    ],
  },
};

export default nextConfig;
