import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
      <Link href="/" className="text-xl font-bold tracking-tight text-white">
        VibeClips
      </Link>
      <nav className="flex items-center gap-6">
        <Link href="/about" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
          About
        </Link>
        <Link href="/blog" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
          Blog
        </Link>
        <a href="https://github.com/ssshanaka/content-creator" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
          GitHub
        </a>
        <Link
          href="/app"
          className="text-sm font-medium bg-white text-neutral-950 px-4 py-2 rounded-md hover:bg-neutral-200 transition-colors"
        >
          Create Videos
        </Link>
      </nav>
    </header>
  );
}
