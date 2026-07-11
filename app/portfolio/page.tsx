"use client";
import Link from "next/link";
import { useApp } from "../providers";
import PageShell from "../components/PageShell";
import BackButton from "../components/BackButton";
import Character from "../components/Character";

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
      <div className="max-w-[760px] mx-auto px-8 pt-36 sm:pt-28 pb-16 flex flex-col gap-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="font-pixel text-[clamp(16px,2.6vw,26px)] tracking-[3px] m-0" style={{ textShadow: "3px 3px 0 rgba(192,132,252,0.5)" }}>
              {t.portfolio.questLog}
            </h1>
            <p className="font-pixel text-[9px] text-ink opacity-75 mt-4 m-0">{t.portfolio.selectCategory}</p>
          </div>
          <div className="flex-none flex flex-col items-center">
            <div className="w-[92px] h-[92px] flex items-end justify-center">
              <Character anim="idle" scale={0.72} />
            </div>
            <div className="w-[76px] h-2 bg-dot rounded-full mt-0.5" />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          {ROW_META.map(({ key, href, color }) => {
            const row = t.portfolio.rows[key];
            return (
              <Link
                key={key}
                href={href}
                onMouseEnter={() => sfx("hover")}
                onClick={() => sfx("nav")}
                className="group relative flex items-center justify-between bg-card even:bg-[#fafafa] dark:even:bg-[#1e1e28] border-[3px] border-ink shadow-pixel pl-7 pr-6 py-6 transition-all duration-200 hover:translate-x-1 hover:bg-[#f3e8ff] dark:hover:bg-[#2a2140] active:bg-purple/40 !text-ink"
              >
                {/* Category color line on the left edge */}
                <span aria-hidden className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: color }} />
                <div className="flex flex-col gap-2.5">
                  <div className="font-pixel text-[10px] text-ink">
                    {row.pre + " · "}<span style={{ color }}>{row.cat}</span>
                  </div>
                  <div className="font-pixel text-[8px] text-sub">{row.sub}</div>
                </div>
                <span className="font-pixel text-[16px] text-sub transition-all duration-200 group-hover:text-ink group-hover:translate-x-1">{">"}</span>
              </Link>
            );
          })}
        </div>
        <div className="flex justify-center"><BackButton /></div>
      </div>
    </PageShell>
  );
}
