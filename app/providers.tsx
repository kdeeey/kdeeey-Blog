"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { translations, Lang, Dict } from "@/lib/translations";
import { trackLanguageChange, trackThemeChange } from "@/lib/analytics";

type SfxKind = "hover" | "click" | "nav" | "type" | "fanfare" | "secret" | "purr";

interface AppState {
  lang: Lang; setLang: (l: Lang) => void; t: Dict;
  dark: boolean; toggleDark: () => void;
  mute: boolean; toggleMute: () => void;
  sfx: (kind: SfxKind) => void;
}

const AppContext = createContext<AppState | null>(null);

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <Providers>");
  return ctx;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [dark, setDark] = useState(false);
  const [mute, setMute] = useState(false);
  const acRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      const l = localStorage.getItem("kd_lang");
      if (l === "fr" || l === "en") setLangState(l);
      if (localStorage.getItem("kd_dark") === "1") { setDark(true); document.documentElement.dataset.theme = "dark"; }
      if (localStorage.getItem("kd_mute") === "1") setMute(true);
    } catch {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("kd_lang", l); } catch {}
    trackLanguageChange(l);
  }, []);

  const toggleDark = useCallback(() => {
    setDark((d) => {
      const next = !d;
      document.documentElement.dataset.theme = next ? "dark" : "";
      try { localStorage.setItem("kd_dark", next ? "1" : "0"); } catch {}
      trackThemeChange(next ? "dark" : "light");
      return next;
    });
  }, []);

  const toggleMute = useCallback(() => {
    setMute((m) => {
      try { localStorage.setItem("kd_mute", !m ? "1" : "0"); } catch {}
      return !m;
    });
  }, []);

  // 8-bit sound effects via Web Audio API (no assets, no library).
  const muteRef = useRef(mute);
  muteRef.current = mute;
  const sfx = useCallback((kind: SfxKind) => {
    if (muteRef.current) return;
    try {
      const AC = window.AudioContext || (window as any).webkitAudioContext;
      const ac = acRef.current || (acRef.current = new AC());
      if (ac.state === "suspended") ac.resume();
      const play = (f: number, t0: number, d: number, type: OscillatorType = "square", g = 0.05) => {
        const o = ac.createOscillator(); const ga = ac.createGain();
        o.type = type; o.frequency.value = f;
        ga.gain.setValueAtTime(g, ac.currentTime + t0);
        ga.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + t0 + d);
        o.connect(ga); ga.connect(ac.destination);
        o.start(ac.currentTime + t0); o.stop(ac.currentTime + t0 + d + 0.02);
      };
      if (kind === "hover") play(660, 0, 0.055);
      else if (kind === "click") { play(784, 0, 0.07); play(1175, 0.07, 0.09); }
      else if (kind === "nav") { play(523, 0, 0.06); play(659, 0.06, 0.06); play(784, 0.12, 0.1); }
      else if (kind === "type") play(460 + Math.random() * 180, 0, 0.025, "square", 0.015);
      else if (kind === "fanfare") [523, 659, 784, 1047].forEach((f, i) => play(f, i * 0.09, 0.13));
      else if (kind === "secret") [392, 523, 659, 784, 1047, 1319].forEach((f, i) => play(f, i * 0.08, 0.15, "triangle", 0.07));
      else if (kind === "purr") [90, 100, 90, 100, 90].forEach((f, i) => play(f, i * 0.13, 0.12, "triangle", 0.045));
    } catch {}
  }, []);

  return (
    <AppContext.Provider value={{ lang, setLang, t: translations[lang], dark, toggleDark, mute, toggleMute, sfx }}>
      {children}
    </AppContext.Provider>
  );
}
