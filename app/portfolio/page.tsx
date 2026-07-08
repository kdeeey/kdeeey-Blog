"use client";
import Link from "next/link";
import { useApp } from "../providers";
import PageShell from "../components/PageShell";
import BackButton from "../components/BackButton";

const ROW_META: Array<{ key: "projects" | "internships" | "ctf" | "hackathons" | "certificates" | "htb"; href: string; color: string }> = [
  { key: "projects", href: "/portfolio/projects", color: "#3B82F6" },
  { key: "internships", href: "/portfolio/internships", color: "#C084FC" },
  { key: "ctf", href: "/portfolio/ctf", color: "#EF4444" },
  { key: "hackathons", href: "/portfolio/hackathons", color: "#F97316" },
  { key: "certificates", href: "/portfolio/certificates", color: "#EAB308" },
  { key: "htb", href: "/portfolio/htb", color: "#22C55E" },
];

export default function QuestLog() {
  const { t, sfx } = useApp();
  return (
    <PageShell>
      <div className="max-w-[760px] mx-auto px-8 pt-28 pb-20 flex flex-col gap-8">
        <div>
          <h1 className="font-pixel text-[clamp(14px,2.2vw,22px)] tracking-[3px] m-0">{t.portfolio.questLog}</h1>
          <p className="font-pixel text-[8px] text-sub mt-4 m-0">{t.portfolio.selectCategory}</p>
        </div>
        <div className="flex flex-col gap-4">
          {ROW_META.map(({ key, href, color }) => {
            const row = t.portfolio.rows[key];
            return (
              <Link
                key={key}
                href={href}
                onMouseEnter={() => sfx("hover")}
                onClick={() => sfx("nav")}
                className="flex items-center justify-between bg-card border-[3px] border-ink shadow-pixel px-6 py-5 transition-transform hover:translate-x-1.5 !text-ink"
              >
                <div className="flex flex-col gap-2.5">
                  <div className="font-pixel text-[10px] text-ink">
                    {row.pre + " · "}<span style={{ color }}>{row.cat}</span>
                  </div>
                  <div className="font-pixel text-[8px] text-sub">{row.sub}</div>
                </div>
                <span className="font-pixel text-[12px] text-ink">{"▶"}</span>
              </Link>
            );
          })}
        </div>
        <div><BackButton /></div>
      </div>
    </PageShell>
  );
}
