import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "swiperjs.com",
      },
      {
        protocol: "https",
        hostname: "dummyjson.com",
        pathname: "/icon/**", // vẫn giữ nếu bạn dùng icon từ dummyjson.com
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com", // ✅ thêm dòng này để fix lỗi ảnh
        pathname: "/**", // cho phép toàn bộ đường dẫn ảnh từ CDN
      },

    ],
  },
  // Các config khác có thể thêm ở đây
};

export default nextConfig;
