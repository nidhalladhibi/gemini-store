/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "wiki.tn" },
      { protocol: "https", hostname: "www.mitunisie.tn" }
    ]
  }
};

module.exports = nextConfig;
