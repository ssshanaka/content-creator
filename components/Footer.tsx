import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-6 py-8 border-t border-neutral-800 text-center text-sm text-neutral-500">
      <div className="flex justify-center gap-6 mb-4">
        <Link href="/about" className="hover:text-white transition-colors">About</Link>
        <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        <a href="https://github.com/ssshanaka/content-creator" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
      </div>
      <p>&copy; {new Date().getFullYear()} VibeClips. Open Source under MIT License.</p>
    </footer>
  );
}
