"use client";
import { motion } from "framer-motion";
import NavigateButton from "./NavigateButton";
import TopBar from "./TopBar";
import PageCat, { PageCatMode } from "./PageCat";

// Shared chrome for every inner page: navigate pill, top-right toggles,
// fade-in, and Lucky the cat hanging around (pose varies per page).
export default function PageShell({ children, cat = "wander" }: { children: React.ReactNode; cat?: PageCatMode }) {
  return (
    <main className="min-h-screen">
      <NavigateButton />
      <TopBar />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
        {children}
      </motion.div>
      <PageCat mode={cat} />
    </main>
  );
}
