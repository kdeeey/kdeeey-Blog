"use client";
import { useApp } from "../providers";
import Tag from "./Tag";
import type { ProjectItem } from "@/types";

export default function ProjectCard({ item, image, imageAlt }: { item: ProjectItem; image?: string; imageAlt?: string }) {
  const { t, sfx } = useApp();
  return (
    <div className="bg-card border-[3px] border-ink shadow-pixelLg flex flex-col group">
      <div className="w-full h-[190px] border-b-[3px] border-ink overflow-hidden bg-bg flex items-center justify-center">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={imageAlt || item.title} className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]" />
        ) : (
          <span className="font-pixel text-[9px] text-sub">{t.common.noImage}</span>
        )}
      </div>
      <div className="p-4 pb-5 flex flex-col gap-2.5 flex-1">
        <div className="font-pixel text-[10px] leading-relaxed text-ink min-h-[34px]">{item.title}</div>
        <div className="font-pixel text-[8px] text-sub">{t.projects.teamProject}</div>
        <p className="font-body text-[13.5px] leading-relaxed text-sub line-clamp-3 min-h-[63px] m-0">{item.desc}</p>
        <div className="flex flex-wrap gap-1.5 h-7 overflow-hidden content-start">
          {item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
        {item.repo && (
          <a href={item.repo} target="_blank" rel="noopener" onMouseEnter={() => sfx("hover")} className="font-pixel text-[8px] mt-1.5">
            {t.common.viewRepo + " >"}
          </a>
        )}
      </div>
    </div>
  );
}
