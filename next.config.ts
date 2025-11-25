import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Изображения уже в WebP - используем только WebP формат
    formats: ["image/webp"],
    // Размеры для разных устройств
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Долгое кэширование для быстрой загрузки
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 год кэширования
    // Разрешаем загрузку из public папки
    domains: [],
    remotePatterns: [],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Оптимизация для Vercel
  compress: true,
  poweredByHeader: false,
  // Headers для кэширования статических файлов
  async headers() {
    return [
      {
        source: "/projects/:path*.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
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
    ];
  },
};

export default nextConfig;
