"use client";
import { useApp } from "../providers";
import Tag from "./Tag";
import ImageCarousel from "./ImageCarousel";
import type { HackathonItem } from "@/types";

export default function HackathonCard({ item }: { item: HackathonItem }) {
  const { t } = useApp();
  const images = [item.image, ...(item.gallery ?? [])].filter(Boolean) as string[];
  return (
    <div className="bg-card border-[3px] border-ink shadow-pixelLg grid md:grid-cols-[40%_1fr]">
      <div className="relative min-h-[300px] md:min-h-[320px] bg-bg md:border-r-[3px] border-b-[3px] md:border-b-0 border-ink overflow-hidden">
        <div className="absolute inset-0">
          {images.length ? (
            <ImageCarousel images={images} alt={item.title} />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-pixel text-[9px] text-sub">{t.common.noImage}</div>
          )}
        </div>
      </div>
      <div className="p-6 flex flex-col gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-pixel text-[8px] bg-folderred text-white border-2 border-ink px-2.5 py-1.5">{item.badge}</span>
          <span className="font-pixel text-[8px] text-sub">{item.date}</span>
          <span className="font-pixel text-[8px] text-purple">{t.common.participated}</span>
        </div>
        <div className="font-pixel text-[12px] text-ink leading-relaxed">{item.title}</div>
        <p className="font-body text-[14px] leading-relaxed text-sub m-0">{item.desc}</p>
        {item.quote && <div className="font-pixel text-[8px] leading-[2] text-purple italic">{"“" + item.quote + "”"}</div>}
        {item.team && <div className="font-body text-[13px] text-sub">{item.team}</div>}
        {item.organizer && <div className="font-body text-[13px] text-sub">{item.organizer}</div>}
        <div className="flex flex-wrap gap-1.5 mt-auto">{item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
      </div>
    </div>
  );
}
