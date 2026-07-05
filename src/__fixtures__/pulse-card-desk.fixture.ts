// Pulse Card Desk — fixture data used when persistence is empty or corrupted.
// US-001: app shell, state and persistence.

import type { Preference, StatusItem } from "../features/pulse-card-desk/pulse-card-desk.types";

/** Three compact cards surfaced by SURF_STATUS_UTILITY. */
export const fixtureStatusItems: StatusItem[] = [
  {
    id: "database-node",
    title: "Database Node",
    kind: "storage",
    state: "ready",
    status: "Active",
    timestamp: 0,
    detail: "Last ping: 2s ago",
  },
  {
    id: "queue-worker",
    title: "Queue Worker",
    kind: "worker",
    state: "ready",
    status: "Idle",
    timestamp: 0,
    detail: "Last task: 4m ago",
  },
  {
    id: "auth-service",
    title: "Auth Service",
    kind: "service",
    state: "ready",
    status: "Success",
    timestamp: 0,
    detail: "Last refresh: 12s ago",
  },
];

/** Default preference used when nothing is persisted yet. */
export const fixturePreference: Preference = {
  selectedId: "database-node",
  systemState: "ready",
};

/** localStorage key for the persisted preference. */
export const PREFERENCE_STORAGE_KEY = "pulse-card-desk:preference:v1";