import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://vibeclips.shanaka.dev'),
  title: {
    default: "VibeClips - Generate Animated Music Videos",
    template: "%s | VibeClips"
  },
  description: "Free AI-powered music video generator. Create stunning 9:16 animated videos for your music with procedurally generated ambient visuals, zero watermarks.",
  keywords: ["free AI music video generator", "AI video generator for music", "free music video maker", "short form video generator", "lofi video generator", "VibeClips"],
  authors: [{ name: "Shanaka" }],
  creator: "Shanaka",
  publisher: "Shanaka",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "VibeClips - Generate Animated Music Videos",
    description: "Free AI-powered music video generator. Create stunning 9:16 animated videos for your music with zero watermarks.",
    url: 'https://vibeclips.shanaka.dev',
    siteName: 'VibeClips',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "VibeClips - Generate Animated Music Videos",
    description: "Free AI-powered music video generator. Create stunning 9:16 animated videos for your music with zero watermarks.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-gray-950 text-white font-sans">
        {children}
      </body>
    </html>
  );
}
