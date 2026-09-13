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
          "text": "VibeClips exports standard 9:16 vertical videos at 1080x1920 resolution, which is the perfect format for TikTok, Instagram Reels, and YouTube Shorts."
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
          "text": "No! Our AI (powered by Google's Gemini) procedurally generates unique HTML5 Canvas animations—like starfields, analog grain, mist, and aurora waves—matching the vibe of your music."
        }
      }
    ]
  };

  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 space-y-28">
        {/* Hero Section */}
        <section className="text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white">
            Create Stunning AI Music Videos — Free
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Bring your music to life with procedurally generated ambient visuals. 
            Perfect for TikTok, Reels, and Shorts. Zero watermarks, 100% open source.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/app"
              className="inline-block bg-white text-neutral-950 font-semibold px-8 py-4 rounded-full hover:scale-105 transition-transform w-full sm:w-auto"
            >
              Start Creating Now
            </Link>
            <a
              href="https://github.com/ssshanaka/content-creator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-neutral-900 border border-neutral-700 text-white font-semibold px-8 py-4 rounded-full hover:bg-neutral-800 transition-colors w-full sm:w-auto"
            >
              View on GitHub
            </a>
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
              <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center text-xl font-bold mx-auto border border-blue-500/30">1</div>
              <h3 className="text-xl font-bold text-white">Drop Your Tracks</h3>
              <p className="text-neutral-400 text-sm">Upload your MP3 or WAV files. Pick a vibe (Lofi, Synthwave, Rap) and let the engine extract the mood.</p>
            </div>
            <div className="text-center p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center text-xl font-bold mx-auto border border-purple-500/30">2</div>
              <h3 className="text-xl font-bold text-white">AI Generates Visuals</h3>
              <p className="text-neutral-400 text-sm">Gemini AI scripts custom HTML5 canvas animations, perfectly matching your selected aesthetic.</p>
            </div>
            <div className="text-center p-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center text-xl font-bold mx-auto border border-emerald-500/30">3</div>
              <h3 className="text-xl font-bold text-white">Batch Export</h3>
              <p className="text-neutral-400 text-sm">Render 20+ videos right in your browser. Download as a ZIP archive or send directly to Telegram.</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Powerful Features for Artists</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Procedural Animation</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">No generic stock footage. Our AI writes unique code to render stunning visual themes like mist, starfields, and aurora waves.</p>
            </div>
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Perfect 9:16 Format</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Every video is exported natively in 1080x1920 resolution, the golden standard for TikTok, Reels, and Shorts.</p>
            </div>
            <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Zero Watermarks</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">It's your music and your content. We don't plaster our logo on your videos. Keep your brand clean and professional.</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto space-y-12 pb-12">
          <h2 className="text-3xl font-bold text-white text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((faq, idx) => (
              <div key={idx} className="border-b border-neutral-800 pb-6">
                <h4 className="text-lg font-medium text-white mb-3">{faq.name}</h4>
                <p className="text-neutral-400 leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
