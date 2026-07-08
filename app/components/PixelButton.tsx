"use client";
import Link from "next/link";
import { useApp } from "../providers";
import { cn } from "@/lib/utils";

export interface PixelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;            // internal route or external URL
  download?: string;        // makes an <a download>
  external?: boolean;       // target=_blank
  pill?: boolean;
  active?: boolean;         // purple background (e.g. navigate pill)
  small?: boolean;
  className?: string;
}

export default function PixelButton({ children, onClick, href, download, external, pill, active, small, className }: PixelButtonProps) {
  const { sfx } = useApp();
  const cls = cn(
    "font-pixel border-ink bg-card text-ink inline-flex items-center gap-2 transition-transform",
    "shadow-pixel border-[3px] hover:-translate-y-0.5 hover:bg-folderyellow hover:text-black",
    pill && "rounded-full",
    active && "bg-purple text-black hover:bg-purple",
    small ? "text-[8px] px-4 py-2.5 shadow-pixelSm border-2" : "text-[9px] px-5 py-3",
    className
  );
  const common = { className: cls, onMouseEnter: () => sfx("hover"), onClick: () => { sfx("click"); onClick?.(); } };
  if (href && (external || download || href.startsWith("http") || href.startsWith("mailto")))
    return <a href={href} download={download} target={external ? "_blank" : undefined} rel={external ? "noopener" : undefined} {...common}>{children}</a>;
  if (href) return <Link href={href} {...common}>{children}</Link>;
  return <button type="button" {...common}>{children}</button>;
}
