"use client";
import { useApp } from "../providers";
import { useTypewriter } from "@/lib/utils";
import PageShell from "../components/PageShell";
import Character from "../components/Character";
import SpeechBubble from "../components/SpeechBubble";
import PixelButton from "../components/PixelButton";

function Badge({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span className={"font-pixel text-[8px] border-2 border-ink rounded-full px-3.5 py-2 shadow-pixelSm whitespace-nowrap " + (active ? "bg-purple text-black" : "bg-card text-ink")}>
      {children}
    </span>
  );
}

export default function AboutPage() {
  const { t } = useApp();
  const { typed } = useTypewriter(t.about.questText);
  return (
    <PageShell>
      <div className="max-w-[1040px] mx-auto px-8 pt-24 pb-20 flex flex-col gap-8">
        <div className="flex gap-2.5 flex-wrap">
          <Badge active>{t.about.badgeProfile}</Badge>
          <Badge>{t.about.badgeLvl}</Badge>
          <Badge>{t.about.badgeClass}</Badge>
          <Badge>{t.about.badgeGuild}</Badge>
        </div>
        <div className="flex gap-10 items-stretch flex-wrap">
          <div className="flex-[2_1_240px] min-w-[220px] flex flex-col items-center justify-end pb-2">
            <SpeechBubble text={t.about.bubble} className="ml-12 -mb-4 z-[2]" />
            <div className="w-[200px] h-[200px] flex items-end justify-center">
              <Character anim="idle" scale={1.55} />
            </div>
            <div className="w-[210px] h-2.5 bg-dot rounded-full mt-0.5" />
          </div>
          <div className="flex-[3_1_420px] min-w-[320px] bg-card border-[3px] border-ink shadow-pixelLg p-7 flex flex-col gap-5">
            <div>
              <div className="font-pixel text-[clamp(13px,1.8vw,18px)] leading-relaxed text-ink">{t.about.name}</div>
              <div className="h-1 bg-ink mt-3" />
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3.5 font-pixel text-[9px] leading-[1.8] text-ink">
              <div>{t.about.lvl + ": "}<span className="text-purple">1</span></div>
              <div>{t.about.age + ": "}<span className="text-purple">22</span></div>
              <div>{t.about.clazz + ": "}<span className="text-folderblue">CYBERSEC</span></div>
              <div>{t.about.guild + ": "}<span className="text-folderred">UEMF</span></div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="font-pixel text-[9px] text-sub">{t.about.specialty}</div>
              <div className="font-pixel text-[9px] text-ink leading-[2.2]">
                {t.about.specialties.map((s) => <div key={s}>{s}</div>)}
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="font-pixel text-[9px] text-sub">{t.about.currentQuest}</div>
              <div className="font-pixel text-[10px] text-ink leading-loose min-h-[2em]">
                {typed}<span className="animate-[kblink_0.8s_infinite] text-purple">{"▎"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-6 flex-wrap items-stretch">
          <div className="flex-[1_1_380px] bg-card border-[3px] border-ink shadow-pixelLg px-6 py-5 flex items-center gap-4.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/uemf-logo.png" alt="UEMF logo" className="h-14 w-auto bg-white border-2 border-ink p-1 flex-none" />
            <div className="flex flex-col gap-2 ml-4">
              <div className="font-pixel text-[9px] text-sub">{t.about.guildAffiliation}</div>
              <div className="font-pixel text-[8px] text-ink leading-[1.9]">{t.about.uemfName}<br />{t.about.uemfProg}</div>
            </div>
          </div>
          <div className="self-center">
            <PixelButton href="/CV_ED_DAHHAK_KARIMA_.pdf" download="CV_ED_DAHHAK_KARIMA_.pdf">{"▼ " + t.about.downloadCV}</PixelButton>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
