"use client";
import { useApp } from "../../providers";
import { links } from "@/lib/translations";
import SectionPage from "../../components/SectionPage";
import InternshipCard from "../../components/InternshipCard";

export default function InternshipsPage() {
  const { t } = useApp();
  const m = t.internships;
  return (
    <SectionPage title={m.title} sub={m.sub} wide>
      <div className="grid md:grid-cols-2 gap-7 items-start">
        <InternshipCard
          logo="/images/1337.png" logoDark
          title={m.m1337.title} role={m.m1337.role} desc={m.m1337.desc} tags={[...m.m1337.tags]}
          status="completed" footer={m.handsOnLab}
          projects={[
            { title: m.m1337.adLab.title, writeup: "/Kerberoasting writeup.pdf", writeupLabel: m.m1337.adLab.writeup },
            { title: m.m1337.rag.title, desc: m.m1337.rag.desc, repo: links.repos.rag, writeupSoon: true },
          ]}
        />
        <InternshipCard
          logo="/images/DGI.png"
          title={m.dgi.title} role={m.dgi.role} desc={m.dgi.desc} tags={[...m.dgi.tags]}
          status="upcoming"
          projects={[{ title: m.dgi.tax.title, repo: links.repos.dgi, writeupSoon: true }]}
        />
      </div>
    </SectionPage>
  );
}
