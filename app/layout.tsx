import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Montserrat, Playfair_Display, Cormorant_Garamond, Open_Sans, Saira, Share_Tech } from "next/font/google";
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
  title: "TOLEGEND",
  description:
    "Медиа которое работает. Продюсерский центр полного цикла с 10-летним опытом на медиарынке",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${montserrat.variable} ${playfairDisplay.variable} ${cormorantGaramond.variable} ${openSans.variable} ${saira.variable} ${shareTech.variable} antialiased`}
      >
        <NProgressProvider />
        {children}
      </body>
    </html>
  );
}
