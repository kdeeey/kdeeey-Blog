"use client";
import { useApp } from "../providers";
import PixelButton from "./PixelButton";

export default function BackButton({ toPortfolio }: { toPortfolio?: boolean }) {
  const { t } = useApp();
  return (
    <PixelButton pill href={toPortfolio ? "/portfolio" : "/"}>
      {"◄ " + (toPortfolio ? t.common.backPortfolio : t.common.back)}
    </PixelButton>
  );
}
