import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Studio | VibeClips - Generate Animated Music Videos',
  description: 'Generate 20 lofi ambient quotes and visuals in batch.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      <Header />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
      <Footer />
    </div>
  );
}
