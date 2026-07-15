import type { Metadata } from "next";
import { Press_Start_2P, Inter } from "next/font/google";
import Script from "next/script";
import "../styles/globals.css";
import { Providers } from "./providers";

const GA_ID = "G-D32FBZ8BZJ";

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
        {/* Google Analytics 4 */}
        <Script src={"https://www.googletagmanager.com/gtag/js?id=" + GA_ID} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
