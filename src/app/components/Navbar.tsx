"use client";

import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface NavbarProps {
  sections: React.RefObject<HTMLElement | null>[];
  linkColors: string[];
}

export default function Navbar({ sections, linkColors }: NavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    const links = Array.from(
      navRef.current.querySelectorAll<HTMLAnchorElement>(".nav-link")
    );

    const setActive = (index: number) => {
      gsap.to(navRef.current, { color: linkColors[index], duration: 0.3 });

      links.forEach((link, i) => {
        gsap.to(link, {
          opacity: i === index ? 1 : 1,
          borderBottomColor: i === index ? linkColors[index] : "transparent",
          duration: 0.25,
          overwrite: "auto",
        });
      });
    };

    sections.forEach((ref, i) => {
      if (!ref.current) return;

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(i - 1),
        onEnterBack: () => setActive(i - 1),
      });
    });

    // klik scroll
    links.forEach((link, i) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const smoother = ScrollSmoother.get();
        if (!smoother || !sections[i].current) return;

        smoother.scrollTo(sections[i].current, true, "top top");
      });
    });

    setActive(0); // inicijalno

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [sections]);

  return (
    <nav
      className="fixed top-0 left-0 z-[100] w-full flex justify-between items-center px-10 py-4 
  /* Glassmorphism klase */
  bg-black/5 
  backdrop-blur-md 
  border-b border-white/10 
  text-white"
    >
      {/* LOGO SEKCIJA */}
      <div className="flex-shrink-0">
        <Image
          src="/dr-savkovic-dental-logo.svg"
          alt="Dr Savkovic Logo"
          width={220} // Smanjeno sa 300 radi boljeg balansa sa visinom nav-a
          height={70}
          className="invert object-contain"
        />
      </div>

      {/* LINKOVI SEKCIJA */}
      <div
        ref={navRef}
        className="flex items-center gap-4 lg:gap-8 font-medium tracking-wide"
      >
        {["Početna", "About", "Services", "Gallery", "Contact"].map(
          (label, i) => (
            <a
              key={i}
              href={`#${label.toLowerCase()}`}
              className="nav-link relative px-2 py-1 uppercase text-[13px] tracking-wider font-semibold transition-colors hover:text-cyan-400 group"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
            </a>
          )
        )}
      </div>
    </nav>
  );
}
