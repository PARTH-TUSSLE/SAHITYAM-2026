"use client";
import { useState, useEffect } from "react";
import GateAnimation from "@/components/GateAnimation";
import Countdown from "@/components/Countdown";

interface HomeClientProps {
  children: React.ReactNode;
}

export default function HomeClient({ children }: HomeClientProps) {
  const [showGate, setShowGate] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const gateTimer = setTimeout(() => setShowGate(false), 3400);
    const contentTimer = setTimeout(() => setShowContent(true), 3400);
    return () => {
      clearTimeout(gateTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <>
      {showGate && <GateAnimation />}
      {showContent && children}
    </>
  );
}

export function CountdownWrapper() {
  return <Countdown />;
}
