// Pulse Card Desk — `window.app` test bridge.
// US-001: app shell, state and persistence.
//
// Exposes a stable, observable handle on `window.app` so QA / runtime
// verification hooks can read active surface, selected record, counts,
// storage status, last error, and active panel without traversing React
// internals.

import type { AppBridge } from "../features/pulse-card-desk/pulse-card-desk.types";

declare global {
  interface Window {
    app?: AppBridge;
  }
}

/** Install (or refresh) `window.app` with the given bridge handle. */
export function installAppBridge(bridge: AppBridge): void {
  if (typeof window === "undefined") return;
  window.app = bridge;
}

/** Remove the `window.app` handle. Safe to call multiple times. */
export function uninstallAppBridge(): void {
  if (typeof window === "undefined") return;
  if (window.app) {
    delete window.app;
  }
}

/** Read the current bridge handle, or null when not installed. */
export function readAppBridge(): AppBridge | null {
  if (typeof window === "undefined") return null;
  return window.app ?? null;
}