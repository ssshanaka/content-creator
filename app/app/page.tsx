import { ConfigPanel } from "@/components/ConfigPanel";
import { QueueManager } from "@/components/QueueManager";
import { CanvasPreview } from "@/components/CanvasPreview";
import { ExportActions } from "@/components/ExportActions";

export default function StudioPage() {
  return (
    <div className="relative flex-1 flex flex-col bg-neutral-950">
      {/* Studio Workspace: Fixed viewport blocks on desktop (scroll down only to see footer) */}
      <main className="w-full max-w-[2400px] mx-auto px-3 sm:px-5 lg:px-6 2xl:px-8 py-2.5 sm:py-3 flex-1 flex flex-col lg:h-[calc(100dvh-4.25rem)] min-h-[580px] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 min-h-0 items-stretch">
          {/* Left Column: Config (top) & Export (bottom) */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-2.5 h-full min-h-0">
            <ConfigPanel />
            <ExportActions />
          </div>

          {/* Center Column: Queue Manager (Scrollable internally) */}
          <div className="lg:col-span-4 xl:col-span-5 flex flex-col h-full min-h-0">
            <QueueManager />
          </div>

          {/* Right Column: Live Preview (Significantly larger auto-scaling canvas) */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col h-full min-h-0">
            <CanvasPreview />
          </div>
        </div>
      </main>
    </div>
  );
}
