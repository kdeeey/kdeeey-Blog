"use client";
import { useEffect, useState } from "react";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** RPG-dialogue typewriter effect. Returns the typed prefix and whether typing finished. */
export function useTypewriter(text: string, msPerChar = 22): { typed: string; done: boolean } {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(0);
    const id = setInterval(() => {
      setCount(function (c) {
        if (c + 1 >= text.length) clearInterval(id);
        return Math.min(text.length, c + 1);
      });
    }, msPerChar);
    return () => clearInterval(id);
  }, [text, msPerChar]);
  return { typed: text.slice(0, count), done: count >= text.length };
}
