"use client";
import { useState } from "react";
import { useApp } from "../providers";
import Tag from "./Tag";
import PixelButton from "./PixelButton";

export interface InternProject {
  title: string;
  desc?: string;
  image?: string;
  repo?: string;
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
  footer?: string;
}

export default function InternshipCard(p: InternshipCardProps) {
  const [open, setOpen] = useState(false);
  const { t, sfx } = useApp();
  return (
    <div className="bg-card border-[3px] border-ink shadow-pixelLg flex flex-col">
      <div className={"w-full h-[110px] border-b-[3px] border-ink flex items-center justify-center " + (p.logoDark ? "bg-[#111111]" : "bg-white")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.logo} alt={p.title + " logo"} className="max-h-[94px] max-w-[88%] object-contain" />
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-pixel text-[9px] bg-[#111111] text-white border-2 border-ink px-2.5 py-2">{p.title}</span>
          <span className={"font-pixel text-[8px] " + (p.status === "completed" ? "text-green-600" : "text-folderyellow")}>
            {p.status === "completed" ? t.common.completed : t.common.upcoming}
          </span>
        </div>
        <div className="font-body text-[13.5px] font-semibold text-ink">{p.role}</div>
        <p className="font-body text-[13.5px] leading-relaxed text-sub m-0">{p.desc}</p>
        <div className="flex flex-wrap gap-1.5">{p.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>

        <button
          type="button"
          onClick={() => { sfx("click"); setOpen((o) => !o); }}
          onMouseEnter={() => sfx("hover")}
          className="flex items-center gap-2.5 bg-bg border-2 border-ink px-3.5 py-2.5 font-pixel text-[8px] text-ink text-left hover:bg-folderyellow hover:text-black"
        >
          <span className="inline-block w-0 h-0 border-y-[5px] border-y-transparent border-l-[7px] border-l-purple transition-transform duration-200" style={{ transform: open ? "rotate(90deg)" : "none" }} />
          {t.internships.projectsHdr + " (" + p.projects.length + ")"}
        </button>
        <div className="overflow-hidden transition-[max-height] duration-300" style={{ maxHeight: open ? 900 : 0 }}>
          <div className="grid grid-cols-2 gap-3.5 pt-1.5">
            {p.projects.map((proj) => (
              <div key={proj.title} className="flex flex-col gap-2">
                <div className="w-full h-[120px] border-2 border-ink overflow-hidden bg-bg flex items-center justify-center">
                  {proj.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-pixel text-[8px] text-sub">{t.common.noImage}</span>
                  )}
                </div>
                <div className="font-pixel text-[8px] leading-relaxed text-ink">{proj.title}</div>
                {proj.desc && <p className="font-body text-xs leading-normal text-sub m-0">{proj.desc}</p>}
                <div className="flex gap-2 flex-wrap">
                  {proj.writeup && <PixelButton small href={proj.writeup} download={proj.writeup.split("/").pop()}>{proj.writeupLabel ?? "WRITEUP"}</PixelButton>}
                  {proj.repo && <PixelButton small href={proj.repo} external>{t.common.viewRepo + " >"}</PixelButton>}
                  {proj.writeupSoon && <span className="font-pixel text-[7px] text-sub border-2 border-ink bg-card px-2.5 py-2 shadow-pixelSm">{t.common.writeupSoon}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        {p.footer && <span className="font-pixel text-[8px] text-green-600 mt-auto">{p.footer}</span>}
      </div>
    </div>
  );
}
