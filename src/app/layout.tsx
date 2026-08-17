import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import CustomCursor from "../components/CustomCursor";
import GateLoader from "../components/GateLoader";
import AmbientMusic from "../components/AmbientMusic";
import { AppProvider } from "../context/AppContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Consumer Electronics & Home Appliances | KEUKEN",
  description: "Explore KEUKEN's wide range of smart home appliances, OLED TVs, energy-efficient air conditioners, dual-cool refrigerators, and high-performance monitors.",
  keywords: ["KEUKEN", "OLED TV", "Washing Machine", "Smart Refrigerator", "Air Conditioner", "Gaming Monitor", "KEUKEN Connect"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-[#111111]">
        <AppProvider>
          <CustomCursor />
          <GateLoader />
          <AmbientMusic />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
