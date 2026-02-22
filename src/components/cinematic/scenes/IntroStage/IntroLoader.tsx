"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "auto";
        onComplete();
      },
    });

    gsap.set(barRef.current, {
      scaleX: 0,
      transformOrigin: "center center",
    });

    tl.to(barRef.current, {
      scaleX: 1,
      duration: 1.2,
      ease: "power3.inOut",
    });
    tl.to(barRef.current, {
      opacity: 0,
      duration: 0.3,
    });

    tl.to(
      topRef.current,
      {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut",
      },
      "-=0.6"
    );

    tl.to(
      bottomRef.current,
      {
        yPercent: 100,
        duration: 1.2,
        ease: "power4.inOut",
      },
      "<"
    );

    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.4,
      },
      "-=0.4"
    );
  }, [onComplete]);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-9999">
      <div ref={topRef} className="absolute top-0 left-0 h-1/2 w-full bg-black" />
      <div ref={bottomRef} className="absolute bottom-0 left-0 h-1/2 w-full bg-black" />
      <div className="absolute top-1/2 left-0 flex w-full -translate-y-1/2 justify-center">
        <div ref={barRef} className="h-0.75 w-full bg-white" />
      </div>
    </div>
  );
}
