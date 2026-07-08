"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "./providers";
import Folder from "./components/Folder";
import LoadingScreen from "./components/LoadingScreen";
import TopBar from "./components/TopBar";
import type { Direction, CharacterAnim } from "@/types";

const KEYMAP: Record<string, "l" | "r" | "u" | "d"> = {
  arrowleft: "l", a: "l", arrowright: "r", d: "r", arrowup: "u", w: "u", arrowdown: "d", s: "d",
};
const KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];

export default function Overworld() {
  const router = useRouter();
  const { t, sfx } = useApp();
  const [booted, setBooted] = useState(false);      // localStorage checked
  const [intro, setIntro] = useState(false);        // showing first-visit loading
  const [leaving, setLeaving] = useState<string | null>(null); // fade + brief loading, then route

  const stageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const confettiRef = useRef<HTMLCanvasElement>(null);

  // Mutable game state lives in refs; rAF drives the DOM directly (no re-render per frame).
  const keys = useRef(new Set<string>());
  const hero = useRef({ x: 0, y: 0, dir: 2 as Direction, anim: "idle" as CharacterAnim, t: 0, placed: false });
  const walkTarget = useRef<{ x: number; y: number; folder: string | null } | null>(null);
  const navLock = useRef(0);
  const entering = useRef(false);
  const konami = useRef(0);
  const particles = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number; color: string; life: number }>>([]);

  useEffect(() => {
    let seen = false;
    try { seen = localStorage.getItem("kd_intro") === "1"; } catch {}
    setIntro(!seen);
    setBooted(true);
  }, []);

  const burst = useCallback((x: number, y: number, n: number) => {
    const colors = ["#22C55E", "#3B82F6", "#EF4444", "#EAB308", "#C084FC"];
    const c = confettiRef.current;
    if (c) { c.width = window.innerWidth; c.height = window.innerHeight; }
    for (let i = 0; i < n; i++) {
      particles.current.push({
        x: x + (Math.random() - 0.5) * 60, y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 9, vy: -(2.5 + Math.random() * 7.5),
        size: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1300 + Math.random() * 900,
      });
    }
  }, []);

  const beginEnter = useCallback((target: string) => {
    if (entering.current) return;
    entering.current = true;
    walkTarget.current = null;
    keys.current.clear();
    hero.current.anim = "idle"; hero.current.t = 0;
    sfx("click");
    setTimeout(() => setLeaving(target), 280);
  }, [sfx]);

  const walkToFolder = useCallback((name: string, ref: React.RefObject<HTMLDivElement>) => {
    if (entering.current) return;
    const n = ref.current, stage = stageRef.current;
    if (!n || !stage) { router.push("/" + (name === "portfolio" ? "portfolio" : name)); return; }
    const r = n.getBoundingClientRect(), s = stage.getBoundingClientRect();
    navLock.current = 0;
    walkTarget.current = { x: r.left - s.left + r.width / 2 - 64, y: r.top - s.top + r.height * 0.4 - 116, folder: name };
    sfx("hover");
  }, [router, sfx]);

  // Keyboard: movement + K attack + Konami code.
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key.toLowerCase();
      if (KEYMAP[k]) { e.preventDefault(); keys.current.add(KEYMAP[k]); }
      if (k === "k" && !e.repeat && hero.current.anim !== "slash") { hero.current.anim = "slash"; hero.current.t = 0; sfx("click"); }
      if (k === KONAMI[konami.current]) {
        konami.current++;
        if (konami.current >= KONAMI.length) {
          konami.current = 0;
          sfx("secret");
          burst(window.innerWidth / 2, window.innerHeight / 2, 240);
        }
      } else konami.current = k === KONAMI[0] ? 1 : 0;
    };
    const up = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (KEYMAP[k]) keys.current.delete(KEYMAP[k]);
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [sfx, burst]);

  // Game loop.
  useEffect(() => {
    if (intro || !booted) return;
    navLock.current = performance.now() + 900;
    let raf = 0; let last = 0;
    const tick = (ts: number) => {
      const dt = Math.min(50, ts - (last || ts)); last = ts;
      const el = heroRef.current, stage = stageRef.current;
      if (el && stage) {
        const W = stage.clientWidth, H = stage.clientHeight;
        const h = hero.current;
        if (!h.placed) { h.x = W / 2 - 64; h.y = H * 0.34; h.placed = true; }
        let dx = 0, dy = 0;
        if (h.anim !== "slash" && !entering.current) {
          if (keys.current.has("l")) dx -= 1;
          if (keys.current.has("r")) dx += 1;
          if (keys.current.has("u")) dy -= 1;
          if (keys.current.has("d")) dy += 1;
          if (dx || dy) walkTarget.current = null;
          else if (walkTarget.current) {
            const ddx = walkTarget.current.x - h.x, ddy = walkTarget.current.y - h.y;
            const dist = Math.hypot(ddx, ddy);
            if (dist < 5) {
              const tgt = walkTarget.current; walkTarget.current = null;
              if (tgt.folder) beginEnter(tgt.folder); else { h.anim = "idle"; h.t = 0; }
            } else { dx = ddx / dist; dy = ddy / dist; }
          }
        }
        if (dx || dy) {
          const mag = Math.hypot(dx, dy) || 1; dx /= mag; dy /= mag;
          const sp = 4 * dt / 16;
          h.x = Math.max(-24, Math.min(W - 104, h.x + dx * sp));
          h.y = Math.max(96, Math.min(H - 148, h.y + dy * sp));
          h.dir = (Math.abs(dx) >= Math.abs(dy) ? (dx < 0 ? 1 : 3) : (dy < 0 ? 0 : 2)) as Direction;
          if (h.anim !== "walk") { h.anim = "walk"; h.t = 0; }
        } else if (h.anim === "walk") { h.anim = "idle"; h.t = 0; }
        h.t += dt;
        let row: number, col: number;
        if (h.anim === "slash") {
          const f = Math.floor((h.t / 1000) * 13);
          if (f >= 6) { h.anim = "idle"; h.t = 0; row = 8 + h.dir; col = 0; }
          else { row = 4 + h.dir; col = f; }
        } else if (h.anim === "walk") { row = h.dir; col = 1 + Math.floor((h.t / 1000) * 11) % 8; }
        else { row = 8 + h.dir; col = Math.floor((h.t / 1000) * 2) % 2; }
        el.style.transform = "translate(" + h.x + "px," + h.y + "px)";
        el.style.backgroundPosition = (-col * 128) + "px " + (-row * 128) + "px";

        // Walk-over navigation.
        if (performance.now() > navLock.current && h.anim !== "slash") {
          const srect = stage.getBoundingClientRect();
          const fx = h.x + 64, fy = h.y + 116;
          const hit = (ref: React.RefObject<HTMLDivElement>) => {
            const node = ref.current; if (!node) return false;
            const r = node.getBoundingClientRect();
            return fx > r.left - srect.left - 6 && fx < r.right - srect.left + 6 && fy > r.top - srect.top - 6 && fy < r.bottom - srect.top + 12;
          };
          let target: string | null = null;
          if (hit(aboutRef)) target = "about";
          else if (hit(portfolioRef)) target = "portfolio";
          else if (hit(contactRef)) target = "contact";
          if (target && walkTarget.current?.folder && walkTarget.current.folder !== target) target = null;
          if (target) { navLock.current = performance.now() + 5000; beginEnter(target); }
        }
      }
      // Confetti.
      const c = confettiRef.current;
      if (c && particles.current.length) {
        const g = c.getContext("2d")!;
        g.clearRect(0, 0, c.width, c.height);
        particles.current = particles.current.filter((pt) => {
          pt.vy += 0.24; pt.x += pt.vx; pt.y += pt.vy; pt.life -= dt;
          if (pt.life <= 0 || pt.y > c.height + 20) return false;
          g.fillStyle = pt.color;
          g.fillRect(Math.round(pt.x), Math.round(pt.y), pt.size, pt.size);
          return true;
        });
        if (!particles.current.length) g.clearRect(0, 0, c.width, c.height);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [intro, booted, beginEnter]);

  const stageClick = (e: React.MouseEvent) => {
    if (entering.current) return;
    const stage = stageRef.current; if (!stage) return;
    const s = stage.getBoundingClientRect();
    walkTarget.current = {
      x: Math.max(-24, Math.min(stage.clientWidth - 104, e.clientX - s.left - 64)),
      y: Math.max(96, Math.min(stage.clientHeight - 148, e.clientY - s.top - 116)),
      folder: null,
    };
  };

  if (!booted) return null;
  if (intro) {
    return (
      <LoadingScreen onDone={() => {
        try { localStorage.setItem("kd_intro", "1"); } catch {}
        burst(window.innerWidth / 2, window.innerHeight * 0.26, 150);
        setIntro(false);
      }} />
    );
  }

  return (
    <main ref={stageRef} onClick={stageClick} className="fixed inset-0 overflow-hidden">
      <TopBar />
      <div className="absolute top-0 inset-x-0 flex flex-col items-center gap-5 pt-14 px-5 pointer-events-none">
        <h1 className="font-pixel text-[clamp(18px,3vw,30px)] tracking-[4px] text-center m-0">{t.home.title}</h1>
        <p className="font-pixel text-[9px] tracking-[2px] text-sub text-center leading-[1.9] m-0">
          {t.home.subtitle}<span className="animate-[kblink_1s_infinite]">_</span>
        </p>
      </div>
      <div
        ref={heroRef}
        className="absolute left-0 top-0 w-32 h-32 z-[2] pointer-events-none will-change-transform"
        style={{ backgroundImage: "url(/sprites/character.png)", backgroundSize: "1152px 1536px", backgroundPosition: "0px -1280px", imageRendering: "pixelated" }}
      />
      <div className="absolute inset-x-0 bottom-[11%] flex justify-center gap-20">
        <Folder ref={aboutRef} color="blue" label={t.home.aboutLabel} onClick={(e) => { e.stopPropagation(); walkToFolder("about", aboutRef); }} />
        <Folder ref={portfolioRef} color="pink" label={t.home.portfolioLabel} onClick={(e) => { e.stopPropagation(); walkToFolder("portfolio", portfolioRef); }} />
        <Folder ref={contactRef} color="unsat-blue" label={t.home.contactLabel} onClick={(e) => { e.stopPropagation(); walkToFolder("contact", contactRef); }} />
      </div>
      <div className="absolute left-5 bottom-5 font-pixel text-[8px] text-sub leading-loose whitespace-pre-line">{t.home.hud}</div>
      <canvas ref={confettiRef} className="absolute inset-0 pointer-events-none z-[70]" />
      {leaving && (
        <div className="absolute inset-0 bg-black z-[65] flex items-center justify-center animate-[fadein_0.32s_ease]" style={{ animation: "none", opacity: 1 }}>
          <LoadingScreen brief skippable={false} onDone={() => router.push(leaving === "portfolio" ? "/portfolio" : "/" + leaving)} />
        </div>
      )}
    </main>
  );
}
