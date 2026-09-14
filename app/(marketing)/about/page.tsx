import { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'About VibeClips - Open Source AI Music Video Generator',
  description: 'Learn about the mission behind VibeClips: empowering independent musicians and creators with free, open-source AI video generation tools for TikTok, YouTube Shorts, and Spotify Canvas.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "VibeClips",
    "url": "https://vibeclips.shanaka.dev",
    "logo": "https://vibeclips.shanaka.dev/icon?size=512x512",
    "description": "VibeClips is a free, open-source AI music video generator powered by Google's Gemini API.",
    "founder": {
      "@type": "Person",
      "name": "Shanaka"
    },
    "sameAs": [
      "https://github.com/ssshanaka/vibeclips-generate-animation-music-videos-short-form-clips"
    ]
  };

  return (
    <>
      <JsonLd data={orgSchema} />
      <div className="max-w-4xl mx-auto px-6 py-24 space-y-16">
        {/* Header Section */}
        <section className="space-y-6 text-center">
          <h1 className="text-5xl font-extrabold text-white tracking-tight">About VibeClips</h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Democratizing visual content creation for independent artists, beatmakers, and podcasters through the power of open-source AI.
          </p>
        </section>

        {/* Content Sections */}
        <section className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">The Problem We're Solving</h2>
            <div className="space-y-4 text-lg text-neutral-300 leading-relaxed">
              <p>
                In today's algorithmic landscape, audio isn't enough. Whether you're an indie musician releasing a new single, a beatmaker dropping a lofi compilation, or a podcaster sharing a clip, <strong>you need video content to get noticed on TikTok, Instagram Reels, and YouTube Shorts.</strong>
              </p>
              <p>
                But for independent creators, high-quality music video production is completely out of reach. Hiring animators is incredibly expensive, and standard stock footage visualizers feel cheap and overused. The modern artist is forced to spend hours learning complex video editing software just to make a 30-second Spotify Canvas.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Our Solution: Procedural AI Visuals</h2>
            <div className="space-y-4 text-lg text-neutral-300 leading-relaxed">
              <p>
                VibeClips bridges the gap between audio and visual art. It is a <strong>100% free, browser-based AI video generator</strong> that creates stunning, procedurally generated ambient visuals that perfectly match the mood of your music.
              </p>
              <p>
                Instead of slapping your track over generic stock footage, VibeClips uses Google's Gemini AI to literally <em>write code</em> that generates unique, beautiful HTML5 Canvas animations on the fly. It renders these animations directly in your browser, exporting them into high-quality, watermark-free 9:16 MP4s ready for social media.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">How We Keep It Free (The BYOK Model)</h2>
            <div className="space-y-4 text-lg text-neutral-300 leading-relaxed">
              <p>
                How can an AI video generator be completely free? The secret is the <strong>Bring Your Own Key (BYOK)</strong> model and WebCodecs technology.
              </p>
              <p>
                Traditional video generators charge heavy subscription fees because they have to pay for massive server farms to render your videos. VibeClips flips this on its head. 
                All video rendering happens <em>client-side</em>—right on your own computer's GPU using the WebCodecs API. 
                To power the AI prompt generation, you simply provide your own free Gemini API key from Google AI Studio. 
              </p>
              <p>
                No servers means no massive overhead, which means no monthly subscriptions and absolutely no watermarks on your art.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Our Tech Stack</h2>
            <div className="p-8 bg-neutral-900 border border-neutral-800 rounded-2xl">
              <p className="text-neutral-300 mb-6 leading-relaxed">
                VibeClips is open-source software built for the modern web. We believe in transparency and community-driven development.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-400">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <strong>Framework:</strong> Next.js 14 (App Router)
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  <strong>AI Engine:</strong> Google Gemini API
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <strong>Styling:</strong> Tailwind CSS
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <strong>Rendering:</strong> HTML5 Canvas & WebCodecs
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-3xl p-12 space-y-8">
          <h2 className="text-3xl font-bold text-white">Ready to elevate your music?</h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Stop worrying about video content and get back to making music. Generate a month's worth of visual content right now, completely free.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/app"
              className="inline-block bg-white text-neutral-950 font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform"
            >
              Open the Video Generator
            </Link>
            <a
              href="https://github.com/ssshanaka/vibeclips-generate-animation-music-videos-short-form-clips"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-transparent border border-neutral-700 text-white font-bold px-8 py-4 rounded-full hover:bg-neutral-800 transition-colors"
            >
              Star us on GitHub
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
