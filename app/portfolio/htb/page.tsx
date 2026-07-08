"use client";
import { useApp } from "../../providers";
import SectionPage from "../../components/SectionPage";
import HtbLabCard from "../../components/HtbLabCard";

// Add completed machines here as { machine, difficulty, tags, writeup } objects.
export default function HtbPage() {
  const { t } = useApp();
  return (
    <SectionPage title={t.htb.title} sub={t.htb.sub} wide>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
        <HtbLabCard />
        <HtbLabCard />
        <HtbLabCard />
      </div>
    </SectionPage>
  );
}
