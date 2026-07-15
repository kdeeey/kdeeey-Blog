"use client";
import { useApp } from "../providers";
import Tag from "./Tag";
import { trackCertificateOpen } from "@/lib/analytics";
import type { CertItem } from "@/types";

// CSS-drawn padlock (no emoji): rounded shackle over a solid body.
function Lock() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-4 h-3 border-[3px] border-b-0 border-sub rounded-t-full" />
      <div className="w-7 h-5 bg-sub" />
    </div>
  );
}

export default function CertificateCard({ item }: { item: CertItem }) {
  const { t } = useApp();
  if (item.status === "locked") {
    return (
      <div className="border-[3px] border-dashed border-[#b9b9b9] bg-bg opacity-60 min-h-[240px] flex flex-col items-center justify-center gap-3">
        <Lock />
        <div className="font-pixel text-[10px] text-sub">{t.certificates.locked}</div>
        <div className="font-pixel text-[8px] text-sub">{t.certificates.comingSoon}</div>
      </div>
    );
  }
  return (
    <div
      className="relative bg-card border-[3px] border-ink shadow-pixelLg p-4 flex flex-col gap-2.5"
      onClick={() => trackCertificateOpen(item.title)}
    >
      <div className="w-full h-[180px] border-2 border-ink bg-[#f8f8f8] flex items-center justify-center overflow-hidden">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
        ) : (
          <Lock />
        )}
      </div>
      <div className="font-pixel text-[10px] leading-relaxed text-ink">{item.title}</div>
      <div className="font-body text-[13px] text-sub">{item.issuer}</div>
      <span className={"font-pixel text-[8px] " + (item.status === "completed" ? "text-green-600" : "text-folderyellow")}>
        {item.status === "completed" ? t.common.completed : t.common.inPrep}
      </span>
      <div className="flex flex-wrap gap-1.5">{item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
    </div>
  );
}
