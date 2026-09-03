import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lofi Content Engine",
  description: "Procedural ambient video generation",
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
