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
        <HackathonCard
          item={{
            ...h.actinspace, tags: [...h.actinspace.tags], image: "/images/hackathon-actinspace.jpg",
            gallery: ["/images/workflow_act_in_space.png", "/images/team_act_in_space.png"],
          }}
        />
        <HackathonCard
          item={{
            ...h.hackdays, tags: [...h.hackdays.tags], image: "/images/hackdays.jpg",
            gallery: ["/images/hackdays_pic.png"],
          }}
        />
        <HackathonCard
          item={{
            ...h.forum, tags: [...h.forum.tags], image: "/images/employment-forum.jpg",
            gallery: ["/images/NOOD_interface1.png", "/images/NOOD_interface2.png", "/images/NOOD_interface3.png", "/images/NOOD_interface4.png"],
          }}
        />
      </div>
    </SectionPage>
  );
}
