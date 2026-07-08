"use client";
import { useApp } from "../../providers";
import SectionPage from "../../components/SectionPage";
import HackathonCard from "../../components/HackathonCard";

export default function HackathonsPage() {
  const { t } = useApp();
  const h = t.hackathons;
  return (
    <SectionPage title={h.title} sub={h.sub} wide>
      <div className="flex flex-col gap-7">
        <HackathonCard item={{ ...h.actinspace, tags: [...h.actinspace.tags], image: "/images/hackathon-actinspace.jpg" }} />
        <HackathonCard item={{ ...h.hackdays, tags: [...h.hackdays.tags], image: "/images/hackdays.jpg" }} />
        <HackathonCard item={{ ...h.forum, tags: [...h.forum.tags], image: "/images/employment-forum.jpg" }} />
      </div>
    </SectionPage>
  );
}
