"use client";
import { useApp } from "../providers";
import Tag from "./Tag";
import type { HtbLab } from "@/types";

export default function HtbLabCard({ lab }: { lab?: HtbLab }) {
  const { t, sfx } = useApp();
  const locked = !lab;
  return (
    <div className={"p-5 flex flex-col gap-3 min-h-[170px] " + (locked ? "border-[3px] border-dashed border-[#b9b9b9] bg-bg opacity-70" : "bg-card border-[3px] border-ink shadow-pixelLg")}>
      <div className="font-pixel text-[9px] text-ink">{t.htb.machine + ": " + (lab?.machine ?? t.htb.locked)}</div>
      <div className="font-pixel text-[8px] text-sub">{t.htb.difficulty + ": " + (lab?.difficulty ?? t.htb.locked)}</div>
      <div className="flex flex-wrap gap-1.5">{(lab?.tags ?? ["???"]).map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
      {lab?.writeup ? (
        <a href={lab.writeup} download onMouseEnter={() => sfx("hover")} className="font-pixel text-[8px] mt-auto">{"📄 " + t.htb.viewWriteup + " ▶"}</a>
      ) : (
        <div className="font-pixel text-[8px] text-sub mt-auto">{"🔒 " + t.htb.viewWriteup + " ▶"}</div>
      )}
    </div>
  );
}
