"use client";
import { useApp } from "../../providers";
import { links } from "@/lib/translations";
import SectionPage from "../../components/SectionPage";
import ProjectCard from "../../components/ProjectCard";

function CategoryHeader({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="font-pixel text-[11px] text-ink">{label}</div>
      <div className="h-1 bg-ink w-36" />
    </div>
  );
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 items-start">{children}</div>;
}

export default function ProjectsPage() {
  const { t } = useApp();
  const items = t.projects.items;
  const cats = t.projects.categories;
  return (
    <SectionPage title={t.projects.title} wide>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <CategoryHeader label={cats.academic} />
          <CardGrid>
            <ProjectCard
              item={{ ...items.campusops, tags: [...items.campusops.tags], repo: links.repos.campusops, team: true }}
              image="/compusops.jpeg"
              imageAlt="CampusOps"
            />
            <ProjectCard
              item={{ ...items.malware, tags: [...items.malware.tags], repo: links.repos.malware }}
              image="/malware-icon-1024x569.jpg"
              imageAlt="Malware Features Extraction"
            />
          </CardGrid>
        </div>
        <div className="flex flex-col gap-5">
          <CategoryHeader label={cats.hackathon} />
          <CardGrid>
            <ProjectCard
              item={{ ...items.nood, tags: [...items.nood.tags], repo: links.repos.nood, team: true }}
              image="/NOOD.jpeg"
              imageAlt="NOOD"
            />
            <ProjectCard
              item={{ ...items.satellite, tags: [...items.satellite.tags], repo: links.repos.satellite, team: true }}
              image="/satelite.png"
              imageAlt="Satellite Protection"
            />
          </CardGrid>
        </div>
        <div className="flex flex-col gap-5">
          <CategoryHeader label={cats.internship} />
          <CardGrid>
            <ProjectCard
              item={{ ...items.dgi, tags: [...items.dgi.tags], repo: links.repos.dgi, live: links.live.dgi, team: true }}
              images={["/images/DGI_pipline.jpeg", "/images/general_view_dgi.jpeg"]}
              imageAlt="Public Procurement Analysis"
            />
          </CardGrid>
        </div>
      </div>
    </SectionPage>
  );
}
