"use client";
import { useApp } from "../../providers";
import SectionPage from "../../components/SectionPage";
import CertificateCard from "../../components/CertificateCard";

export default function CertificatesPage() {
  const { t } = useApp();
  return (
    <SectionPage title={t.certificates.title} wide>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-7">
        <CertificateCard item={{ ...t.certificates.aws, tags: [...t.certificates.aws.tags], status: "completed", image: "/images/aws-cert.jpg" }} />
        <CertificateCard item={{ ...t.certificates.cpts, tags: [...t.certificates.cpts.tags], status: "inPrep" }} />
        <CertificateCard item={{ title: "", issuer: "", status: "locked", tags: [] }} />
      </div>
    </SectionPage>
  );
}
