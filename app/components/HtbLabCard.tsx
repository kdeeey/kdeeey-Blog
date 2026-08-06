"use client";
import { useApp } from "../providers";
import Tag from "./Tag";
import { trackHtbLabOpen } from "@/lib/analytics";
import type { HtbLab } from "@/types";

export default function HtbLabCard({ lab }: { lab?: HtbLab }) {
  const { t, sfx } = useApp();
  const locked = !lab;
  return (
    <div className={"p-5 flex flex-col gap-3 min-h-[170px] " + (locked ? "border-[3px] border-dashed border-[#b9b9b9] bg-bg opacity-70" : "bg-card border-[3px] border-ink shadow-pixelLg")}>
      {lab?.image && (
        <div className="w-full h-[120px] border-b-[3px] border-ink overflow-hidden bg-bg flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={encodeURI(lab.image)} alt={lab.machine} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="font-pixel text-[9px] text-ink">{t.htb.machine + ": " + (lab?.machine ?? t.htb.locked)}</div>
      <div className={`font-pixel text-[8px] ${lab?.difficulty?.toLowerCase() === "easy" ? "text-green-600" : "text-sub"}`}>{t.htb.difficulty + ": " + (lab?.difficulty ?? t.htb.locked)}</div>
      <div className="flex flex-wrap gap-1.5">{(lab?.tags ?? ["???"]).map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
      {lab?.description && (
        <div className="font-body text-[13px] leading-relaxed text-sub">{lab.description}</div>
      )}
      {lab?.writeup ? (
        <a href={lab.writeup} download onMouseEnter={() => sfx("hover")} onClick={() => trackHtbLabOpen(lab.machine)} className="font-pixel text-[8px] mt-auto">{t.htb.viewWriteup + " >"}</a>
      ) : (
        <div className="font-pixel text-[8px] text-sub mt-auto">{t.htb.viewWriteup}</div>
      )}
    </div>
  );
}
