"use client";
import { useApp } from "../../providers";
import SectionPage from "../../components/SectionPage";
import CtfCard from "../../components/CtfCard";
import type { CtfItem } from "@/types";

export default function CtfPage() {
  const { t } = useApp();

  const cards: CtfItem[] = [
    {
      ...t.ctf.inpt,
      tags: [...t.ctf.inpt.tags],
      status: "completed",
      badgeBg: "#3B82F6",
      badgeColor: "#fff",
      image: "/images/inpt_ctf.png",
    },
    {
      ...t.ctf.ensi,
      tags: [...t.ctf.ensi.tags],
      status: "completed",
      badgeBg: "#EF4444",
      badgeColor: "#fff",
    },
    {
      ...t.ctf.cyberApocalypse,
      tags: [...t.ctf.cyberApocalypse.tags],
      status: "completed",
      badgeBg: "#111111",
      badgeColor: "#9FEF00",
      image: "/cyber-apocalypse-2026-cert.png",
      imageContain: true,
      isEpic: true,
      performance: t.ctf.cyberApocalypse.performance,
      categories: t.ctf.cyberApocalypse.categories,
      extendedDesc: t.ctf.cyberApocalypse.extendedDesc,
      highlights: t.ctf.cyberApocalypse.highlights,
    },
    {
      ...t.ctf.htb,
      tags: [...t.ctf.htb.tags],
      status: "completed",
      badgeBg: "#111111",
      badgeColor: "#9FEF00",
      image: "/images/htb_women_ctf.png",
    },
  ];

  return (
    <SectionPage title={t.ctf.title}>
      <div className="flex flex-col gap-6">
        {cards.map((item) => (
          <CtfCard key={item.title} item={item} />
        ))}
      </div>
    </SectionPage>
  );
}
