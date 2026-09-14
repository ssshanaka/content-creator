"use client";
import { useEffect, useRef } from "react";

export function InteractiveBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const x = e.clientX;
      const y = e.clientY;
      // Using a subtle violet/indigo glow that reacts to the mouse
      bgRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.12), transparent 40%), radial-gradient(1000px circle at ${x}px ${y}px, rgba(79, 70, 229, 0.08), transparent 60%)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 -z-10 pointer-events-none transition-opacity duration-300"
      style={{
        background: 'radial-gradient(600px circle at 50% 50%, rgba(139, 92, 246, 0.05), transparent 40%)',
        backgroundColor: '#0a0a0a' // deep neutral black
      }}
    />
  );
}
