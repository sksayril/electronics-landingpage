import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Consumer Electronics & Home Appliances | LG India",
  description: "Explore LG's wide range of smart home appliances, OLED TVs, energy-efficient air conditioners, dual-cool refrigerators, and high-performance monitors. Life's Good!",
  keywords: ["LG India", "OLED TV", "Washing Machine", "Smart Refrigerator", "Air Conditioner", "Gaming Monitor", "ThinQ AI"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-[#111111]">{children}</body>
    </html>
  );
}
