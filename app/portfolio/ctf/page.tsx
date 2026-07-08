"use client";
import { useApp } from "../../providers";
import SectionPage from "../../components/SectionPage";
import CtfCard from "../../components/CtfCard";

export default function CtfPage() {
  const { t } = useApp();
  return (
    <SectionPage title={t.ctf.title}>
      <div className="flex flex-col gap-6">
        <CtfCard item={{ ...t.ctf.inpt, tags: [...t.ctf.inpt.tags], status: "completed", badgeBg: "#3B82F6", badgeColor: "#fff" }} />
        <CtfCard item={{ ...t.ctf.ensi, tags: [...t.ctf.ensi.tags], status: "completed", badgeBg: "#EF4444", badgeColor: "#fff" }} />
        <CtfCard item={{ ...t.ctf.htb, tags: [...t.ctf.htb.tags], status: "completed", badgeBg: "#111111", badgeColor: "#9FEF00" }} />
      </div>
    </SectionPage>
  );
}
