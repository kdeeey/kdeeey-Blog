"use client";
import { useApp } from "../providers";
import PixelButton from "./PixelButton";

export default function DarkModeToggle() {
  const { t, dark, toggleDark } = useApp();
  return <PixelButton pill small onClick={toggleDark}>{dark ? t.nav.light : t.nav.dark}</PixelButton>;
}

export function SfxToggle() {
  const { t, mute, toggleMute } = useApp();
  return <PixelButton pill small onClick={toggleMute}>{mute ? t.nav.sfxOff : t.nav.sfxOn}</PixelButton>;
}
