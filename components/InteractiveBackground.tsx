"use client";

import { useEffect, useRef } from "react";

export function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseOrbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Subtle parallax on the entire blob cluster
      if (containerRef.current) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.035;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.035;
        containerRef.current.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      }
    };

    // Smooth lerp animation for the mouse-reactive liquid reflection orb
    const animate = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      if (mouseOrbRef.current) {
        mouseOrbRef.current.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`;
      }

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ backgroundColor: "#030712" }}
      aria-hidden="true"
    >
      {/* Liquid Organic Blob Cluster */}
      <div
        ref={containerRef}
        className="absolute inset-0 transition-transform duration-700 ease-out will-change-transform"
      >
        {/* Blob 1: Vibrant Violet - Top Left */}
        <div
          className="absolute w-[520px] h-[520px] rounded-full blur-[110px] opacity-70 mix-blend-screen"
          style={{
            background: "radial-gradient(circle, #7C3AED 0%, #4338CA 50%, transparent 70%)",
            top: "-5%",
            left: "5%",
            animation: "blob-drift-1 22s ease-in-out infinite",
          }}
        />

        {/* Blob 2: Hot Pink / Magenta - Top Center-Right */}
        <div
          className="absolute w-[480px] h-[480px] rounded-full blur-[100px] opacity-65 mix-blend-screen"
          style={{
            background: "radial-gradient(circle, #EC4899 0%, #BE185D 45%, transparent 70%)",
            top: "8%",
            right: "10%",
            animation: "blob-drift-2 26s ease-in-out infinite",
            animationDelay: "-4s",
          }}
        />

        {/* Blob 3: Electric Cyan / Sky - Mid Left */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-60 mix-blend-screen"
          style={{
            background: "radial-gradient(circle, #06B6D4 0%, #0284C7 50%, transparent 70%)",
            top: "40%",
            left: "-5%",
            animation: "blob-drift-3 24s ease-in-out infinite",
            animationDelay: "-8s",
          }}
        />

        {/* Blob 4: Amber / Warm Gold - Center Right (Inspired by reference) */}
        <div
          className="absolute w-[540px] h-[540px] rounded-full blur-[115px] opacity-60 mix-blend-screen"
          style={{
            background: "radial-gradient(circle, #F59E0B 0%, #D97706 45%, transparent 70%)",
            top: "35%",
            right: "5%",
            animation: "blob-drift-4 28s ease-in-out infinite",
            animationDelay: "-12s",
          }}
        />

        {/* Blob 5: Deep Indigo / Purple - Bottom Left */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[130px] opacity-65 mix-blend-screen"
          style={{
            background: "radial-gradient(circle, #6366F1 0%, #4F46E5 50%, transparent 70%)",
            bottom: "-10%",
            left: "25%",
            animation: "blob-drift-5 30s ease-in-out infinite",
            animationDelay: "-6s",
          }}
        />

        {/* Blob 6: Emerald Aurora Glow - Bottom Right */}
        <div
          className="absolute w-[460px] h-[460px] rounded-full blur-[105px] opacity-50 mix-blend-screen"
          style={{
            background: "radial-gradient(circle, #10B981 0%, #059669 45%, transparent 70%)",
            bottom: "5%",
            right: "-5%",
            animation: "blob-drift-6 25s ease-in-out infinite",
            animationDelay: "-15s",
          }}
        />
      </div>

      {/* Interactive Liquid Refraction Orb (smoothly tracks cursor) */}
      <div
        ref={mouseOrbRef}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[90px] opacity-55 mix-blend-screen will-change-transform pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.45) 0%, rgba(124, 58, 237, 0.35) 40%, rgba(6, 182, 212, 0.15) 65%, transparent 75%)",
          transform: "translate3d(-500px, -500px, 0)",
        }}
      />

      {/* Subtle Vignette / Contrast Layer to keep foreground typography crystal clear */}
      <div
        className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[1px] pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
