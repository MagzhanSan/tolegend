import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Оптимизация изображений
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 год кэширования
    domains: [],
    remotePatterns: [],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Сжатие и производительность
  compress: true,
  poweredByHeader: false,

  // Экспериментальные оптимизации
  experimental: {
    optimizeCss: true, // Оптимизация CSS
    optimizePackageImports: ["react", "react-dom", "nprogress"], // Tree shaking
  },

  // Оптимизация компилятора
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Удаление console.log в продакшене
  },

  // HTTP заголовки для кэширования
  async headers() {
    return [
      // Кэширование всех webp изображений
      {
        source: "/:path*.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Кэширование видео webm
      {
        source: "/:path*.webm",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Accept-Ranges",
            value: "bytes",
          },
          {
            key: "Content-Type",
            value: "video/webm",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      // Кэширование видео mp4
      {
        source: "/:path*.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Accept-Ranges",
            value: "bytes",
          },
          {
            key: "Content-Type",
            value: "video/mp4",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      // Кэширование статики
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Кэширование шрифтов
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
