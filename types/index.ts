export type Lang = "en" | "fr";
export type Direction = 0 | 1 | 2 | 3; // 0 up, 1 left, 2 down, 3 right
export type CharacterAnim = "idle" | "walk" | "slash";

export interface ProjectItem { title: string; desc: string; tags: string[]; repo?: string; }
export interface CtfItem { title: string; xp: string; status: "completed" | "inProgress"; desc: string; tags: string[]; badgeBg: string; badgeColor: string; }
export interface HackathonItem { badge: string; title: string; date: string; desc: string; quote?: string; team?: string; organizer?: string; tags: string[]; image?: string; gallery?: string[]; }
export interface CertItem { title: string; issuer: string; status: "completed" | "inPrep" | "locked"; tags: string[]; image?: string; }
export interface HtbLab { machine: string; difficulty: string; tags: string[]; writeup?: string; }
