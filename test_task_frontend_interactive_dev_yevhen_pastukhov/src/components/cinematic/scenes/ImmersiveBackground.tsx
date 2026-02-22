"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function ImmersiveBackground({ scrollProgressRef }: { scrollProgressRef: React.RefObject<number> }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const maxRotation = 6;

    const handleMove = (e: MouseEvent) => {
      const percentX = e.clientX / window.innerWidth - 0.5;
      const percentY = e.clientY / window.innerHeight - 0.5;

      gsap.to(scene, {
        rotateY: percentX * maxRotation,
        rotateX: -percentY * maxRotation,
        duration: 1,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const progress = scrollProgressRef.current ?? 0;

      if (farRef.current) {
        gsap.set(farRef.current, {
          z: 400 - progress * 1000,
        });
      }

      if (midRef.current) {
        gsap.set(midRef.current, {
          z: 200 - progress * 600,
        });
      }
    }, 16);

    return () => clearInterval(interval);
  }, [scrollProgressRef]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden perspective-[2000px]">
      <div ref={sceneRef} className="absolute inset-0 transform-3d">
        <div
          ref={farRef}
          className="absolute inset-[-20%] bg-[url('/bg-jungle.jpg')] bg-cover bg-center"
          style={{ transform: "translateZ(-800px)" }}
        />
        <div
          ref={midRef}
          className="absolute inset-[-20%] bg-[url('/bg-particles.png')] bg-cover bg-center opacity-60"
          style={{ transform: "translateZ(-400px)" }}
        />
      </div>

      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
