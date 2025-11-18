"use client";

import Image from "next/image";
import { useState } from "react";
import GateAnimation from "./components/GateAnimation";

export default function Home() {
  const [showGate, setShowGate] = useState(true);

  return (
    <>
      {showGate && <GateAnimation onComplete={() => setShowGate(false)} />}
      
    </>
  );
}
