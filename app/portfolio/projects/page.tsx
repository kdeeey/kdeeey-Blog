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

export default function ProjectsPage() {
  const { t } = useApp();
  const items = t.projects.items;
  const cats = t.projects.categories;
  return (
    <SectionPage title={t.projects.title} wide>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <CategoryHeader label={cats.web} />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-7">
            <ProjectCard
              item={{ ...items.nood, tags: [...items.nood.tags], repo: links.repos.nood }}
              image="/NOOD.jpeg"
              imageAlt="NOOD"
            />
            <ProjectCard
              item={{ ...items.campusops, tags: [...items.campusops.tags], repo: links.repos.campusops }}
              image="/compusops.jpeg"
              imageAlt="CampusOps"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <CategoryHeader label={cats.malware} />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-7">
            <ProjectCard
              item={{ ...items.malware, tags: [...items.malware.tags], repo: links.repos.malware }}
              image="/malware-icon-1024x569.jpg"
              imageAlt="Malware Features Extraction"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <CategoryHeader label={cats.ai} />
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-7">
            <ProjectCard
              item={{ ...items.satellite, tags: [...items.satellite.tags], repo: links.repos.satellite }}
              image="/satelite.png"
              imageAlt="Satellite Protection"
            />
          </div>
        </div>
      </div>
    </SectionPage>
  );
}
