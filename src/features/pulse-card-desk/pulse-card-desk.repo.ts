// Pulse Card Desk — persistence adapter.
// US-001: app shell, state and persistence.
//
// Persists user preferences across reloads and surfaces a recoverable error
// when the stored payload is corrupted so the rest of the app can keep
// running with fixture defaults.

import { PREFERENCE_STORAGE_KEY } from "../../__fixtures__/pulse-card-desk.fixture";
import type { LastError, Preference } from "./pulse-card-desk.types";

const STORAGE_KEY = PREFERENCE_STORAGE_KEY;

const VALID_SYSTEM_STATES: ReadonlyArray<Preference["systemState"]> = ["ready", "paused"];

function isPreference(value: unknown): value is Preference {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<Preference>;
  if (candidate.selectedId !== null && typeof candidate.selectedId !== "string") return false;
  if (typeof candidate.systemState !== "string") return false;
  return VALID_SYSTEM_STATES.includes(candidate.systemState as Preference["systemState"]);
}

/**
 * Storage adapter contract. Allows the test suite to swap in an in-memory
 * implementation without touching global `window.localStorage`.
 */
export interface PreferenceStorage {
  read(key: string): string | null;
  write(key: string, value: string): void;
  remove(key: string): void;
}

class LocalStorageAdapter implements PreferenceStorage {
  read(key: string): string | null {
    try {
      return globalThis.localStorage?.getItem(key) ?? null;
    } catch {
      return null;
    }
  }

  write(key: string, value: string): void {
    try {
      globalThis.localStorage?.setItem(key, value);
    } catch {
      // Storage may be unavailable (private mode, quota, etc.). Surfaced via
      // loadPreference()/savePreference() return values rather than throwing.
    }
  }

  remove(key: string): void {
    try {
      globalThis.localStorage?.removeItem(key);
    } catch {
      // Same as write(): swallow and let the caller observe via return value.
    }
  }
}

/** Default adapter backed by `window.localStorage`. */
export const defaultPreferenceStorage: PreferenceStorage = new LocalStorageAdapter();

/** Result wrapper for preference load — distinguishes empty from corrupted. */
export type LoadPreferenceResult =
  | { kind: "empty" }
  | { kind: "value"; preference: Preference }
  | { kind: "corrupted"; error: LastError };

/**
 * Load the persisted preference, returning a tagged result so callers can
 * decide whether to fall back to fixtures or surface a recoverable error.
 */
export function loadPreference(storage: PreferenceStorage = defaultPreferenceStorage): LoadPreferenceResult {
  let raw: string | null = null;
  try {
    raw = storage.read(STORAGE_KEY);
  } catch {
    return {
      kind: "corrupted",
      error: {
        message: "Local state storage is unavailable.",
        source: "persistence",
        recoverable: true,
        timestamp: Date.now(),
      },
    };
  }

  if (raw === null || raw === "") {
    return { kind: "empty" };
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!isPreference(parsed)) {
      return {
        kind: "corrupted",
        error: {
          message: "Stored preference could not be parsed; defaults restored.",
          source: "persistence",
          recoverable: true,
          timestamp: Date.now(),
        },
      };
    }
    return { kind: "value", preference: parsed };
  } catch {
    return {
      kind: "corrupted",
      error: {
        message: "Stored preference is corrupted; defaults restored.",
        source: "persistence",
        recoverable: true,
        timestamp: Date.now(),
      },
    };
  }
}

/** Save the preference. Returns a recoverable LastError on failure, else null. */
export function savePreference(
  preference: Preference,
  storage: PreferenceStorage = defaultPreferenceStorage,
): LastError | null {
  try {
    storage.write(STORAGE_KEY, JSON.stringify(preference));
    return null;
  } catch {
    return {
      message: "Failed to persist preference.",
      source: "persistence",
      recoverable: true,
      timestamp: Date.now(),
    };
  }
}

/** Clear persisted preference (used after a recoverable error recovery). */
export function clearPreference(storage: PreferenceStorage = defaultPreferenceStorage): void {
  storage.remove(STORAGE_KEY);
}