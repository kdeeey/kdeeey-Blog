"use client";
import { useEffect, useRef, useState } from "react";
import { useApp } from "../providers";
import { links } from "@/lib/translations";
import PageShell from "../components/PageShell";
import Character from "../components/Character";
import SpeechBubble from "../components/SpeechBubble";
import SocialIcon from "../components/SocialIcon";
import BackButton from "../components/BackButton";
import type { Direction, CharacterAnim } from "@/types";

export default function ContactPage() {
  const { t, sfx } = useApp();
  const [msg, setMsg] = useState<string | null>(null);
  const [dir, setDir] = useState<Direction>(2);
  const [anim, setAnim] = useState<CharacterAnim>("idle");
  const [idleIdx, setIdleIdx] = useState(0);
  const hovering = useRef(false);

  useEffect(() => {
    const id = setInterval(() => { if (!hovering.current) setIdleIdx((i) => i + 1); }, 5000);
    return () => clearInterval(id);
  }, []);

  const enter = (m: string) => { hovering.current = true; setDir(3); setMsg(m); };
  const leave = () => { hovering.current = false; setDir(2); setMsg(null); };
  const activate = () => {
    setAnim("slash"); setMsg(t.contact.bubbles.seeYou);
    setTimeout(() => setAnim("idle"), 520);
  };

  const b = t.contact.bubbles;
  const socials = [
    { label: "in", title: "LinkedIn", href: links.linkedin, bg: "#0A66C2", msg: b.linkedin },
    { label: "GH", title: "GitHub", href: links.github, bg: "#111111", msg: b.github, icon: "/images/git-icon.png", invertIcon: true },
    { label: "THM", title: "TryHackMe", href: links.tryhackme, bg: "#EF4444", msg: b.tryhackme, fontSize: 8 },
    { label: "@", title: "Email", href: links.mail, bg: "#9333EA", msg: b.mail, fontSize: 13 },
    { label: "X", title: "X", href: links.x, bg: "#111111", msg: b.x },
    { label: "DC", title: "Discord", href: links.discord, bg: "#5865F2", msg: b.discord, icon: "/images/discord-icon.png" },
    { label: "CTF", title: "CTFtime", href: links.ctftime, bg: "#22C55E", msg: b.ctftime, fontSize: 8 },
  ];

  return (
    <PageShell>
      <div className="fixed inset-0 overflow-hidden">
        {/* Character - left edge, standing on ground */}
        <div className="absolute bottom-24 flex flex-col items-center" style={{ left: "clamp(24px, 7vw, 120px)" }}>
          <SpeechBubble text={msg ?? b.default[idleIdx % b.default.length]} className="ml-16 -mb-[34px] z-[2]" />
          <div className="w-80 h-80 flex items-end justify-center">
            <Character anim={anim} dir={dir} scale={2.5} style={{ transition: "transform 0.25s ease", rotate: dir === 3 ? "4deg" : "0deg" }} />
          </div>
          <div className="w-80 h-3 bg-dot rounded-full mt-0.5" />
        </div>
        {/* Socials - right column */}
        <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center gap-6" style={{ right: "clamp(24px, 8vw, 140px)" }}>
          <div className="flex items-center gap-3.5 bg-[#111111] border-[3px] border-ink rounded-full py-1.5 pl-2 pr-7 shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/profile-pic.jpg" alt="Karima" className="w-12 h-12 rounded-full object-cover object-top border-2 border-black" />
            <span className="font-pixel text-[11px] text-[#F5F5F5]">{t.contact.handle}</span>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-4 justify-items-center">
            {socials.map((s) => (
              <SocialIcon key={s.title} {...s} onEnter={() => enter(s.msg)} onLeave={leave} onActivate={activate} />
            ))}
          </div>
        </div>
        {/* Bottom: back + footer */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3.5 pb-0">
          <BackButton />
          <div className="w-full border-t-[3px] border-ink bg-card py-3.5 flex justify-center">
            <a href={links.mail} onMouseEnter={() => sfx("hover")} className="font-pixel text-[8px] tracking-wide">
              {t.contact.sendRaven + " ▶ KARIMAEDDAHHAK@GMAIL.COM"}
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
