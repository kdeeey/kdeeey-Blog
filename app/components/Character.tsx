"use client";
import { CSSProperties } from "react";
import type { CharacterAnim, Direction } from "@/types";

// Sprite sheet: /sprites/character.png, 9 cols x 12 rows, 128px frames at 1x.
// Rows 0-3 walk (up/left/down/right), 4-7 slash, 8-11 idle (2 frames).
const ANIM: Record<CharacterAnim, string> = {
  idle: "sprite-idle 0.55s steps(2) infinite",
  walk: "sprite-walk 0.7s steps(8) infinite",
  slash: "sprite-slash 0.46s steps(6)",
};
const ROW: Record<CharacterAnim, (d: Direction) => number> = {
  idle: (d) => 8 + d,
  walk: (d) => d,
  slash: (d) => 4 + d,
};

export interface CharacterProps {
  anim?: CharacterAnim;
  dir?: Direction;
  scale?: number;          // 1 = 128px tall
  animate?: boolean;       // false = frozen first frame (thumbnails)
  className?: string;
  style?: CSSProperties;
}

export default function Character({ anim = "idle", dir = 2, scale = 1, animate = true, className, style }: CharacterProps) {
  return (
    <div
      className={className}
      style={{
        width: 128, height: 128,
        backgroundImage: "url(/sprites/character.png)",
        backgroundSize: "1152px 1536px",
        backgroundPositionX: 0,
        backgroundPositionY: -ROW[anim](dir) * 128,
        imageRendering: "pixelated",
        animation: animate ? ANIM[anim] : "none",
        transform: "scale(" + scale + ")",
        transformOrigin: "center bottom",
        ...style,
      }}
    />
  );
}
