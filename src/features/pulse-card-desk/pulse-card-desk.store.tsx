// Pulse Card Desk — React Context state store.
// US-001: app shell, state and persistence.
//
// Owns: active surface, active panel, status items, selected item, system
// posture, storage status, last error, and item counts.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";

import {
  fixturePreference,
  fixtureStatusItems,
} from "../../__fixtures__/pulse-card-desk.fixture";
import {
  loadPreference,
  savePreference,
  type PreferenceStorage,
} from "./pulse-card-desk.repo";
import type {
  AppBridge,
  AppPanel,
  AppState,
  PulseAction,
  StatusItem,
  SurfaceId,
} from "./pulse-card-desk.types";

const ACTIVE_SURFACE: SurfaceId = "SURF_STATUS_UTILITY";

function computeCounts(items: StatusItem[]): AppState["counts"] {
  let ready = 0;
  let paused = 0;
  for (const item of items) {
    if (item.state === "ready") ready += 1;
    else paused += 1;
  }
  return { total: items.length, ready, paused };
}

function initialState(): AppState {
  return {
    activeSurface: ACTIVE_SURFACE,
    activePanel: "cards",
    items: fixtureStatusItems,
    preference: fixturePreference,
    storageStatus: "idle",
    lastError: null,
    counts: computeCounts(fixtureStatusItems),
  };
}

function reducer(state: AppState, action: PulseAction): AppState {
  switch (action.type) {
    case "bootstrap/start": {
      if (state.storageStatus === "loading") return state;
      return { ...state, storageStatus: "loading", lastError: null };
    }
    case "bootstrap/ready": {
      return {
        ...state,
        items: action.items,
        preference: action.preference,
        storageStatus: "ready",
        lastError: null,
        counts: computeCounts(action.items),
      };
    }
    case "bootstrap/error": {
      return {
        ...state,
        storageStatus: "error",
        lastError: action.error,
        items: fixtureStatusItems,
        preference: fixturePreference,
        counts: computeCounts(fixtureStatusItems),
      };
    }
    case "items/refresh": {
      const items = state.items.map((item) => ({
        ...item,
        timestamp: action.timestamp,
      }));
      return { ...state, items, counts: computeCounts(items) };
    }
    case "system/toggle": {
      const items = state.items.map((item) => ({
        ...item,
        state: action.state,
        timestamp: action.timestamp,
      }));
      const preference: AppState["preference"] = {
        ...state.preference,
        systemState: action.state,
      };
      return {
        ...state,
        items,
        preference,
        counts: computeCounts(items),
      };
    }
    case "items/select": {
      const preference: AppState["preference"] = {
        ...state.preference,
        selectedId: action.id,
      };
      return { ...state, preference };
    }
    case "panel/set": {
      if (state.activePanel === action.panel) return state;
      return { ...state, activePanel: action.panel };
    }
    case "error/clear": {
      if (state.lastError === null) return state;
      return { ...state, lastError: null };
    }
    default: {
      const exhaustive: never = action;
      void exhaustive;
      return state;
    }
  }
}

export interface PulseStoreValue {
  state: AppState;
  bridge: AppBridge;
}

const PulseStoreContext = createContext<PulseStoreValue | null>(null);

export interface PulseStoreProviderProps {
  children: ReactNode;
  /** Override the storage adapter (used by tests). */
  storage?: PreferenceStorage;
  /**
   * When true, defer the bootstrap effect until the parent renders. Useful for
   * SSR-style tests. Defaults to false.
   */
  deferBootstrap?: boolean;
}

export function PulseStoreProvider({
  children,
  storage,
  deferBootstrap = false,
}: PulseStoreProviderProps) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const stateRef = useRef<AppState>(state);
  stateRef.current = state;

  const storageRef = useRef<PreferenceStorage | null>(storage ?? null);
  storageRef.current = storage ?? storageRef.current;

  // Bootstrap: read persisted preference, fall back to fixtures.
  useEffect(() => {
    if (deferBootstrap) return;
    const adapter = storageRef.current;
    dispatch({ type: "bootstrap/start" });
    const result = loadPreference(adapter ?? undefined);
    if (result.kind === "corrupted") {
      dispatch({ type: "bootstrap/error", error: result.error });
      return;
    }
    const preference = result.kind === "value" ? result.preference : fixturePreference;
    const items = fixtureStatusItems.map((item) =>
      item.id === preference.selectedId ? { ...item, state: preference.systemState } : item,
    );
    dispatch({ type: "bootstrap/ready", items, preference });
  }, [deferBootstrap]);

  // Persist preference whenever it changes (after bootstrap).
  useEffect(() => {
    if (state.storageStatus === "idle" || state.storageStatus === "loading") return;
    const adapter = storageRef.current;
    const error = savePreference(state.preference, adapter ?? undefined);
    if (error) {
      dispatch({ type: "bootstrap/error", error });
    }
  }, [state.preference, state.storageStatus]);

  const refresh = useCallback(() => {
    dispatch({ type: "items/refresh", timestamp: Date.now() });
  }, []);

  const toggleSystem = useCallback(() => {
    const current = stateRef.current;
    const nextState = current.preference.systemState === "ready" ? "paused" : "ready";
    dispatch({ type: "system/toggle", state: nextState, timestamp: Date.now() });
  }, []);

  const selectItem = useCallback((id: string | null) => {
    dispatch({ type: "items/select", id });
  }, []);

  const setPanel = useCallback((panel: AppPanel) => {
    dispatch({ type: "panel/set", panel });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: "error/clear" });
  }, []);

  const bridge = useMemo<AppBridge>(() => {
    const selectedRecord = state.preference.selectedId
      ? state.items.find((item) => item.id === state.preference.selectedId) ?? null
      : null;
    return {
      activeRoute: state.activeSurface,
      activePanel: state.activePanel,
      selectedRecord,
      counts: state.counts,
      storageStatus: state.storageStatus,
      lastError: state.lastError,
      refresh,
      toggleSystem,
      selectItem,
      setPanel,
      clearError,
    };
  }, [state, refresh, toggleSystem, selectItem, setPanel, clearError]);

  const value = useMemo<PulseStoreValue>(() => ({ state, bridge }), [state, bridge]);

  return <PulseStoreContext.Provider value={value}>{children}</PulseStoreContext.Provider>;
}

/** Read the full state object. Throws if used outside the provider. */
export function usePulseState(): AppState {
  const ctx = useContext(PulseStoreContext);
  if (!ctx) {
    throw new Error("usePulseState must be used inside <PulseStoreProvider>");
  }
  return ctx.state;
}

/** Read the bridge object — preferred surface for screen owners. */
export function usePulseBridge(): AppBridge {
  const ctx = useContext(PulseStoreContext);
  if (!ctx) {
    throw new Error("usePulseBridge must be used inside <PulseStoreProvider>");
  }
  return ctx.bridge;
}