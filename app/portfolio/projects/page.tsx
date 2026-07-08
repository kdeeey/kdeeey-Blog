"use client";
import { useApp } from "../../providers";
import { links } from "@/lib/translations";
import SectionPage from "../../components/SectionPage";
import ProjectCard from "../../components/ProjectCard";

export default function ProjectsPage() {
  const { t } = useApp();
  const items = t.projects.items;
  return (
    <SectionPage title={t.projects.title} wide>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-7">
        <ProjectCard 
          item={{ ...items.nood, tags: [...items.nood.tags], repo: links.repos.nood }} 
          image="/NOOD.jpeg"
          imageAlt="NOOD"
        />
        <ProjectCard 
          item={{ ...items.malware, tags: [...items.malware.tags], repo: links.repos.malware }} 
          image="/malware-icon-1024x569.jpg"
          imageAlt="Malware Features Extraction"
        />
        <ProjectCard 
          item={{ ...items.campusops, tags: [...items.campusops.tags], repo: links.repos.campusops }} 
          image="/compusops.jpeg"
          imageAlt="CampusOps"
        />
        <ProjectCard 
          item={{ ...items.satellite, tags: [...items.satellite.tags], repo: links.repos.satellite }} 
          image="/satelite.png"
          imageAlt="Satellite Protection"
        />
      </div>
    </SectionPage>
  );
}
