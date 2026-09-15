"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" onClick={closeMenu} className="text-xl font-bold tracking-tight text-white hover:text-neutral-300 transition-colors">
          VibeClips
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {!isHome && (
            <Link href="/" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
              Home
            </Link>
          )}
          <Link href="/about" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
            About
          </Link>
          <Link href="/docs" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
            Docs
          </Link>
          <a href="https://github.com/ssshanaka/vibeclips-generate-animation-music-videos-short-form-clips" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
            GitHub
          </a>
          <Link
            href="/app"
            className="text-sm font-medium bg-white text-neutral-950 px-4 py-2 rounded-md hover:bg-neutral-200 transition-colors"
          >
            Create Videos
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden text-neutral-300 hover:text-white p-2"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-neutral-950 border-b border-neutral-800 px-6 py-4 flex flex-col gap-4 shadow-xl">
          {!isHome && (
            <Link href="/" onClick={closeMenu} className="text-lg font-medium text-neutral-300 hover:text-white transition-colors">
              Home
            </Link>
          )}
          <Link href="/about" onClick={closeMenu} className="text-lg font-medium text-neutral-300 hover:text-white transition-colors">
            About
          </Link>
          <Link href="/docs" onClick={closeMenu} className="text-lg font-medium text-neutral-300 hover:text-white transition-colors">
            Docs
          </Link>
          <a href="https://github.com/ssshanaka/vibeclips-generate-animation-music-videos-short-form-clips" onClick={closeMenu} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-neutral-300 hover:text-white transition-colors">
            GitHub
          </a>
          <Link
            href="/app"
            onClick={closeMenu}
            className="text-lg font-medium bg-white text-neutral-950 px-4 py-3 rounded-md hover:bg-neutral-200 transition-colors text-center mt-2"
          >
            Create Videos
          </Link>
        </nav>
      )}
    </header>
  );
}
