"use client";
import { useApp } from "../providers";
import Tag from "./Tag";
import { trackCtfWriteupOpen } from "@/lib/analytics";
import type { CtfWriteup } from "@/types";

export default function CtfWriteupCard({ w }: { w: CtfWriteup }) {
  const { t, sfx } = useApp();
  return (
    <div className="relative p-5 flex flex-col gap-3 min-h-[170px] bg-card border-[3px] border-ink shadow-pixelLg">
      {/* Category color line on the left edge, like the Quest Log rows */}
      <span aria-hidden className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: w.color }} />
      <div className="w-full h-[120px] border-b-[3px] border-ink overflow-hidden bg-bg flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={encodeURI(w.image)} alt={w.challenge} className="w-full h-full object-cover object-top" />
      </div>
      <div className="font-pixel text-[9px] text-ink">{t.htb.challenge + ": " + w.challenge}</div>
      <div className="font-pixel text-[8px] leading-[1.8]">
        <span style={{ color: w.color }}>{w.category.toUpperCase()}</span>
        <span className="text-sub">{" · " + w.points + " · "}</span>
        <span className="text-green-600">{t.htb.solved}</span>
      </div>
      <div className="font-pixel text-[7px] text-sub leading-[1.8]">{w.event.toUpperCase()}</div>
      <div className="flex flex-wrap gap-1.5">{w.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
      <div className="font-body text-[13px] leading-relaxed text-sub">{w.description}</div>
      <a
        href={w.writeup}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => sfx("hover")}
        onClick={() => trackCtfWriteupOpen(w.challenge)}
        className="font-pixel text-[8px] mt-auto"
      >
        {t.htb.viewWriteup + " >"}
      </a>
    </div>
  );
}
