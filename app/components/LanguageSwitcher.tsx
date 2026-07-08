"use client";
import { useApp } from "../providers";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const { lang, setLang, sfx } = useApp();
  const seg = (l: "fr" | "en") =>
    cn("px-2.5 py-1", lang === l ? "bg-purple text-black" : "text-ink");
  return (
    <button
      type="button"
      onClick={() => { sfx("click"); setLang(lang === "en" ? "fr" : "en"); }}
      onMouseEnter={() => sfx("hover")}
      className="font-pixel text-[8px] border-2 border-ink bg-card rounded-full overflow-hidden flex shadow-pixelSm"
      aria-label="Switch language"
    >
      <span className={seg("fr")}>FR</span>
      <span className={seg("en")}>EN</span>
    </button>
  );
}
