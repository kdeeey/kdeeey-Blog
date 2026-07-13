"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useApp } from "../providers";
import SpeechBubble from "./SpeechBubble";

interface Props {
  heroRef: React.RefObject<HTMLDivElement | null>;
  stageRef: React.RefObject<HTMLDivElement | null>;
}

// Lucky the cat: trails Karima around the overworld (walks after her, sits when
// she stops), startles with a hop when Karima attacks (K), and tells you about
// Karima when clicked. Runs its own rAF loop that reads the hero's rendered
// position, so the overworld's game loop stays untouched.
// Strips: /images/cat_sit.png (front sitting), /images/cat_walk.png (side walk).
export default function CatCharacter({ heroRef, stageRef }: Props) {
  const { t, sfx } = useApp();
  const [msg, setMsg] = useState<string | null>(() => t.home.catPrompt);

  const wrapRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const cat = useRef({ x: 0, y: 0, face: 1, t: 0, placed: false });
  const talking = useRef(true);            // sits still while a bubble shows
  const startleUntil = useRef(0);
  const nextIdx = useRef(Math.floor(Math.random() * Math.max(1, t.home.catBubbles.length)));
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => { setMsg(null); talking.current = false; }, []);

  const speak = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    sfx("hover");
    setMsg(t.home.catBubbles[nextIdx.current % t.home.catBubbles.length]);
    nextIdx.current++;
    talking.current = true;
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(dismiss, 6000);
  }, [sfx, t.home.catBubbles, dismiss]);

  // Auto-hide the initial "click me" prompt; dismiss any bubble on outside click.
  useEffect(() => {
    hideTimer.current = setTimeout(dismiss, 8000);
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) dismiss();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && !e.repeat) { startleUntil.current = performance.now() + 400; sfx("hover"); }
    };
    document.addEventListener("click", onDoc);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      window.removeEventListener("keydown", onKey);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [dismiss, sfx]);

  // Follow loop.
  useEffect(() => {
    const GAP = 66, SPEED = 3.6;
    let raf = 0, last = 0;
    const tick = (ts: number) => {
      const dt = Math.min(50, ts - (last || ts)); last = ts;
      const stage = stageRef.current, hero = heroRef.current, wrap = wrapRef.current, spr = spriteRef.current;
      if (stage && hero && wrap && spr) {
        const s = stage.getBoundingClientRect();
        const W = stage.clientWidth, H = stage.clientHeight;
        const c = cat.current;
        if (!c.placed) { c.x = W - 70; c.y = H - 60; c.placed = true; }

        const hr = hero.getBoundingClientRect();
        const hx = hr.left - s.left + hr.width / 2;
        const hy = hr.top - s.top + hr.height * 0.86;

        let moving = false;
        if (!talking.current) {
          const ddx = hx - c.x, ddy = hy - c.y, dist = Math.hypot(ddx, ddy);
          if (dist > GAP) {
            const sp = SPEED * dt / 16;
            c.x += (ddx / dist) * sp;
            c.y += (ddy / dist) * sp;
            c.face = ddx < 0 ? -1 : 1;
            moving = true;
          }
        }
        c.t += dt;

        const frames = moving ? 4 : 2;
        const dur = moving ? 500 : 1200;
        const col = Math.floor((c.t / dur) * frames) % frames;
        spr.style.backgroundImage = "url(" + (moving ? "/images/cat_walk.png" : "/images/cat_sit.png") + ")";
        spr.style.backgroundPositionX = -col * 32 + "px";
        spr.style.transform = "scale(" + 3 * c.face + ",3)";

        let hopY = 0;
        if (ts < startleUntil.current) {
          const p = 1 - (startleUntil.current - ts) / 400;
          hopY = -Math.sin(p * Math.PI) * 18;
        }
        wrap.style.transform = "translate(" + (c.x - 48) + "px," + (c.y - 96 + hopY) + "px)";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [heroRef, stageRef]);

  return (
    <div ref={wrapRef} className="absolute left-0 top-0 w-24 h-24 z-[3] pointer-events-none will-change-transform">
      {msg && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 pointer-events-none">
          <SpeechBubble text={msg} wrap />
        </div>
      )}
      <div
        onClick={speak}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-20 flex items-end justify-center pointer-events-auto cursor-pointer"
      >
        <div
          ref={spriteRef}
          style={{ width: 32, height: 32, backgroundSize: "128px 32px", imageRendering: "pixelated", transformOrigin: "center bottom" }}
        />
      </div>
    </div>
  );
}
