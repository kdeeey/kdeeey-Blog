"use client";
import { useState } from "react";
import { useApp } from "../../providers";
import SectionPage from "../../components/SectionPage";
import HtbLabCard from "../../components/HtbLabCard";
import PixelButton from "../../components/PixelButton";

type LabTab = "htb" | "cpts" | "other";

// Add completed machines/labs as { machine, difficulty, tags, writeup } objects per tab.
export default function LabsPage() {
  const { t } = useApp();
  const [tab, setTab] = useState<LabTab>("htb");
  const tabs: LabTab[] = ["htb", "cpts", "other"];
  return (
    <SectionPage title={t.htb.title} sub={t.htb.sub} wide>
      <div className="flex flex-col gap-8">
        <div className="flex gap-3 flex-wrap">
          {tabs.map((k) => (
            <PixelButton key={k} small active={tab === k} onClick={() => setTab(k)}>
              {t.htb.tabs[k]}
            </PixelButton>
          ))}
        </div>
        {tab === "other" ? (
          <div className="border-[3px] border-dashed border-[#b9b9b9] bg-bg opacity-70 min-h-[170px] flex items-center justify-center px-6">
            <span className="font-pixel text-[9px] text-sub text-center leading-[2]">{t.htb.otherDesc}</span>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
            <HtbLabCard />
            <HtbLabCard />
            <HtbLabCard />
          </div>
        )}
      </div>
    </SectionPage>
  );
}
