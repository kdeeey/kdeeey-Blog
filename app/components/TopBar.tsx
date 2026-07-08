"use client";
import DarkModeToggle, { SfxToggle } from "./DarkModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

// Composes the three top-right controls; drop into any page.
export default function TopBar() {
  return (
    <div className="fixed top-5 right-5 z-20 flex items-center gap-2.5">
      <LanguageSwitcher />
      <DarkModeToggle />
      <SfxToggle />
    </div>
  );
}
