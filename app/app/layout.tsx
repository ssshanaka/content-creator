import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'App | VibeClips - Generate Animated Music Videos',
  description: 'Generate 20 lofi ambient quotes and visuals in batch.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {children}
    </div>
  );
}
