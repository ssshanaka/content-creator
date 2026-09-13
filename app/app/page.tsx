import { ConfigPanel } from '@/components/ConfigPanel';
import { QueueManager } from '@/components/QueueManager';
import { CanvasPreview } from '@/components/CanvasPreview';
import { ExportActions } from '@/components/ExportActions';

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-4 md:p-6 flex flex-col lg:flex-row gap-6">
      {/* Sidebar for Config and Export */}
      <div className="w-full lg:w-1/4 flex flex-col gap-6">
        <ConfigPanel />
        <ExportActions />
      </div>

      {/* Main content for Queue */}
      <div className="w-full lg:w-2/4 h-[calc(100vh-3rem)]">
        <QueueManager />
      </div>

      {/* Preview */}
      <div className="w-full lg:w-1/4">
        <CanvasPreview />
      </div>
    </main>
  );
}
