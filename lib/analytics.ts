// Thin wrapper around the GA4 gtag.js snippet loaded in app/layout.tsx.
// Every custom event in the app should go through this file so event names
// and params stay consistent and aren't duplicated at each call site.
"use client";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventParams = Record<string, string | number | boolean>;

/** Fires a GA4 event. No-ops on the server or before gtag.js has loaded. */
export function trackEvent(name: string, params?: EventParams): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/**
 * Inspects an outgoing link and fires the matching GA4 event
 * (github_click / linkedin_click / email_click). Safe to call on any href;
 * no-ops for links that don't match a tracked pattern.
 */
export function trackExternalLink(href: string): void {
  if (href.startsWith("mailto:")) {
    trackEvent("email_click");
    return;
  }
  try {
    const host = new URL(href).hostname;
    if (host.includes("github.com")) trackEvent("github_click");
    else if (host.includes("linkedin.com")) trackEvent("linkedin_click");
  } catch {
    // Relative or malformed href - nothing to classify.
  }
}

export const trackCvDownload = (): void => trackEvent("cv_download");
export const trackProjectOpen = (project_name: string): void => trackEvent("project_open", { project_name });
export const trackCertificateOpen = (certificate_name: string): void => trackEvent("certificate_open", { certificate_name });
export const trackHtbLabOpen = (lab_name: string): void => trackEvent("htb_lab_open", { lab_name });
export const trackLanguageChange = (language: string): void => trackEvent("language_change", { language });
export const trackThemeChange = (theme: string): void => trackEvent("theme_change", { theme });
export const trackIntroSkip = (): void => trackEvent("intro_skip");
