import { useEffect, useRef } from "react";
import {
  PulseStoreProvider,
  usePulseBridge,
  usePulseState,
} from "./features/pulse-card-desk/pulse-card-desk.store";
import type { AppBridge } from "./features/pulse-card-desk/pulse-card-desk.types";
import { installAppBridge, uninstallAppBridge } from "./test/bridge";

/**
 * Inner shell component — runs inside the store provider so it can read the
 * live bridge handle and forward actions into the rendered screen.
 *
 * The actual StatusUtilityPulseCardDesk render is owned by a downstream
 * story; this shell wires the store + bridge so that screen-owner stories can
 * import `usePulseBridge()` and observe state without remounting providers.
 *
 * `window.app` is installed as a stable handle whose getters read the live
 * state via refs, so QA / runtime hooks always see fresh values.
 */
function PulseShell() {
  const bridge = usePulseBridge();
  const state = usePulseState();
  const stateRef = useRef(state);
  stateRef.current = state;
  const bridgeRef = useRef(bridge);
  bridgeRef.current = bridge;

  useEffect(() => {
    const handle: AppBridge = {
      get activeRoute() {
        return stateRef.current.activeSurface;
      },
      get activePanel() {
        return stateRef.current.activePanel;
      },
      get selectedRecord() {
        const id = stateRef.current.preference.selectedId;
        if (!id) return null;
        return stateRef.current.items.find((item) => item.id === id) ?? null;
      },
      get counts() {
        return stateRef.current.counts;
      },
      get storageStatus() {
        return stateRef.current.storageStatus;
      },
      get lastError() {
        return stateRef.current.lastError;
      },
      refresh: () => bridgeRef.current.refresh(),
      toggleSystem: () => bridgeRef.current.toggleSystem(),
      selectItem: (id) => bridgeRef.current.selectItem(id),
      setPanel: (panel) => bridgeRef.current.setPanel(panel),
      clearError: () => bridgeRef.current.clearError(),
    };
    installAppBridge(handle);
    return () => {
      uninstallAppBridge();
    };
  }, []);

  return (
    <div
      data-setfarm-root="pulse-card-desk-shell"
      data-testid="setfarm-app-root"
      className="min-h-screen bg-slate-50 text-slate-950"
    />
  );
}

export default function App() {
  return (
    <PulseStoreProvider>
      <PulseShell />
    </PulseStoreProvider>
  );
}