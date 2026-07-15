"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useApp } from "../providers";
import SpeechBubble from "./SpeechBubble";

interface Props {
  heroRef: React.RefObject<HTMLDivElement | null>;
  stageRef: React.RefObject<HTMLDivElement | null>;
  folders?: Array<React.RefObject<HTMLDivElement | null>>;
}

type Mode = "follow" | "sleep" | "zoomies" | "stalk" | "pounce" | "perch" | "secret" | "pet";

const SHEETS = {
  sit: { src: "/images/cat_sit.png", frames: 2, dur: 1200 },
  walk: { src: "/images/cat_walk.png", frames: 4, dur: 500 },
  stalk: { src: "/images/cat_pounce.png", frames: 3, dur: 400 },
  sleep: { src: "/images/cat_sleep.png", frames: 1, dur: 1000 },
};

// Lucky the cat, overworld edition. A tiny state machine gives her a life of
// her own: she follows Karima, naps when the visitor goes idle, does random
// zoomies, stalks + pounces on a fast-moving cursor, perches on folders,
// shares an extra secret if you stay away long enough, purrs when petted,
// and parties when the Konami confetti rains.
export default function CatCharacter({ heroRef, stageRef, folders = [] }: Props) {
  const { t, sfx } = useApp();
  const [msg, setMsg] = useState<string | null>(() => t.home.catPrompt);
  const [zzz, setZzz] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number }>>([]);

  const wrapRef = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLDivElement>(null);
  const cat = useRef({ x: 0, y: 0, face: 1, t: 0, placed: false });
  const mode = useRef<Mode>("follow");
  const modeUntil = useRef(0);          // generic phase deadline for the active mode
  const perchPhase = useRef<"go" | "on">("go");
  const target = useRef({ x: 0, y: 0 });
  const waypoints = useRef<Array<{ x: number; y: number }>>([]);
  const restUntil = useRef(0);          // short sit-still pause inside follow
  const startleUntil = useRef(0);
  const lastAct = useRef(0);
  const sleepStart = useRef(0);
  const secretDone = useRef(false);
  const nextZoomies = useRef(0);
  const nextPerch = useRef(0);
  const pounceCoolUntil = useRef(0);
  const mouse = useRef({ x: 0, y: 0, spd: 0, t: 0 });
  const talking = useRef(true);
  const nextIdx = useRef(Math.floor(Math.random() * Math.max(1, t.home.catBubbles.length)));
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heartId = useRef(0);
  const petTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const petTick = useRef<ReturnType<typeof setInterval> | null>(null);
  const petJustEnded = useRef(false);

  const dismiss = useCallback(() => { setMsg(null); talking.current = false; }, []);

  const speak = useCallback((text?: string) => {
    sfx("hover");
    setMsg(text ?? t.home.catBubbles[nextIdx.current++ % t.home.catBubbles.length]);
    talking.current = true;
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(dismiss, 6000);
  }, [sfx, t.home.catBubbles, dismiss]);

  const stopPet = useCallback(() => {
    if (petTimer.current) { clearTimeout(petTimer.current); petTimer.current = null; }
    if (petTick.current) {
      clearInterval(petTick.current); petTick.current = null;
      if (mode.current === "pet") { mode.current = "follow"; petJustEnded.current = true; }
    }
  }, []);

  const onCatPointerDown = useCallback((e: React.PointerEvent) => {
    e.stopPropagation();
    petTimer.current = setTimeout(() => {
      mode.current = "pet";
      setZzz(false);
      sfx("purr");
      petTick.current = setInterval(() => {
        sfx("purr");
        const id = ++heartId.current;
        setHearts((hs) => [...hs, { id, x: -14 + Math.random() * 28 }]);
        setTimeout(() => setHearts((hs) => hs.filter((h) => h.id !== id)), 1100);
      }, 550);
    }, 350);
  }, [sfx]);

  const onCatClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (petJustEnded.current) { petJustEnded.current = false; return; }
    if (mode.current === "sleep") { mode.current = "follow"; setZzz(false); startleUntil.current = performance.now() + 400; }
    speak();
  }, [speak]);

  // Global listeners: activity tracking, cursor speed, K-startle, confetti party.
  useEffect(() => {
    lastAct.current = performance.now();
    nextZoomies.current = performance.now() + 45000 + Math.random() * 45000;
    nextPerch.current = performance.now() + 25000 + Math.random() * 35000;
    hideTimer.current = setTimeout(dismiss, 8000);

    const act = () => { lastAct.current = performance.now(); };
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = now - mouse.current.t;
      if (dt > 0) mouse.current.spd = Math.hypot(e.clientX - mouse.current.x, e.clientY - mouse.current.y) / dt;
      mouse.current.x = e.clientX; mouse.current.y = e.clientY; mouse.current.t = now;
      lastAct.current = now;
    };
    const onKey = (e: KeyboardEvent) => {
      lastAct.current = performance.now();
      if (e.key.toLowerCase() === "k" && !e.repeat) { startleUntil.current = performance.now() + 400; sfx("hover"); }
    };
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) dismiss();
    };
    const onParty = () => {
      if (mode.current !== "pet") {
        mode.current = "zoomies";
        modeUntil.current = performance.now() + 3000;
        waypoints.current = [];
      }
    };
    window.addEventListener("pointerdown", act);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onDoc);
    window.addEventListener("kd-confetti", onParty);
    return () => {
      window.removeEventListener("pointerdown", act);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDoc);
      window.removeEventListener("kd-confetti", onParty);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      stopPet();
    };
  }, [dismiss, sfx, stopPet]);

  // Behavior + render loop.
  useEffect(() => {
    const FOLLOW_GAP = 66, FOLLOW_SPD = 3.6, ZOOM_SPD = 9;
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
        const heroDist = Math.hypot(hx - c.x, hy - c.y);
        const now = ts;
        const idleFor = now - lastAct.current;

        // Walk one step toward (tx, ty); returns true when arrived.
        const stepTo = (tx: number, ty: number, spd: number) => {
          const ddx = tx - c.x, ddy = ty - c.y, dist = Math.hypot(ddx, ddy);
          if (dist < 6) return true;
          const sp = spd * dt / 16;
          c.x += (ddx / dist) * sp; c.y += (ddy / dist) * sp;
          c.face = ddx < 0 ? -1 : 1;
          return false;
        };
        const randPoint = () => ({ x: 60 + Math.random() * (W - 120), y: H * 0.35 + Math.random() * (H * 0.5) });

        let moving = false;
        let sheet: keyof typeof SHEETS = "sit";

        switch (mode.current) {
          case "follow": {
            if (!talking.current && now > restUntil.current) {
              // Idle triggers, in priority order.
              if (idleFor > 20000) {
                if (!secretDone.current) {
                  mode.current = "secret"; target.current = { x: W / 2, y: H * 0.62 };
                } else { mode.current = "sleep"; sleepStart.current = now; setZzz(true); c.face = 1; }
                break;
              }
              if (now > nextZoomies.current) {
                mode.current = "zoomies"; modeUntil.current = now + 2600; waypoints.current = []; break;
              }
              if (now > nextPerch.current && folders.length) {
                const f = folders[Math.floor(Math.random() * folders.length)]?.current;
                if (f) {
                  const r = f.getBoundingClientRect();
                  target.current = { x: r.left - s.left + r.width / 2, y: r.top - s.top + 12 };
                  mode.current = "perch"; perchPhase.current = "go"; break;
                }
                nextPerch.current = now + 30000;
              }
              const mDist = Math.hypot(mouse.current.x - c.x, mouse.current.y - c.y);
              if (now > pounceCoolUntil.current && mDist < 200 && mDist > 50 && mouse.current.spd > 0.45 && now - mouse.current.t < 200) {
                mode.current = "stalk"; modeUntil.current = now + 500; break;
              }
              if (heroDist > FOLLOW_GAP) moving = !stepTo(hx, hy, FOLLOW_SPD);
              else if (heroDist < 44) {
                // Too close - back off so she never sits on top of Karima.
                const d = heroDist || 1;
                const tx = hx + ((c.x - hx) / d) * FOLLOW_GAP;
                const ty = hy + ((c.y - hy) / d) * FOLLOW_GAP;
                moving = !stepTo(
                  Math.max(20, Math.min(W - 20, tx)),
                  Math.max(H * 0.25, Math.min(H - 30, ty)),
                  FOLLOW_SPD
                );
              }
            }
            break;
          }
          case "sleep": {
            sheet = "sleep"; c.face = 1;
            if (lastAct.current > sleepStart.current || heroDist < 100) {
              mode.current = "follow"; setZzz(false); startleUntil.current = now + 400;
            }
            break;
          }
          case "secret": {
            if (stepTo(target.current.x, target.current.y, FOLLOW_SPD)) {
              mode.current = "follow"; restUntil.current = now + 7500;
              secretDone.current = true; c.face = 1;
              speak(t.home.catSecret);
            } else moving = true;
            break;
          }
          case "zoomies": {
            if (!waypoints.current.length) waypoints.current = [randPoint(), randPoint(), randPoint(), randPoint()];
            const wp = waypoints.current[0];
            if (stepTo(wp.x, wp.y, ZOOM_SPD)) waypoints.current.shift();
            moving = true;
            if (now > modeUntil.current) {
              mode.current = "follow"; restUntil.current = now + 1200;
              nextZoomies.current = now + 45000 + Math.random() * 45000;
            }
            break;
          }
          case "stalk": {
            sheet = "stalk";
            c.face = mouse.current.x < c.x ? -1 : 1;
            if (now > modeUntil.current) {
              mode.current = "pounce";
              target.current = {
                x: Math.max(40, Math.min(W - 40, mouse.current.x)),
                y: Math.max(H * 0.3, Math.min(H - 40, mouse.current.y)),
              };
              modeUntil.current = now + 380;
            }
            break;
          }
          case "pounce": {
            sheet = "stalk"; moving = true;
            if (stepTo(target.current.x, target.current.y, 11) || now > modeUntil.current + 400) {
              mode.current = "follow"; restUntil.current = now + 1400;
              pounceCoolUntil.current = now + 18000;
            }
            break;
          }
          case "perch": {
            if (perchPhase.current === "go") {
              if (stepTo(target.current.x, target.current.y, FOLLOW_SPD)) {
                perchPhase.current = "on"; modeUntil.current = now + 8000 + Math.random() * 8000; c.face = 1;
              } else moving = true;
            } else {
              // Sitting on the folder; hop off if time is up or Karima gets close.
              if (now > modeUntil.current || heroDist < 80) {
                mode.current = "follow"; startleUntil.current = now + 350;
                nextPerch.current = now + 30000 + Math.random() * 40000;
              }
            }
            break;
          }
          case "pet": {
            sheet = "sit";
            break;
          }
        }

        if (moving) sheet = "walk";
        c.t += dt;

        const meta = SHEETS[sheet];
        const speedUp = mode.current === "zoomies" || mode.current === "pounce" ? 0.6 : 1;
        const col = meta.frames > 1 ? Math.floor((c.t / (meta.dur * speedUp)) * meta.frames) % meta.frames : 0;
        spr.style.backgroundImage = "url(" + meta.src + ")";
        spr.style.backgroundPositionX = -col * 32 + "px";
        if (mode.current === "sleep") {
          spr.style.animation = "catbreathe 1.8s ease-in-out infinite";
          spr.style.transform = "";
        } else {
          spr.style.animation = "none";
          spr.style.transform = "scale(" + 3 * c.face + ",3)";
        }

        let hopY = 0;
        if (now < startleUntil.current) {
          const p = 1 - (startleUntil.current - now) / 400;
          hopY = -Math.sin(p * Math.PI) * 18;
        }
        wrap.style.transform = "translate(" + (c.x - 48) + "px," + (c.y - 96 + hopY) + "px)";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [heroRef, stageRef, folders, speak, t.home.catSecret]);

  return (
    <div ref={wrapRef} className="absolute left-0 top-0 w-24 h-24 z-[1] pointer-events-none will-change-transform">
      {msg && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 pointer-events-none">
          <SpeechBubble text={msg} wrap />
        </div>
      )}
      {zzz && (
        <div className="absolute -top-8 left-1/2 pointer-events-none font-pixel text-[10px] text-sub">
          {["Z", "z", "z"].map((ch, i) => (
            <span key={i} className="absolute" style={{ left: i * 9, animation: "zfloat 2.4s ease-out " + i * 0.55 + "s infinite" }}>{ch}</span>
          ))}
        </div>
      )}
      {hearts.map((h) => (
        <div key={h.id} className="absolute -top-4 left-1/2 pointer-events-none" style={{ marginLeft: h.x, animation: "heartfloat 1.1s ease-out forwards" }}>
          <div className="pixel-heart" />
        </div>
      ))}
      <div
        onPointerDown={onCatPointerDown}
        onPointerUp={stopPet}
        onPointerLeave={stopPet}
        onClick={onCatClick}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-20 flex items-end justify-center pointer-events-auto cursor-pointer"
      >
        <div
          ref={spriteRef}
          style={{ width: 32, height: 32, backgroundSize: "auto", imageRendering: "pixelated", transformOrigin: "center bottom" }}
        />
      </div>
    </div>
  );
}
