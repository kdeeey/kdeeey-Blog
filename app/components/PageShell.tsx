"use client";
import { motion } from "framer-motion";
import NavigateButton from "./NavigateButton";
import TopBar from "./TopBar";

// Shared chrome for every inner page: navigate pill, top-right toggles, fade-in.
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen">
      <NavigateButton />
      <TopBar />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
        {children}
      </motion.div>
    </main>
  );
}
