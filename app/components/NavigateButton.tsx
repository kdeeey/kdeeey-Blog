"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../providers";
import PixelButton from "./PixelButton";

export default function NavigateButton() {
  const [open, setOpen] = useState(false);
  const { t } = useApp();
  const router = useRouter();
  const items: Array<[string, string]> = [
    [t.nav.home, "/"],
    [t.nav.about, "/about"],
    [t.nav.portfolio, "/portfolio"],
    [t.nav.ctf, "/portfolio/ctf"],
    [t.nav.contact, "/contact"],
  ];
  return (
    <div className="fixed top-5 left-5 z-20 flex flex-col items-start gap-2.5">
      <PixelButton pill active onClick={() => setOpen((o) => !o)}>{t.nav.navigate}</PixelButton>
      {open && (
        <div className="flex flex-col items-start gap-2">
          {items.map(([label, href]) => (
            <PixelButton key={href} pill small onClick={() => { setOpen(false); router.push(href); }}>{label}</PixelButton>
          ))}
          <PixelButton pill small onClick={() => { try { localStorage.removeItem("kd_intro"); } catch {}; setOpen(false); router.push("/"); }}>{t.nav.replay}</PixelButton>
        </div>
      )}
    </div>
  );
}
