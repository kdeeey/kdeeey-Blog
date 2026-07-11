"use client";
import { useApp } from "../providers";

export interface SocialIconProps {
  label: string;            // short glyph text, e.g. "in", "X", "THM"
  title: string;
  href: string;
  bg: string;
  fontSize?: number;
  icon?: string;            // image path overrides the label glyph
  invertIcon?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onActivate?: () => void;
}

export default function SocialIcon({ label, title, href, bg, fontSize = 11, icon, invertIcon, onEnter, onLeave, onActivate }: SocialIconProps) {
  const { sfx } = useApp();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      title={title}
      onMouseEnter={() => { sfx("hover"); onEnter?.(); }}
      onMouseLeave={onLeave}
      onClick={() => { sfx("click"); onActivate?.(); }}
      className="w-14 h-14 rounded-full border-[3px] border-ink shadow-pixel flex items-center justify-center font-pixel text-white transition-transform duration-150 hover:scale-110 flex-none"
      style={{ background: bg, fontSize }}
    >
      {icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={icon} alt={title} className="w-8 h-8 object-contain" style={{ filter: invertIcon ? "invert(1)" : undefined }} />
      ) : (
        <span>{label}</span>
      )}
    </a>
  );
}
