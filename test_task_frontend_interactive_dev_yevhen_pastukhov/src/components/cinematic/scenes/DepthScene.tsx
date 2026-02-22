"use client";

import React from "react";

export default function DepthScene({
  midRef,
  frontRef,
  titleRef,
}: {
  midRef: React.RefObject<HTMLDivElement | null>;
  frontRef: React.RefObject<HTMLDivElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-black/20 to-transparent" />
      <div ref={midRef} className="absolute top-1/3 left-1/4 h-200 w-200 rounded-full bg-[#dafed1]/10 blur-3xl" />
      <div ref={frontRef} className="absolute top-1/4 right-1/4 h-100 w-100 rounded-full bg-[#38f270]/10 blur-2xl" />
      <div className="relative z-10 flex h-full items-center justify-center">
        <h2 ref={titleRef} className="font-wakanda text-6xl font-bold tracking-widest text-white uppercase">
          The journey begins
        </h2>
      </div>
    </div>
  );
}
