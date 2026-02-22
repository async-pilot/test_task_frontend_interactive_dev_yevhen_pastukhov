"use client";

import React from "react";
import Image from "next/image";

type Props = {
  listRef: React.RefObject<HTMLUListElement | null>;
  fillRef: React.RefObject<HTMLDivElement | null>;
  slidesRef: React.RefObject<HTMLDivElement[]>;
};

export default function IndicatorScene({ listRef, fillRef, slidesRef }: Props) {
  const items = ["JUNGLE", "RIVER", "VIBRANIUM", "WAKANDA"];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="fill relative flex w-full px-10">
        <ul ref={listRef} className="relative space-y-6 pr-10 text-3xl tracking-widest uppercase">
          {items.map((item, i) => (
            <li key={i} className="font-wakanda text-white/60">
              {item}
            </li>
          ))}
          <div className="absolute top-0 -left-2.5 h-full w-0.75 rounded-full bg-white/20" />
          <div
            ref={fillRef}
            className="absolute top-0 -left-2.5 h-full w-0.75 rounded-full bg-emerald-400 will-change-transform"
          />
        </ul>
        <div className="relative flex-1">
          {items.map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) slidesRef.current[i] = el;
              }}
              className="absolute top-1/2 right-10 -translate-y-1/2 opacity-0"
            >
              <Image
                src={`/gallery/${i + 1}.jpg`}
                alt={`Gallery image ${i + 1}`}
                className="rounded-xl"
                width={800}
                height={360}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
