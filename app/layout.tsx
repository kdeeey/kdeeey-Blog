import type { Metadata } from "next";
import { Press_Start_2P, Inter } from "next/font/google";
import "../styles/globals.css";
import { Providers } from "./providers";

const pixel = Press_Start_2P({ weight: "400", subsets: ["latin"], variable: "--font-pixel", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "Karima Ed Dahhak · Pixel RPG Portfolio",
  description: "First-year cybersecurity student. Retro pixel-art RPG portfolio: projects, CTFs, hackathons, internships.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={pixel.variable + " " + inter.variable + " font-body"}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
