"use client";

import { useRef } from "react";
import Overlay from "./components/Overlay";
import CanvasScene from "./components/CanvasScene";
import ScrollProvider from "./components/ScrollProvider";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Section5 from "./components/Section5";

const linkColors = ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"];
const sectionGradients = [
  "linear-gradient(-135deg, #C2D1D8 0%, #3D6C82 100%)",
  "linear-gradient(-135deg, #D0EFF7 0%, #2A6B80 100%)",
  "linear-gradient(-135deg, #9CC1D0 0%, #354D60 100%)",
  "linear-gradient(-135deg, #E7F0F8 0%, #4A7499 100%)",
  "linear-gradient(-135deg, #E0F0F8 0%, #3D7140 100%)",
];

export default function Home() {
  const section1Ref = useRef<HTMLDivElement | null>(null);
  const section2Ref = useRef<HTMLDivElement | null>(null);
  const section3Ref = useRef<HTMLDivElement | null>(null);
  const section4Ref = useRef<HTMLDivElement | null>(null);
  const section5Ref = useRef<HTMLDivElement | null>(null);

  const sections = [
    section1Ref,
    section2Ref,
    section3Ref,
    section4Ref,
    section5Ref,
  ];

  return (
    <>
      <ScrollProvider />
      {/* Sloj 100: Navigacija */}
      <Navbar sections={sections} linkColors={linkColors} />

      {/* Sloj -10: Gradijenti */}
      <Overlay sections={sections} sectionGradients={sectionGradients} />

      {/* Sloj -5: 3D Model */}
      <CanvasScene />

      {/* Sloj 10: Skrolujuće sekcije */}
      <div id="smooth-wrapper" className="relative z-10 w-full overflow-hidden">
        <div id="smooth-content" className="relative w-full">
          <HeroSection ref={section1Ref} lastSectionRef={section5Ref} />
          <Section2 ref={section2Ref} title="DENTAL FABRICATION" />
          <Section3 ref={section3Ref} title="3D Dental Solutions" />
          <Section4 ref={section4Ref} title="Galerija Radova" />
          <Section5 ref={section5Ref} title="Contact" />
        </div>
      </div>
    </>
  );
}
