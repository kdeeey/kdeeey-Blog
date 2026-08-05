"use client";
import { useState } from "react";
import { useApp } from "../providers";
import Tag from "./Tag";
import type { CtfItem } from "@/types";

export default function CtfCard({ item }: { item: CtfItem }) {
  const { t } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const done = item.status === "completed";

  const renderLightbox = () => {
    if (!isModalOpen || !item.image) return null;
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
        onClick={() => setIsModalOpen(false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={item.image} 
          alt={item.title} 
          className="max-w-full max-h-[90vh] object-contain border-[4px] border-[#9FEF00] shadow-pixelLg"
        />
        <button 
          className="absolute top-4 right-6 text-[#9FEF00] font-pixel text-2xl hover:text-white"
          onClick={() => setIsModalOpen(false)}
        >
          &times;
        </button>
      </div>
    );
  };

  if (item.isEpic) {
    return (
      <>
        {renderLightbox()}
        <div className="bg-card border-[3px] border-ink shadow-pixelLg flex flex-col group">
          {item.image && (
            <div 
              className={"border-b-[3px] border-ink overflow-hidden cursor-pointer relative " + (item.imageContain ? "bg-bg" : "h-[220px]")}
              onClick={() => setIsModalOpen(true)}
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10 pointer-events-none" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className={"transition-transform duration-500 group-hover:scale-[1.02] " + (item.imageContain ? "w-full h-auto block" : "w-full h-full object-cover")}
              />
            </div>
          )}
          <div className="p-7 flex flex-col gap-6">
            
            {/* Header section */}
            <div className="flex flex-col gap-3 border-b-2 border-dot pb-6">
              <div className="flex items-center gap-3.5 flex-wrap">
                <span className="font-pixel text-[10px] border-2 border-ink px-3 py-2" style={{ background: item.badgeBg, color: item.badgeColor }}>{item.title}</span>
                <span className="font-pixel text-[8px] text-green-600">{item.xp}</span>
                <span className={"font-pixel text-[8px] " + (done ? "text-green-600" : "text-folderyellow")}>
                  {done ? t.common.completed : t.common.inProgress}
                </span>
              </div>
              <p className="font-body text-[14.5px] leading-relaxed text-sub m-0">{item.desc}</p>
            </div>

            {/* My Performance Section */}
            {item.performance && (
              <div className="flex flex-col gap-3">
                <div className="font-pixel text-[11px] text-ink">My Performance</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="flex flex-col gap-1 border-2 border-ink bg-bg p-3">
                    <span className="font-pixel text-[7px] text-sub">{item.performance.rank.split(':')[0]}</span>
                    <span className="font-pixel text-[9px] text-ink">{item.performance.rank.split(':')[1]}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-2 border-ink bg-bg p-3">
                    <span className="font-pixel text-[7px] text-sub">{item.performance.solved.split(':')[0]}</span>
                    <span className="font-pixel text-[9px] text-ink">{item.performance.solved.split(':')[1]}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-2 border-ink bg-bg p-3">
                    <span className="font-pixel text-[7px] text-sub">{item.performance.score.split(':')[0]}</span>
                    <span className="font-pixel text-[9px] text-green-600">{item.performance.score.split(':')[1]}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-2 border-ink bg-bg p-3">
                    <span className="font-pixel text-[7px] text-sub">{item.performance.team.split(':')[0]}</span>
                    <span className="font-pixel text-[9px] text-purple">{item.performance.team.split(':')[1]}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Challenge Categories Section */}
            {item.categories && (
              <div className="flex flex-col gap-3">
                <div className="font-pixel text-[11px] text-ink">Challenge Categories Played</div>
                <div className="flex flex-wrap gap-1.5">
                  {item.categories.map((cat) => (
                    <span key={cat} className="text-[11px] font-semibold border-2 border-ink px-2 py-0.5 bg-bg text-ink font-body">
                      {cat}
                    </span>
                  ))}
                </div>
                {item.extendedDesc && (
                  <p className="font-body text-[14px] leading-relaxed text-sub mt-2 border-l-4 border-ink pl-4 py-1 italic">
                    {item.extendedDesc}
                  </p>
                )}
              </div>
            )}

            {/* Highlights Section */}
            {item.highlights && (
              <div className="flex flex-col gap-3">
                <div className="font-pixel text-[11px] text-ink">Highlights</div>
                <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                  {item.highlights.map((hi, i) => (
                    <li key={i} className="font-body text-[14px] text-sub flex items-start gap-3">
                      <span className="text-ink font-pixel text-[8px] mt-[5px]">{'>'}</span>
                      {hi}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // Standard CTF Card
  return (
    <>
      {renderLightbox()}
      <div className="bg-card border-[3px] border-ink shadow-pixelLg flex flex-col group">
        {item.image && (
          <div 
            className={"border-b-[3px] border-ink overflow-hidden relative cursor-pointer " + (item.imageContain ? "bg-bg" : "h-[220px]")}
            onClick={() => setIsModalOpen(true)}
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10 pointer-events-none" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image}
              alt={item.title}
              className={"transition-transform duration-500 group-hover:scale-[1.02] " + (item.imageContain ? "w-full h-auto block" : "w-full h-full object-cover")}
            />
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
    </>
  );
}
