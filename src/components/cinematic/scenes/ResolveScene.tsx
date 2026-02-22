"use client";

import React, { useRef } from "react";

type Props = {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
};

export default function ResolveScene({ wrapperRef }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div ref={wrapperRef} className="relative flex items-center justify-center">
        <div ref={frameRef} className="absolute h-100 w-225 bg-[url('/panel-lines.webp')] bg-cover bg-center" />
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.03)_0px,rgba(255,255,255,0.03)_1px,transparent_2px,transparent_4px)]" />
        <h1 className="font-wakanda w-225 text-center text-8xl font-bold tracking-[0.3em] text-white uppercase drop-shadow-[0_0_20px_rgba(0,255,150,0.8)]">
          Access granted
        </h1>
      </div>
    </div>
  );
}
