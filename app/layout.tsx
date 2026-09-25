import type { Metadata, Viewport } from "next";
import { Poppins, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";

const sans = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-sans" });
const serif = Playfair_Display({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-serif" });
const hand = Caveat({ subsets: ["latin"], weight: ["500"], variable: "--font-hand" });

export const metadata: Metadata = {
  title: "FoodSynk – Smart Food. Zero Waste.",
  description: "Share surplus food and discover free, fresh food from your community.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#F5F8EF" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`bg-canvas text-ink ${sans.variable} ${serif.variable} ${hand.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
