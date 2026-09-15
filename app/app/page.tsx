import { ConfigPanel } from "@/components/ConfigPanel";
import { QueueManager } from "@/components/QueueManager";
import { CanvasPreview } from "@/components/CanvasPreview";

export default function StudioPage() {
  return (
    <div className="relative flex-1 flex flex-col min-h-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/40 via-neutral-950 to-neutral-950">
      {/* Studio Workspace: Fixed viewport blocks on desktop (scroll down only to see footer) */}
      <main className="w-full max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex-1 flex flex-col lg:h-[calc(100dvh-4.25rem)] lg:max-h-[calc(100dvh-4.25rem)] min-h-0 overflow-y-auto lg:overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-1 lg:grid-rows-[minmax(0,1fr)] gap-3 flex-1 min-h-0 lg:h-full lg:max-h-full items-stretch lg:overflow-hidden">
          {/* Left Column: Config & Actions */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col lg:h-full min-h-0 lg:max-h-full lg:overflow-hidden">
            <ConfigPanel />
          </div>

          {/* Center Column: Queue Manager (Scrollable internally) */}
          <div className="lg:col-span-5 xl:col-span-6 flex flex-col lg:h-full min-h-0 lg:max-h-full lg:overflow-hidden">
            <QueueManager />
          </div>

          {/* Right Column: Live Preview (Slim, tailored to 9:16 canvas) */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col lg:h-full min-h-0 lg:max-h-full lg:overflow-hidden items-center">
            <CanvasPreview />
          </div>
        </div>
      </main>
    </div>
  );
}
