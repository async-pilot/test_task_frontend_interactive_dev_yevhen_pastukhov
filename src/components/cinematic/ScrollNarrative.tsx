"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import DepthScene from "./scenes/DepthScene";
import HeroScene from "./scenes/HeroScene";
import ImmersiveBackground from "./scenes/ImmersiveBackground";
import IndicatorScene from "./scenes/IndicatorScene";
import ResolveScene from "./scenes/ResolveScene";

export default function ScrollNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scene1Ref = useRef<HTMLDivElement>(null);
  const scene2Ref = useRef<HTMLDivElement>(null);

  const scrollProgress = useRef(0);

  const depthMidRef = useRef<HTMLDivElement>(null);
  const depthFrontRef = useRef<HTMLDivElement>(null);
  const depthTitleRef = useRef<HTMLHeadingElement>(null);

  const scene3Ref = useRef<HTMLDivElement>(null);

  const listRef = useRef<HTMLUListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);

  const scene4Ref = useRef<HTMLDivElement>(null);
  const resolveWrapperRef = useRef<HTMLDivElement>(null);

  const tiltEnabled = useRef(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5000",
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            scrollProgress.current = self.progress;
          },
        },
      });

      tl.addLabel("scene1", 0);
      tl.addLabel("scene2", 1);

      tl.addLabel("depthMid", 1.6);
      tl.addLabel("depthEnd", 2.2);

      tl.addLabel("scene3", 2.5);
      tl.addLabel("scene3End", 4.2);

      tl.addLabel("scene4", 4.5);
      tl.addLabel("scene4End", 5);

      tl.set(scene1Ref.current, { opacity: 1 }, "scene1");
      tl.set(scene2Ref.current, { opacity: 0 });

      tl.call(
        () => {
          tiltEnabled.current = false;
        },
        [],
        "scene1+=0.1"
      );

      tl.to(scene1Ref.current, { opacity: 0 }, "scene2");
      tl.to(scene2Ref.current, { opacity: 1 }, "scene2");

      tl.to(scene2Ref.current, { opacity: 0 }, "scene3");
      tl.to(scene3Ref.current, { opacity: 1 }, "scene3");

      const listItems = listRef.current ? Array.from(listRef.current.querySelectorAll("li")) : [];
      const slides = slidesRef.current;
      const total = listItems.length;

      if (total > 0 && fillRef.current) {
        gsap.set(listItems, { color: "rgba(255,255,255,0.6)" });
        gsap.set(slides, { autoAlpha: 0 });

        gsap.set(listItems[0], { color: "#10b981" });
        gsap.set(slides[0], { autoAlpha: 1 });

        gsap.set(fillRef.current, {
          scaleY: 1 / total,
          transformOrigin: "top left",
        });

        const scene3Start = tl.labels.scene3 as number;
        const scene3End = tl.labels.scene3End as number;
        const scene3Len = scene3End - scene3Start;

        tl.to(
          fillRef.current,
          {
            scaleY: 1,
            ease: "none",
            duration: scene3Len,
          },
          "scene3"
        );

        let activeIndex = 0;

        const setActive = (idx: number) => {
          if (idx === activeIndex) return;

          const prev = activeIndex;
          activeIndex = idx;

          gsap.to(listItems[idx], { color: "#10b981", duration: 0.2, overwrite: "auto" });
          gsap.to(listItems[prev], { color: "rgba(255,255,255,0.6)", duration: 0.2, overwrite: "auto" });

          if (slides[idx]) gsap.to(slides[idx], { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
          if (slides[prev]) gsap.to(slides[prev], { autoAlpha: 0, duration: 0.2, overwrite: "auto" });
        };

        tl.to(
          {},
          {
            duration: scene3Len,
            ease: "none",
            onUpdate: () => {
              const t = tl.time();
              const local = gsap.utils.clamp(0, 1, (t - scene3Start) / scene3Len);

              const idx = Math.min(total - 1, Math.floor(local * total));

              setActive(idx);
            },
          },
          "scene3"
        );
      }

      tl.fromTo(depthMidRef.current, { scale: 0.8, y: 200 }, { scale: 1.3, y: -200, ease: "none" }, "scene2");

      tl.fromTo(depthFrontRef.current, { scale: 0.6, y: 400 }, { scale: 1.6, y: -400, ease: "none" }, "scene2");

      tl.fromTo(depthTitleRef.current, { opacity: 0, y: 100 }, { opacity: 1, y: 0 }, "depthMid");

      tl.fromTo(
        resolveWrapperRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, ease: "power3.out" },
        "scene4+=0.2"
      );

      tl.to(resolveWrapperRef.current, { scale: 1.15, ease: "none" }, "scene4End");

      tl.to(depthTitleRef.current, { opacity: 0, scale: 1.3 }, "depthEnd");

      tl.to(scene3Ref.current, { opacity: 0 }, "scene3End");
      tl.to(scene4Ref.current, { opacity: 1 }, "scene4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden perspective-[1400px] transform-3d">
      <ImmersiveBackground scrollProgressRef={scrollProgress} />
      <div ref={scene1Ref} className="absolute inset-0 opacity-0">
        <HeroScene />
      </div>

      <div ref={scene2Ref} className="absolute inset-0 opacity-0">
        <DepthScene midRef={depthMidRef} frontRef={depthFrontRef} titleRef={depthTitleRef} />
      </div>

      <div ref={scene3Ref} className="absolute inset-0 opacity-0">
        <IndicatorScene listRef={listRef} fillRef={fillRef} slidesRef={slidesRef} />
      </div>

      <div ref={scene4Ref} className="absolute inset-0 opacity-0">
        <ResolveScene wrapperRef={resolveWrapperRef} />
      </div>
    </section>
  );
}
