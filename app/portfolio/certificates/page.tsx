"use client";
import { useApp } from "../../providers";
import SectionPage from "../../components/SectionPage";
import CertificateCard from "../../components/CertificateCard";

function CategoryHeader({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="font-pixel text-[11px] text-ink">{label}</div>
      <div className="h-1 bg-ink w-36" />
    </div>
  );
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-7">{children}</div>;
}

export default function CertificatesPage() {
  const { t } = useApp();
  const c = t.certificates;
  return (
    <SectionPage title={c.title} wide>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <CategoryHeader label={c.categories.professional} />
          <CardGrid>
            <CertificateCard item={{ ...c.aws, tags: [...c.aws.tags], status: "completed", image: "/images/aws-cert.jpg" }} />
            <CertificateCard item={{ ...c.cpts, tags: [...c.cpts.tags], status: "inPrep" }} />
            <CertificateCard item={{ title: "", issuer: "", status: "locked", tags: [] }} />
          </CardGrid>
        </div>
        <div className="flex flex-col gap-5">
          <CategoryHeader label={c.categories.ctf} />
          <CardGrid>
            <CertificateCard item={{ ...c.securinets, tags: [...c.securinets.tags], status: "completed", image: "/images/securinets-2026-cert.png" }} />
            <CertificateCard item={{ ...c.cyberApocalypse, tags: [...c.cyberApocalypse.tags], status: "completed", image: "/cyber-apocalypse-2026-cert.png" }} />
          </CardGrid>
        </div>
      </div>
    </SectionPage>
  );
}
