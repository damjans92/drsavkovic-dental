"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface OverlayProps {
  sections: React.RefObject<HTMLElement | null>[];
  sectionGradients: string[];
}

export default function Overlay({ sections, sectionGradients }: OverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Pomoćne funkcije za gradijent
    const ensureHash = (color: string): string => {
      color = color.trim();
      if (
        color.startsWith("#") ||
        color.startsWith("rgb") ||
        color.startsWith("hsl")
      )
        return color;
      return `#${color}`;
    };

    const getColorsFromGradient = (grad: string): [string, string] => {
      const matches = grad.match(/#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/g);
      if (matches && matches.length >= 2) return [matches[0], matches[1]];
      return ["#ff0f7b", "#1980ff"];
    };

    // Inicijalni setup
    gsap.set(overlay, { backgroundImage: sectionGradients[0] });

    // 2. Glavna petlja kroz sekcije
    sections.forEach((ref, i) => {
      const section = ref.current;
      if (!section) return;

      const currentGradient = sectionGradients[i];
      const nextGradient = sectionGradients[i + 1] || currentGradient;
      const [currStart, currEnd] = getColorsFromGradient(currentGradient);
      const [nextStart, nextEnd] = getColorsFromGradient(nextGradient);

      // --- TRIGER ZA PRELAZ GRADUIJENTA (onUpdate) ---
      ScrollTrigger.create({
        trigger: section,
        start: i === 0 ? "top top" : "bottom bottom", // HERO sekcija start top top
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const blendedStart = gsap.utils.interpolate(
            currStart,
            nextStart,
            progress
          );
          const blendedEnd = gsap.utils.interpolate(currEnd, nextEnd, progress);
          const safeStart = ensureHash(blendedStart);
          const safeEnd = ensureHash(blendedEnd);
          gsap.set(overlay, {
            backgroundImage: `linear-gradient(-135deg, ${safeStart} 0%, ${safeEnd} 100%)`,
          });
        },
      });
    });

    // Osiguraj da se pozicije preračunaju nakon što se sve učita
    window.addEventListener("load", () => ScrollTrigger.refresh());
    setTimeout(() => ScrollTrigger.refresh(), 1000);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [sections, sectionGradients]);

  return (
    <div ref={overlayRef} className="fixed inset-0 -z-10 pointer-events-none" />
  );
}
