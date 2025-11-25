import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Montserrat,
  Playfair_Display,
  Cormorant_Garamond,
  Open_Sans,
  Saira,
  Share_Tech,
} from "next/font/google";
import "./globals.css";
import { NProgressProvider } from "./components/NProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const shareTech = Share_Tech({
  variable: "--font-share-tech",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TOLEGEND - Продюсерский центр полного цикла",
    template: "%s | TOLEGEND",
  },
  description:
    "Медиа которое работает. Продюсерский центр полного цикла с 10-летним опытом на медиарынке. Фото, дизайн, продакшн. Создаем визуальные решения для брендов и проектов.",
  keywords: [
    "TOLEGEND",
    "продюсерский центр",
    "медиа",
    "фото",
    "дизайн",
    "продакшн",
    "визуальные решения",
    "брендинг",
    "реклама",
    "Казахстан",
    "Астана",
    "креативное агентство",
    "видео продакшн",
    "фотография",
    "графический дизайн",
  ],
  authors: [{ name: "TOLEGEND" }],
  creator: "TOLEGEND",
  publisher: "TOLEGEND",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://tolegend.art"
  ),
  alternates: {
    canonical: "/",
    languages: {
      "ru-KZ": "/ru",
      "kk-KZ": "/kk",
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    url: "/",
    siteName: "TOLEGEND",
    title: "TOLEGEND - Продюсерский центр полного цикла",
    description:
      "Медиа которое работает. Продюсерский центр полного цикла с 10-летним опытом на медиарынке. Фото, дизайн, продакшн.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TOLEGEND - Продюсерский центр",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TOLEGEND - Продюсерский центр полного цикла",
    description:
      "Медиа которое работает. Продюсерский центр полного цикла с 10-летним опытом на медиарынке.",
    images: ["/og-image.jpg"],
    creator: "@tolegend",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  category: "Creative Agency",
  icons: {
    icon: [
      { url: "/logo.webp", type: "image/webp" },
      { url: "/logo.webp", type: "image/webp", sizes: "32x32" },
      { url: "/logo.webp", type: "image/webp", sizes: "16x16" },
    ],
    apple: "/logo.webp",
    shortcut: "/logo.webp",
  },
  manifest: "/manifest.json",
  other: {
    "theme-color": "#2c3531",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": "https://tolegend.art/#organization",
    name: "TOLEGEND",
    description:
      "Медиа которое работает. Продюсерский центр полного цикла с 10-летним опытом на медиарынке",
    url: "https://tolegend.art",
    logo: "https://tolegend.art/logo.webp",
    image: "https://tolegend.art/og-image.jpg",
    sameAs: [
      "https://www.instagram.com/tolegend.art",
      "https://t.me/tolegend_production",
      "https://www.tiktok.com/@tolegend.art",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+7-771-525-97-01",
      contactType: "Customer Service",
      email: "info.tolegend@gmail.com",
      areaServed: "KZ",
      availableLanguage: ["Russian", "Kazakh"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "улица Динмухамед Конаев, 14",
      addressLocality: "Астана",
      addressCountry: "KZ",
    },
  };

  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${montserrat.variable} ${playfairDisplay.variable} ${cormorantGaramond.variable} ${openSans.variable} ${saira.variable} ${shareTech.variable} antialiased`}
      >
        <NProgressProvider />
        {children}
      </body>
    </html>
  );
}
