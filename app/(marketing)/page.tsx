import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export default function HomePage() {
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "VibeClips",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "url": "https://vibeclips.shanaka.dev",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "seller": {
        "@type": "Person",
        "name": "Shanaka"
      }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is VibeClips really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! VibeClips is completely free and open-source. There are no subscriptions and no watermarks on your exported videos. You just provide your own free Gemini API key to power the AI generation."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to sign up or create an account?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No sign-up is required. Because VibeClips runs entirely in your browser using client-side WebCodecs, you can start generating videos immediately without creating an account or handing over your email address."
        }
      },
      {
        "@type": "Question",
        "name": "What file formats are supported for my music?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support standard web audio formats including MP3, WAV, and AAC (up to 50MB per file). Just drag and drop them into the app."
        }
      },
      {
        "@type": "Question",
        "name": "What size and resolution are the exported videos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "VibeClips exports standard 9:16 vertical videos at 1080x1920 resolution, which is the perfect native format for TikTok, Instagram Reels, and YouTube Shorts."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use VibeClips for Spotify Canvas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. VibeClips is an excellent free Spotify Canvas maker. Just upload an 8-second loop of your track, select an ambient vibe, and export a beautiful looping 9:16 vertical video."
        }
      },
      {
        "@type": "Question",
        "name": "Can I generate multiple videos at once?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, batch processing is a core feature. You can generate 20+ concepts simultaneously and export them all together in a single .zip file or have them sent directly to your phone via Telegram."
        }
      },
      {
        "@type": "Question",
        "name": "Are the visuals just stock footage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No! Our AI procedurally generates unique HTML5 Canvas animations—like starfields, analog grain, mist, and aurora waves—matching the vibe of your music. You will never get generic stock footage."
        }
      },
      {
        "@type": "Question",
        "name": "What AI model does VibeClips use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "VibeClips uses Google's Gemini API to script the procedural canvas elements, determine aesthetic color palettes, and write the text overlays based on your track's mood."
        }
      }
    ]
  };

  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 space-y-32">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-tight">
            The Free AI Video Generator<br/>For Independent Musicians
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Stop paying monthly subscriptions for watermarked stock footage. Bring your music to life with procedurally generated ambient visuals perfectly formatted for TikTok, Reels, and Shorts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/app"
              className="inline-block bg-white text-neutral-950 font-semibold px-8 py-4 rounded-full hover:scale-105 transition-transform w-full sm:w-auto text-lg"
            >
              Start Creating Now (It's Free)
            </Link>
            <a
              href="https://github.com/ssshanaka/content-creator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-neutral-900 border border-neutral-700 text-white font-semibold px-8 py-4 rounded-full hover:bg-neutral-800 transition-colors w-full sm:w-auto text-lg"
            >
              View Open Source Code
            </a>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="space-y-12 bg-neutral-900/50 -mx-6 px-6 py-16 rounded-3xl border border-neutral-800">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Who Is VibeClips For?</h2>
            <p className="text-neutral-400">Whether you are promoting a single or running a massive beat channel, VibeClips automates your visual content pipeline.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-neutral-950 rounded-2xl border border-neutral-800">
              <h3 className="text-lg font-bold text-white mb-2">Indie Musicians</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Drop your new single and instantly generate 30 days of TikTok content. Keep the algorithm fed without burning out.</p>
            </div>
            <div className="p-6 bg-neutral-950 rounded-2xl border border-neutral-800">
              <h3 className="text-lg font-bold text-white mb-2">Lofi Beatmakers</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Need visuals for your 24/7 radio stream? Generate endless hours of starry nights, rain effects, and cozy aesthetics.</p>
            </div>
            <div className="p-6 bg-neutral-950 rounded-2xl border border-neutral-800">
              <h3 className="text-lg font-bold text-white mb-2">Podcasters</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Upload short audio clips from your latest episode and generate engaging waveform visualizers for YouTube Shorts.</p>
            </div>
            <div className="p-6 bg-neutral-950 rounded-2xl border border-neutral-800">
              <h3 className="text-lg font-bold text-white mb-2">Producers</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Create a free Spotify Canvas for every track on your EP in under 5 minutes. No animation experience required.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">Generate a month's worth of content in three simple steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-900/30 text-blue-400 flex items-center justify-center text-2xl font-bold mx-auto border border-blue-500/30">1</div>
              <h3 className="text-xl font-bold text-white">Drop Your Tracks</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Upload your MP3 or WAV files. Pick a vibe (Lofi, Synthwave, Rap) and let the engine extract the mood of your track.</p>
            </div>
            <div className="text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-900/30 text-purple-400 flex items-center justify-center text-2xl font-bold mx-auto border border-purple-500/30">2</div>
              <h3 className="text-xl font-bold text-white">AI Generates Visuals</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Gemini AI scripts custom HTML5 canvas animations, generating unique particles, lighting, and camera movements perfectly matching your selected aesthetic.</p>
            </div>
            <div className="text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-900/30 text-emerald-400 flex items-center justify-center text-2xl font-bold mx-auto border border-emerald-500/30">3</div>
              <h3 className="text-xl font-bold text-white">Batch Export</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Render 20+ videos right in your browser using your GPU. Download as a ZIP archive or send them directly to your phone via our Telegram bot.</p>
            </div>
          </div>
        </section>

        {/* Platforms Built-For */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Built for Every Platform</h2>
            <p className="text-neutral-400">VibeClips natively exports in high-definition vertical video, meaning your content is immediately ready for the algorithms that matter most.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-white font-medium">
            <div className="px-6 py-3 rounded-full bg-neutral-900 border border-neutral-800">📱 TikTok (9:16)</div>
            <div className="px-6 py-3 rounded-full bg-neutral-900 border border-neutral-800">📸 Instagram Reels</div>
            <div className="px-6 py-3 rounded-full bg-neutral-900 border border-neutral-800">▶️ YouTube Shorts</div>
            <div className="px-6 py-3 rounded-full bg-neutral-900 border border-neutral-800">🎵 Spotify Canvas</div>
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Why VibeClips is Different</h2>
            <p className="text-neutral-400">We aren't another VC-funded SaaS company trying to lock you into a subscription.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Procedural Animation</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Say goodbye to generic stock footage. Our AI writes unique code to render stunning visual themes like mist, starfields, and aurora waves. No two videos are exactly alike.</p>
            </div>
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Client-Side Rendering</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Unlike cloud-based generators that charge you for server time, VibeClips uses WebCodecs to render videos natively on your own computer's GPU for blazing fast exports.</p>
            </div>
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Zero Watermarks</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">It's your music and your content. We don't plaster our logo on your videos. Keep your brand clean, professional, and entirely yours.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto space-y-12 pb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((faq, idx) => (
              <div key={idx} className="border-b border-neutral-800 pb-6">
                <h4 className="text-lg font-medium text-white mb-3">{faq.name}</h4>
                <p className="text-neutral-400 leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="text-center bg-gradient-to-br from-indigo-950 via-neutral-900 to-purple-950 border border-indigo-900/30 rounded-3xl p-12 md:p-20 space-y-8 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">Stop Paying For Content.</h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Join the open-source movement. Automate your music marketing today with the best free AI video generator on the web.
          </p>
          <div className="pt-6">
            <Link
              href="/app"
              className="inline-block bg-white text-neutral-950 font-bold px-10 py-5 rounded-full hover:scale-105 transition-transform text-xl shadow-lg"
            >
              Launch VibeClips — Free
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
