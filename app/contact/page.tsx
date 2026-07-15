"use client";
import { useEffect, useRef, useState } from "react";
import { useApp } from "../providers";
import { links } from "@/lib/translations";
import PageShell from "../components/PageShell";
import Character from "../components/Character";
import SpeechBubble from "../components/SpeechBubble";
import SocialIcon from "../components/SocialIcon";
import BackButton from "../components/BackButton";
import { trackExternalLink } from "@/lib/analytics";
import type { CharacterAnim } from "@/types";

export default function ContactPage() {
  const { t, sfx } = useApp();
  const [msg, setMsg] = useState<string | null>(null);
  const [happy, setHappy] = useState(false);
  const [anim, setAnim] = useState<CharacterAnim>("idle");
  const [idleIdx, setIdleIdx] = useState(0);
  const hovering = useRef(false);

  useEffect(() => {
    const id = setInterval(() => { if (!hovering.current) setIdleIdx((i) => i + 1); }, 5000);
    return () => clearInterval(id);
  }, []);

  // Hovering a social makes her hop happily, facing the visitor.
  const enter = (m: string) => { hovering.current = true; setHappy(true); setMsg(m); };
  const leave = () => { hovering.current = false; setHappy(false); setMsg(null); };
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
    { label: "M", title: "Medium", href: links.medium, bg: "#111111", msg: b.medium, icon: "/images/medium_logo.png" },
    { label: "SP", title: "Spotify", href: links.spotify, bg: "#FFFFFF", msg: b.spotify, icon: "/images/spotify_logo.png" },
  ];

  return (
    <PageShell cat="play">
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 pt-32 sm:pt-24 pb-12">
        <h1 className="font-pixel text-[clamp(14px,2.4vw,22px)] tracking-[4px] text-center m-0">{t.contact.title}</h1>

        {/* Identity pill - focal point above the character */}
        <div className="flex items-center gap-4 bg-[#111111] border-[3px] border-ink rounded-full py-2 pl-2.5 pr-9 shadow-[4px_4px_0_rgba(0,0,0,0.3)] min-w-[200px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/profile-pic.jpg" alt="Karima" className="w-14 h-14 rounded-full object-cover object-top border-2 border-black" />
          <span className="font-pixel text-[13px] text-[#F5F5F5]">{t.contact.handle}</span>
        </div>

        {/* Speech bubble above the character */}
        <div className="flex flex-col items-center">
          <SpeechBubble text={msg ?? b.default[idleIdx % b.default.length]} className="z-[2]" />
          <div className="w-52 h-52 flex items-end justify-center" style={{ animation: happy ? "khop 0.5s ease-in-out infinite" : "none" }}>
            <Character anim={anim} dir={2} scale={1.55} />
          </div>
        </div>

        {/* Socials - single centered row (wraps 4+3 on small screens) */}
        <div className="flex flex-wrap justify-center gap-6 max-w-[760px]">
          {socials.map((s) => (
            <SocialIcon key={s.title} {...s} onEnter={() => enter(s.msg)} onLeave={leave} onActivate={activate} />
          ))}
        </div>

        {/* Email */}
        <a href={links.mail} onMouseEnter={() => sfx("hover")} onClick={() => { sfx("click"); trackExternalLink(links.mail); }} className="font-pixel text-[9px] tracking-wide text-center leading-loose">
          {t.contact.sendRaven + " — KARIMAEDDAHHAK@GMAIL.COM"}
        </a>

        <BackButton />
      </div>
    </PageShell>
  );
}
