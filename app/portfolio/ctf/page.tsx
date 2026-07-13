"use client";
import { useApp } from "../../providers";
import SectionPage from "../../components/SectionPage";
import CtfCard from "../../components/CtfCard";

function GroupHeader({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="font-pixel text-[11px] text-ink">{label}</div>
      <div className="h-1 bg-ink w-36" />
    </div>
  );
}

export default function CtfPage() {
  const { t } = useApp();
  return (
    <SectionPage title={t.ctf.title}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <GroupHeader label={t.ctf.online} />
          <CtfCard item={{ ...t.ctf.ensi, tags: [...t.ctf.ensi.tags], status: "completed", badgeBg: "#EF4444", badgeColor: "#fff" }} />
        </div>
        <div className="flex flex-col gap-5">
          <GroupHeader label={t.ctf.local} />
          <div className="flex flex-col gap-6">
            <CtfCard item={{ ...t.ctf.inpt, tags: [...t.ctf.inpt.tags], status: "completed", badgeBg: "#3B82F6", badgeColor: "#fff", image: "/images/inpt_ctf.png" }} />
            <CtfCard item={{ ...t.ctf.htb, tags: [...t.ctf.htb.tags], status: "completed", badgeBg: "#111111", badgeColor: "#9FEF00", image: "/images/htb_women_ctf.png" }} />
          </div>
        </div>
      </div>
    </SectionPage>
  );
}
