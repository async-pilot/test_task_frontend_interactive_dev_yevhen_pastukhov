"use client";

import { useState } from "react";

import IntroLoader from "@/components/cinematic/scenes/IntroStage/IntroLoader";
import ScrollNarrative from "@/components/cinematic/ScrollNarrative";

export default function Page() {
  const [ready, setReady] = useState(false);

  return (
    <>
      {!ready && <IntroLoader onComplete={() => setReady(true)} />}
      <ScrollNarrative />
    </>
  );
}
