import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4 md:col-span-2">
          <h3 className="text-xl font-bold text-white tracking-tight">VibeClips</h3>
          <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
            The free, open-source AI video generator for independent musicians and creators. Bring your tracks to life with procedurally generated ambient visuals powered by Google's Gemini AI.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-white">Product</h4>
          <ul className="space-y-3">
            <li><Link href="/" className="text-sm text-neutral-400 hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/app" className="text-sm text-neutral-400 hover:text-white transition-colors">Create Videos</Link></li>
            <li><Link href="/about" className="text-sm text-neutral-400 hover:text-white transition-colors">About the Project</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-white">Resources</h4>
          <ul className="space-y-3">
            <li><Link href="/docs" className="text-sm text-neutral-400 hover:text-white transition-colors">Documentation</Link></li>
            <li><a href="https://github.com/ssshanaka/vibeclips-generate-animation-music-videos-short-form-clips" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 hover:text-white transition-colors">GitHub Repository</a></li>
            <li><a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-400 hover:text-white transition-colors">Get Gemini API Key</a></li>
            <li><Link href="/docs/how-to-generate-music-videos" className="text-sm text-neutral-400 hover:text-white transition-colors">Getting Started Guide</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} VibeClips. Open Source under MIT License.
        </p>
        <div className="flex items-center gap-4 text-sm text-neutral-500">
          <span>Built with <a href="https://shanaka.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">&lt;3 for Artists</a></span>
          <span className="hidden md:inline">•</span>
          <Link href="/privacy" className="hover:text-neutral-300">Privacy Policy</Link>
          <span className="hidden md:inline">•</span>
          <Link href="/terms" className="hover:text-neutral-300">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
