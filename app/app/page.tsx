import { ConfigPanel } from "@/components/ConfigPanel";
import { QueueManager } from "@/components/QueueManager";
import { CanvasPreview } from "@/components/CanvasPreview";
import { ExportActions } from "@/components/ExportActions";

export default function StudioPage() {
  return (
    <div className="relative flex-1 flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/30 via-neutral-950 to-neutral-950">
      {/* Studio Workspace: Fixed viewport blocks on desktop, scroll only down to see footer */}
      <main className="w-full max-w-[1750px] mx-auto px-3 sm:px-5 py-3 sm:py-4 flex-1 flex flex-col lg:h-[calc(100vh-4.25rem)] lg:min-h-[640px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 flex-1 min-h-0 items-stretch">
          {/* Left Column: Config Panel & Export Actions */}
          <div className="lg:col-span-4 xl:col-span-3 2xl:col-span-3 flex flex-col gap-3.5 h-full min-h-0 overflow-y-auto pr-1 custom-scrollbar">
            <ConfigPanel />
            <ExportActions />
          </div>

          {/* Center Column: Queue Manager (Scrollable internally) */}
          <div className="lg:col-span-5 xl:col-span-5 2xl:col-span-6 flex flex-col h-full min-h-0">
            <QueueManager />
          </div>

          {/* Right Column: Live Studio Preview */}
          <div className="lg:col-span-3 xl:col-span-4 2xl:col-span-3 flex flex-col h-full min-h-0">
            <CanvasPreview />
          </div>
        </div>
      </main>
    </div>
  );
}
