"use client";
import { useState } from "react";
import { useApp } from "../../providers";
import SectionPage from "../../components/SectionPage";
import HtbLabCard from "../../components/HtbLabCard";
import PixelButton from "../../components/PixelButton";

type LabTab = "htb" | "cpts" | "other";

export default function LabsPage() {
  const { t } = useApp();
  const [tab, setTab] = useState<LabTab>("htb");
  const tabs: LabTab[] = ["htb", "cpts", "other"];

  const labsData: Record<LabTab, Array<{ machine: string; difficulty: string; tags: string[]; writeup?: string; description?: string }>> = {
    htb: [
      {
        machine: "Reactor",
        difficulty: "Easy",
        tags: ["React", "Flight", "RCE", "Next.js"],
        writeup: "https://app.notion.com/p/Hack-The-Box-Reactor-Walkthrough-Discovering-React-Flight-RCE-in-Next-js-3b406336715380d984ecdfc7f7f0c505?source=copy_link",
        description: "Exploited a vulnerable React Flight implementation in Next.js to achieve RCE, extract credentials from a SQLite database, gain SSH access, and escalate privileges via the exposed Node.js Inspector to obtain root access.",
        image: "/images/Reactor htb.png"
      }
    ],
    cpts: [
      {
        machine: "Path Traversal",
        difficulty: "Easy",
        tags: ["WordPress", "Path Traversal", "CVE-2021"],
        writeup: "https://app.notion.com/p/Public-Exploits-Lab-Exploiting-WordPress-Simple-Backup-Plugin-Path-Traversal-3b40633671538013945bc132cdc6f4eb?source=copy_link",
        description: "Exploited a Path Traversal vulnerability in the WordPress Simple Backup Plugin (CVE-2021) to read arbitrary files without authentication. Used Nmap for enumeration and both manual and automated techniques to retrieve the flag."
      }
    ],
    other: []
  };

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
        {labsData[tab].length > 0 && tab !== "other" ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
            {labsData[tab].map((lab, index) => (
              <HtbLabCard key={index} lab={lab} />
            ))}
          </div>
        ) : tab === "other" ? (
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
