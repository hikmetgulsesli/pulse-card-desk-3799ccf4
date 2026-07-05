// AUTO-GENERATED from Stitch — DO NOT modify layout or CSS
// Screen: Status Utility - Pulse Card Desk
// 
// AGENT INSTRUCTIONS:
// 1. DO NOT change className values or layout structure
// 2. Add useState for dynamic values (replace hardcoded text)
// 3. Wire interactive controls through the typed actions prop
// 4. Replace placeholder data with props/state

import { BadgeHelp, Clock, Database, RefreshCcw, RefreshCw } from "lucide-react";


export type StatusUtilityPulseCardDeskActionId = "refresh-status-1";

export interface StatusUtilityPulseCardDeskProps {
  actions?: Partial<Record<StatusUtilityPulseCardDeskActionId, () => void>>;

}

export function StatusUtilityPulseCardDesk({ actions }: StatusUtilityPulseCardDeskProps) {
  return (
    <>
      {/* Utility Container */}
      <div className="w-full max-w-2xl bg-surface border border-outline-variant rounded shadow-sm flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-3 border-b border-outline-variant bg-surface-container-low">
      <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">Pulse Card Desk</h1>
      <div className="font-label-mono text-label-mono text-on-surface-variant flex items-center gap-2">
      <Clock className="text-[16px]" aria-hidden={true} focusable="false" />
      <span id="current-time">14:32:05 UTC</span>
      </div>
      </header>
      {/* Main Content */}
      <main className="p-4 flex flex-col gap-4">
      {/* Controls Bar */}
      <div className="flex justify-between items-center bg-surface-container-lowest border border-outline-variant p-3 rounded">
      <div className="flex items-center gap-3">
      <button className="bg-primary hover:bg-surface-tint text-on-primary px-4 py-2 rounded flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-fixed focus:ring-offset-1" type="button" data-action-id="refresh-status-1" onClick={actions?.["refresh-status-1"]}>
      <RefreshCw className="text-[18px]" aria-hidden={true} focusable="false" />
      <span className="font-label-mono text-label-mono">Refresh Status</span>
      </button>
      <div className="flex items-center gap-2 border-l border-outline-variant pl-3 ml-1">
      <span className="font-label-mono text-label-mono text-on-surface-variant">System Ready</span>
      <label className="relative inline-flex items-center cursor-pointer">
      <input defaultChecked={true} className="sr-only peer" type="checkbox" defaultValue="" />
      <div className="w-9 h-5 bg-surface-variant peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-fixed rounded-sm peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-outline after:border after:rounded-sm after:h-4 after:w-4 after:transition-all peer-checked:bg-primary border border-outline-variant"></div>
      </label>
      </div>
      </div>
      <div className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded border border-outline-variant">
      <div className="w-2 h-2 rounded-full bg-[#10b981] status-pulse"></div>
      <span className="font-label-mono text-label-mono text-on-surface">Local State: Connected</span>
      </div>
      </div>
      {/* Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Card 1 */}
      <div className="border border-outline-variant bg-surface-container-lowest p-3 rounded flex flex-col gap-2">
      <div className="flex justify-between items-start">
      <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">Database Node</span>
      <Database className="text-outline text-[16px]" aria-hidden={true} focusable="false" />
      </div>
      <div className="flex items-end gap-2 mt-1">
      <div className="text-on-surface font-data-table text-data-table font-medium">Active</div>
      <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] mb-1.5"></div>
      </div>
      <div className="font-label-mono text-label-mono text-outline mt-auto pt-2 border-t border-surface-variant text-[10px]">
                              Last ping: 2s ago
                          </div>
      </div>
      {/* Card 2 */}
      <div className="border border-outline-variant bg-surface-container-lowest p-3 rounded flex flex-col gap-2">
      <div className="flex justify-between items-start">
      <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">Queue Worker</span>
      <RefreshCcw className="text-outline text-[16px]" aria-hidden={true} focusable="false" />
      </div>
      <div className="flex items-end gap-2 mt-1">
      <div className="text-on-surface font-data-table text-data-table font-medium">Idle</div>
      <div className="w-1.5 h-1.5 rounded-full bg-outline mb-1.5"></div>
      </div>
      <div className="font-label-mono text-label-mono text-outline mt-auto pt-2 border-t border-surface-variant text-[10px]">
                              Last task: 4m ago
                          </div>
      </div>
      {/* Card 3 */}
      <div className="border border-outline-variant bg-surface-container-lowest p-3 rounded flex flex-col gap-2">
      <div className="flex justify-between items-start">
      <span className="font-label-mono text-label-mono text-on-surface-variant uppercase tracking-wider">Auth Service</span>
      <BadgeHelp className="text-outline text-[16px]" aria-hidden={true} focusable="false" />
      </div>
      <div className="flex items-end gap-2 mt-1">
      <div className="text-on-surface font-data-table text-data-table font-medium">Success</div>
      <div className="w-1.5 h-1.5 rounded-full bg-[#10b981] mb-1.5"></div>
      </div>
      <div className="font-label-mono text-label-mono text-outline mt-auto pt-2 border-t border-surface-variant text-[10px]">
                              Last refresh: 12s ago
                          </div>
      </div>
      </div>
      </main>
      </div>
      
    </>
  );
}
