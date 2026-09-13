"use client";
import { useState } from "react";
import { useApp } from "../providers";
import Tag from "./Tag";
import PixelButton from "./PixelButton";
import ImageCarousel from "./ImageCarousel";
import Lightbox, { ZoomHint } from "./Lightbox";
import { trackExternalLink, trackProjectOpen } from "@/lib/analytics";

export interface InternProject {
  title: string;
  desc?: string;
  image?: string;
  gallery?: string[];       // extra shots -> swipeable carousel alongside `image`
  repo?: string;
  live?: string;            // deployed app -> VIEW PROJECT button
  writeup?: string;         // pdf path -> DOWNLOAD WRITEUP button
  writeupLabel?: string;
  writeupSoon?: boolean;
}

export interface InternshipCardProps {
  logo: string;
  logoDark?: boolean;       // logo needs a dark backdrop (e.g. 1337)
  title: string;
  role: string;
  desc: string;
  tags: string[];
  status: "completed" | "upcoming";
  projects: InternProject[];
  photo?: string;           // large photo area; placeholder until real pics land
  footer?: string;
}

export default function InternshipCard(p: InternshipCardProps) {
  const { t } = useApp();
  const solo = p.projects.length === 1;
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);
  return (
    <div className="bg-card border-[3px] border-ink shadow-pixelLg flex flex-col">
      {zoom && <Lightbox src={zoom.src} alt={zoom.alt} onClose={() => setZoom(null)} />}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Company name + status, small logo badge on the right */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-pixel text-[9px] bg-[#111111] text-white border-2 border-ink px-2.5 py-2">{p.title}</span>
            <span className={"font-pixel text-[8px] " + (p.status === "completed" ? "text-green-600" : "text-folderyellow")}>
              {p.status === "completed" ? t.common.completed : t.common.upcoming}
            </span>
          </div>
          <div className={"h-12 px-2 border-2 border-ink flex items-center flex-none " + (p.logoDark ? "bg-[#111111]" : "bg-white")}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.logo} alt={p.title + " logo"} className="max-h-10 max-w-[72px] object-contain" />
          </div>
        </div>
        <div className="font-body text-[13.5px] font-semibold text-ink">{p.role}</div>

        {p.photo && (
          <div className="relative w-full aspect-[3/2] border-2 border-ink bg-bg flex items-center justify-center overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.photo}
              alt={p.title}
              onClick={() => setZoom({ src: p.photo!, alt: p.title })}
              className="w-full h-full object-contain cursor-zoom-in"
            />
            <ZoomHint />
          </div>
        )}

        <p className="font-body text-[13.5px] leading-relaxed text-sub m-0">{p.desc}</p>
        <div className="flex flex-wrap gap-1.5">{p.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>

        {/* Projects - always visible */}
        <div className="font-pixel text-[9px] text-sub mt-2">{t.internships.projectsHdr + " (" + p.projects.length + ")"}</div>
        <div className={"grid gap-3.5 " + (solo ? "grid-cols-1" : "grid-cols-2")}>
          {p.projects.map((proj) => {
            const shots = [proj.image, ...(proj.gallery ?? [])].filter(Boolean) as string[];
            return (
              <div key={proj.title} className="flex flex-col gap-2">
                <div className={"relative w-full border-2 border-ink overflow-hidden bg-bg flex items-center justify-center " + (solo ? "h-[230px] sm:h-[280px]" : "h-[120px]")}>
                  {shots.length > 1 ? (
                    <>
                      <div className="absolute inset-0"><ImageCarousel images={shots} alt={proj.title} /></div>
                      <ZoomHint />
                    </>
                  ) : shots.length === 1 ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={shots[0]}
                        alt={proj.title}
                        onClick={() => setZoom({ src: shots[0], alt: proj.title })}
                        className="w-full h-full object-cover cursor-zoom-in"
                      />
                      <ZoomHint />
                    </>
                  ) : (
                    <span className="font-pixel text-[8px] text-sub">{t.common.noImage}</span>
                  )}
                </div>
                <div className="font-pixel text-[8px] leading-relaxed text-ink">{proj.title}</div>
                {proj.desc && <p className={"font-body leading-relaxed text-sub m-0 " + (solo ? "text-[13.5px]" : "text-xs")}>{proj.desc}</p>}
                <div className="flex gap-2 flex-wrap">
                  {proj.writeup && <PixelButton small href={proj.writeup} download={proj.writeup.split("/").pop()}>{proj.writeupLabel ?? "WRITEUP"}</PixelButton>}
                  {proj.repo && <PixelButton small href={proj.repo} external onClick={() => trackExternalLink(proj.repo!)}>{t.common.viewRepo + " >"}</PixelButton>}
                  {proj.live && <PixelButton small href={proj.live} external onClick={() => trackProjectOpen(proj.title)}>{t.common.viewProject + " >"}</PixelButton>}
                  {proj.writeupSoon && <span className="font-pixel text-[7px] text-sub border-2 border-ink bg-card px-2.5 py-2 shadow-pixelSm">{t.common.writeupSoon}</span>}
                </div>
              </div>
            );
          })}
        </div>
        {p.footer && <span className="font-pixel text-[8px] text-green-600 mt-auto pt-2">{p.footer}</span>}
      </div>
    </div>
  );
}
