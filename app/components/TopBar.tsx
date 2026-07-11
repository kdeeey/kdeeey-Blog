"use client";
import DarkModeToggle, { SfxToggle } from "./DarkModeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

// Composes the three top-right controls; drop into any page.
export default function TopBar() {
  return (
    <div className="fixed top-3 inset-x-3 sm:top-5 sm:right-5 sm:left-auto z-20 flex items-center justify-end flex-wrap gap-2 sm:gap-2.5">
      <LanguageSwitcher />
      <DarkModeToggle />
      <SfxToggle />
    </div>
  );
}
