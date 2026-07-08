"use client";
import PageShell from "./PageShell";
import BackButton from "./BackButton";

export default function SectionPage({ title, sub, wide, children }: { title: string; sub?: string; wide?: boolean; children: React.ReactNode }) {
  return (
    <PageShell>
      <div className={(wide ? "max-w-[1080px]" : "max-w-[880px]") + " mx-auto px-8 pt-28 pb-20"}>
        <h1 className="font-pixel text-[clamp(14px,2.2vw,22px)] tracking-[3px] m-0">{title}</h1>
        {sub && <p className="font-pixel text-[8px] text-sub mt-4 leading-[1.9] m-0">{sub}</p>}
        <div className="mt-9">{children}</div>
        <div className="mt-14"><BackButton toPortfolio /></div>
      </div>
    </PageShell>
  );
}
