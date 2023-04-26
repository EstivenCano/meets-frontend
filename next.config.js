/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: ["i.pravatar.cc", "api.dicebear.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
