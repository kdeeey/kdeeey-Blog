"use client";
import { useApp } from "../providers";
import Tag from "./Tag";
import type { CtfItem } from "@/types";

export default function CtfCard({ item }: { item: CtfItem }) {
  const { t } = useApp();
  const done = item.status === "completed";
  return (
    <div className="bg-card border-[3px] border-ink shadow-pixelLg flex flex-col">
      {item.image && (
        <div className="h-[220px] border-b-[3px] border-ink overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6 flex flex-col gap-3.5">
      <div className="flex items-center gap-3.5 flex-wrap">
        <span className="font-pixel text-[10px] border-2 border-ink px-3 py-2" style={{ background: item.badgeBg, color: item.badgeColor }}>{item.title}</span>
        <span className="font-pixel text-[8px] text-green-600">{item.xp}</span>
        <span className={"font-pixel text-[8px] " + (done ? "text-green-600" : "text-folderyellow")}>
          {done ? t.common.completed : t.common.inProgress}
        </span>
      </div>
      <p className="font-body text-[14.5px] leading-relaxed text-sub m-0">{item.desc}</p>
      <div className="flex flex-wrap gap-1.5">{item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
      </div>
    </div>
  );
}
