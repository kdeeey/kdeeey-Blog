"use client";
import { useState } from "react";
import { useApp } from "../providers";
import Tag from "./Tag";
import PixelButton from "./PixelButton";
import ImageCarousel from "./ImageCarousel";
import Lightbox, { ZoomHint } from "./Lightbox";
import { trackExternalLink, trackProjectOpen } from "@/lib/analytics";
import type { ProjectItem } from "@/types";

export interface ProjectCardProps {
  item: ProjectItem;
  image?: string;
  images?: string[];        // more than one -> swipeable carousel
  imageAlt?: string;
}

export default function ProjectCard({ item, image, images, imageAlt }: ProjectCardProps) {
  const { t } = useApp();
  const [zoomed, setZoomed] = useState(false);
  const shots = images ?? (image ? [image] : []);
  const alt = imageAlt || item.title;

  return (
    <div className="bg-card border-[3px] border-ink shadow-pixelLg flex flex-col group">
      {zoomed && <Lightbox src={shots[0]} alt={alt} onClose={() => setZoomed(false)} />}
      <div className="relative w-full h-[210px] border-b-[3px] border-ink overflow-hidden bg-bg flex items-center justify-center">
        {shots.length > 1 ? (
          <>
            <div className="absolute inset-0"><ImageCarousel images={shots} alt={alt} /></div>
            <ZoomHint />
          </>
        ) : shots.length === 1 ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shots[0]}
              alt={alt}
              onClick={() => setZoomed(true)}
              className="w-full h-full object-cover object-top cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.03]"
            />
            <ZoomHint />
          </>
        ) : (
          <span className="font-pixel text-[9px] text-sub">{t.common.noImage}</span>
        )}
      </div>
      <div className="p-5 pb-6 flex flex-col gap-3 flex-1">
        <div className="font-pixel text-[10px] leading-relaxed text-ink min-h-[34px]">{item.title}</div>
        {item.team && <div className="font-pixel text-[8px] text-sub">{t.projects.teamProject}</div>}
        <p className="font-body text-[13.5px] leading-relaxed text-sub m-0">{item.desc}</p>
        <div className="flex flex-wrap gap-1.5 content-start">
          {item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
        {(item.repo || item.live) && (
          <div className="flex flex-wrap gap-2.5 mt-auto pt-2">
            {item.repo && (
              <PixelButton
                small
                href={item.repo}
                external
                onClick={() => { trackProjectOpen(item.title); trackExternalLink(item.repo!); }}
              >
                {t.common.viewRepo + " >"}
              </PixelButton>
            )}
            {item.live && (
              <PixelButton small href={item.live} external onClick={() => trackProjectOpen(item.title)}>
                {t.common.viewProject + " >"}
              </PixelButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
