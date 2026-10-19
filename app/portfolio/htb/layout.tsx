import type { Metadata } from "next";

// Link-preview card (LinkedIn, Discord, X) for the labs page - leads with the CTF writeups.
const title = "CTF Writeups · Securinets CTF Quals 2026";
const description = "DumPwn (Forensics) and Backdrop (Mobile) writeups by Karima Ed Dahhak, plus HTB and CPTS labs.";
const image = { url: "/images/og-ctf-writeups.png", width: 1200, height: 630, alt: "CTF writeups: DumPwn and Backdrop" };

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, url: "/portfolio/htb", siteName: "Karima Ed Dahhak", type: "website", images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [image.url] },
};

export default function LabsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
