"use client";
import { forwardRef } from "react";

export type FolderColor = "blue" | "pink" | "unsat-blue";
const LABEL_COLOR: Record<FolderColor, string> = {
  blue: "#3B82F6",
  pink: "#EC4899",
  "unsat-blue": "#3E5A73",
};

export interface FolderProps {
  color: FolderColor;
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: () => void;
}

// Pixel-art PNG folders (user-supplied sprites). ref is used by the overworld for hit detection.
const Folder = forwardRef<HTMLDivElement, FolderProps>(function Folder({ color, label, onClick, onMouseEnter }, ref) {
  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className="flex flex-col items-center gap-4 cursor-pointer transition-transform duration-200 hover:-translate-y-2 hover:scale-105"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- pixel art must not be resampled */}
      <img src={"/folders/folder-" + color + ".png"} alt={label} width={120} style={{ imageRendering: "pixelated" }} />
      <div className="font-pixel text-xs" style={{ color: LABEL_COLOR[color] }}>{label}</div>
    </div>
  );
});
export default Folder;
