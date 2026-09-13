import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About VibeClips - Open Source AI Music Video Generator',
  description: 'Learn about the mission behind VibeClips: empowering musicians and creators with free, open-source AI video generation tools.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24 space-y-8">
      <h1 className="text-4xl font-extrabold text-white">About VibeClips</h1>
      <div className="space-y-6 text-lg text-neutral-300 leading-relaxed">
        <p>
          VibeClips was created with a simple mission: to empower musicians and creators with stunning, AI-generated visual content without breaking the bank.
        </p>
        <p>
          We believe that every great track deserves an incredible visual experience. Our open-source platform bridges the gap between audio and visual art, allowing anyone to generate perfectly synced music videos in minutes.
        </p>
        <p>
          Whether you're an indie artist releasing your first single or a seasoned producer looking for fresh Spotify Canvas visuals, VibeClips is built for you.
        </p>
      </div>
    </div>
  );
}
