"use client";
import { useEffect, useRef, useState } from "react";
import Character from "./Character";
import { useApp } from "../providers";

export interface LoadingScreenProps {
  onDone?: () => void;
  brief?: boolean;         // fast bar for page transitions
  skippable?: boolean;
}

export default function LoadingScreen({ onDone, brief, skippable = true }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);
  const { t, sfx } = useApp();

  useEffect(() => {
    const step = brief ? 8 : 2;
    const id = setInterval(() => {
      setProgress((p) => Math.min(100, p + step * (0.5 + Math.random())));
    }, 55);
    return () => clearInterval(id);
  }, [brief]);

  useEffect(() => {
    if (progress >= 100 && !doneRef.current) {
      doneRef.current = true;
      if (!brief) sfx("fanfare");
      const id = setTimeout(() => onDone?.(), brief ? 240 : 850);
      return () => clearTimeout(id);
    }
  }, [progress, brief, onDone, sfx]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center bg-bg"
      onClick={() => { if (skippable) setProgress(100); }}
    >
      <div className="mt-[12vh] flex flex-col items-center gap-5">
        <div className="font-pixel text-[22px] tracking-[5px] text-ink">{t.loading.label}</div>
        <div className="w-80 h-[26px] border-[3px] border-ink bg-card p-[3px] box-border">
          <div className="h-full bg-progressgreen" style={{ width: Math.floor(progress) + "%" }} />
        </div>
        <div className="font-pixel text-xs text-ink">{Math.floor(progress)}%</div>
      </div>
      {!brief && <Character anim="idle" className="mt-[18vh]" />}
      {skippable && <div className="absolute bottom-7 font-pixel text-[8px] text-sub">{t.loading.skip}</div>}
    </div>
  );
}
