// Pulse Card Desk — shared app-shell types.
// US-001: app shell, state and persistence.

/** Declared product surfaces from DESIGN_BRIEF. */
export type SurfaceId = "SURF_STATUS_UTILITY";

/** Discrete surfaces rendered in panels or routes. */
export type AppPanel = "cards" | "details" | "settings";

/** A single status card shown in the SURF_STATUS_UTILITY grid. */
export interface StatusItem {
  /** Stable id used as React key and selection handle. */
  id: string;
  /** Short label, e.g. "Database Node". */
  title: string;
  /** Worker-type descriptor; shown next to the title. */
  kind: string;
  /** Current readiness for the owning system. */
  state: "ready" | "paused";
  /** Free-form status text surfaced on the card. */
  status: string;
  /** Last refresh timestamp in ms since epoch. */
  timestamp: number;
  /** Free-form detail line. */
  detail: string;
}

/** User preference persisted across reloads. */
export interface Preference {
  /** Currently selected card id, or null when nothing is selected. */
  selectedId: string | null;
  /** Whether the system is in a ready/paused posture. */
  systemState: "ready" | "paused";
}

/** Persistence layer health indicator. */
export type StorageStatus = "idle" | "loading" | "ready" | "error";

/** A captured runtime error with enough context to recover. */
export interface LastError {
  message: string;
  source: "persistence" | "load" | "action";
  recoverable: boolean;
  timestamp: number;
}

/** Whole-app view model owned by US-001. */
export interface AppState {
  activeSurface: SurfaceId;
  activePanel: AppPanel;
  items: StatusItem[];
  preference: Preference;
  storageStatus: StorageStatus;
  lastError: LastError | null;
  counts: {
    total: number;
    ready: number;
    paused: number;
  };
}

/** Internal reducer action union. */
export type PulseAction =
  | { type: "bootstrap/start" }
  | { type: "bootstrap/ready"; items: StatusItem[]; preference: Preference }
  | { type: "bootstrap/error"; error: LastError }
  | { type: "items/refresh"; timestamp: number }
  | { type: "system/toggle"; state: "ready" | "paused"; timestamp: number }
  | { type: "items/select"; id: string | null }
  | { type: "panel/set"; panel: AppPanel }
  | { type: "error/clear" };

/** Contract surface that the test bridge (`src/test/bridge.ts`) reads. */
export interface AppBridge {
  activeRoute: SurfaceId;
  activePanel: AppPanel;
  selectedRecord: StatusItem | null;
  counts: AppState["counts"];
  storageStatus: StorageStatus;
  lastError: LastError | null;
  refresh: () => void;
  toggleSystem: () => void;
  selectItem: (id: string | null) => void;
  setPanel: (panel: AppPanel) => void;
  clearError: () => void;
}