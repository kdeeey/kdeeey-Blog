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
          photo="/images/AD_lab.png"
          status="completed" footer={m.handsOnLab}
          projects={[
            { title: m.m1337.adLab.title, writeup: "/Kerberoasting writeup.pdf", writeupLabel: m.m1337.adLab.writeup },
            { title: m.m1337.rag.title, desc: m.m1337.rag.desc, repo: links.repos.rag, writeupSoon: true },
          ]}
        />
        <InternshipCard
          logo="/images/DGI.png"
          title={m.dgi.title} role={m.dgi.role} desc={m.dgi.desc} tags={[...m.dgi.tags]}
          status="completed"
          projects={[{
            title: m.dgi.procurement.title,
            desc: m.dgi.procurement.desc,
            image: "/images/DGI_pipline.jpeg",
            gallery: ["/images/general_view_dgi.jpeg"],
            repo: links.repos.dgi,
            live: links.live.dgi,
          }]}
        />
      </div>
    </SectionPage>
  );
}
