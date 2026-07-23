"use client";
import { useEffect, useRef, useState } from "react";
import { useApp } from "../providers";
import SpeechBubble from "./SpeechBubble";

export type PageCatMode = "wander" | "sit" | "sleep" | "play";

// Lucky's inner-page presence. Timer-driven (no rAF) to stay featherlight:
//   wander - strolls along the bottom edge, sits between walks (section pages)
//   sit    - sits calmly with an occasional hop (About, next to Karima)
//   sleep  - lies flat with floating Zzz (Quest Log bores her)
//   play   - sits near the socials and hops often (Contact)
// Clicking her tells the same Karima facts as on the overworld.
export default function PageCat({ mode }: { mode: PageCatMode }) {
  const { t, sfx } = useApp();
  const [msg, setMsg] = useState<string | null>(null);
  const [x, setX] = useState(24);
  const [walking, setWalking] = useState(false);
  const [hop, setHop] = useState(false);
  const [face, setFace] = useState(1);
  const [moveMs, setMoveMs] = useState(0);
  const [awake, setAwake] = useState(false);   // sleep mode: woken up by a click
  const nextIdx = useRef(Math.floor(Math.random() * Math.max(1, t.home.catBubbles.length)));
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const speak = (e: React.MouseEvent) => {
    e.stopPropagation();
    sfx("hover");
    if (mode === "sleep") {
      // Wake up first: sit up with a little hop, then talk.
      setAwake(true);
      setHop(true);
      setTimeout(() => setHop(false), 450);
    }
    setMsg(t.home.catBubbles[nextIdx.current++ % t.home.catBubbles.length]);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => { setMsg(null); setAwake(false); }, 5000);
  };

  // Wandering: pick a new spot along the bottom every so often.
  // The first placement is instant (moveMs 0) so she doesn't slide across
  // the screen when the page opens; later moves are real walks at a steady
  // pace (duration proportional to distance), legs animating the whole way.
  const xRef = useRef(24);
  useEffect(() => {
    if (mode !== "wander") return;
    const start = Math.max(16, window.innerWidth - 130);
    xRef.current = start;
    setMoveMs(0);
    setX(start);
    let stopWalk: ReturnType<typeof setTimeout> | null = null;
    const id = setInterval(() => {
      const prev = xRef.current;
      const nx = 16 + Math.random() * Math.max(60, window.innerWidth - 150);
      const ms = Math.max(900, Math.abs(nx - prev) * 14);
      xRef.current = nx;
      setFace(nx < prev ? -1 : 1);
      setMoveMs(ms);
      setWalking(true);
      setX(nx);
      if (stopWalk) clearTimeout(stopWalk);
      stopWalk = setTimeout(() => setWalking(false), ms);
    }, 9000 + Math.random() * 5000);
    return () => { clearInterval(id); if (stopWalk) clearTimeout(stopWalk); };
  }, [mode]);

  // Sitting/playing: periodic happy hops (rare when sitting, frequent when playing).
  useEffect(() => {
    if (mode !== "sit" && mode !== "play") return;
    const period = mode === "play" ? 4500 : 11000;
    const id = setInterval(() => {
      setHop(true);
      setTimeout(() => setHop(false), 450);
    }, period);
    return () => clearInterval(id);
  }, [mode]);

  // Dismiss bubble on outside click.
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) { setMsg(null); setAwake(false); }
    };
    document.addEventListener("click", onDoc);
    return () => {
      document.removeEventListener("click", onDoc);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  const asleep = mode === "sleep" && !awake;
  const sheet = walking ? "/images/cat_walk.png" : asleep ? "/images/cat_sleep.png" : "/images/cat_sit.png";
  const anim = walking ? "cat-walk 0.4s steps(4) infinite" : asleep ? "catbreathe 1.8s ease-in-out infinite" : "cat-sit 1.2s steps(2) infinite";

  return (
    <div
      ref={wrapRef}
      className="fixed bottom-2 z-10 pointer-events-none"
      style={
        mode === "wander"
          ? { left: 0, transform: "translateX(" + x + "px)", transition: "transform " + moveMs + "ms linear" }
          : { right: 18 }
      }
    >
      {msg && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 pointer-events-none">
          <SpeechBubble text={msg} wrap />
        </div>
      )}
      {asleep && (
        <div className="absolute -top-7 left-1/2 pointer-events-none font-pixel text-[9px] text-sub">
          {["Z", "z", "z"].map((ch, i) => (
            <span key={i} className="absolute" style={{ left: i * 8, animation: "zfloat 2.4s ease-out " + i * 0.55 + "s infinite" }}>{ch}</span>
          ))}
        </div>
      )}
      <div
        onClick={speak}
        className="w-14 h-16 flex items-end justify-center pointer-events-auto cursor-pointer"
        style={{ animation: hop ? "khop 0.45s ease-in-out" : "none" }}
        title="Lucky"
      >
        <div
          style={{
            width: 32, height: 32,
            backgroundImage: "url(" + sheet + ")",
            backgroundSize: "auto",
            imageRendering: "pixelated",
            animation: anim,
            transform: "scale(" + 2.2 * face + ",2.2)",
            transformOrigin: "center bottom",
          }}
        />
      </div>
    </div>
  );
}
