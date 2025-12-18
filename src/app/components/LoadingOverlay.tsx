"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function LoadingOverlay() {
  const { progress } = useProgress(); // progres ucitavanja GLB modela
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (progress >= 100) {
      // kada se ucita, fade-out overlay
      gsap.to(".loading-overlay", {
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        onComplete: () => setVisible(false),
      });
    }
  }, [progress]);

  if (!visible) return null;

  return (
    <div
      className="loading-overlay fixed inset-0 flex items-center justify-center bg-black z-[9999]"
      style={{ opacity: 1 }}
    >
      <div className="text-white text-2xl font-semibold">
        Učitavanje... {Math.round(progress)}%
      </div>
    </div>
  );
}
