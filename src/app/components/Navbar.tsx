"use client";

import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface NavbarProps {
  sections: React.RefObject<HTMLElement | null>[];
  linkColors: string[];
}

export default function Navbar({ sections, linkColors }: NavbarProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ["Početna", "O nama", "Usluge", "Galerija", "Kontakt"];

  useEffect(() => {
    if (!navRef.current) return;

    const links = Array.from(
      navRef.current.querySelectorAll<HTMLAnchorElement>(".nav-link")
    );

    const setActive = (index: number) => {
      // Pomeramo index jer "Početna" odgovara sections[0]
      gsap.to(navRef.current, {
        color: linkColors[index] || "#fff",
        duration: 0.3,
      });
      links.forEach((link, i) => {
        gsap.to(link, {
          borderBottomColor:
            i === index ? linkColors[index] || "#22d3ee" : "transparent",
          duration: 0.25,
          overwrite: "auto",
        });
      });
    };

    // ScrollTrigger logika
    sections.forEach((ref, i) => {
      if (!ref.current) return;
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      });
    });

    setActive(0);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [sections, linkColors]);

  // Funkcija za skrolovanje (radi i za mobilni i za desktop)
  const handleScroll = (index: number) => {
    const smoother = ScrollSmoother.get();
    if (smoother && sections[index]?.current) {
      smoother.scrollTo(sections[index].current, true, "top top");
      setIsOpen(false); // Zatvori mobilni meni nakon klika
    }
  };

  // Animacija mobilnog menija
  useEffect(() => {
    if (isOpen) {
      gsap.to(mobileMenuRef.current, { x: 0, duration: 0.6, ease: "expo.out" });
      gsap.fromTo(
        ".mobile-link",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, delay: 0.2 }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.5,
        ease: "expo.in",
      });
    }
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 z-[100] w-full flex justify-between items-center px-6 md:px-10 py-4 bg-black/10 backdrop-blur-md border-b border-white/10 text-white">
        {/* LOGO */}
        <div
          className="flex-shrink-0 cursor-pointer"
          onClick={() => handleScroll(0)}
        >
          <Image
            src="/dr-savkovic-dental-logo.svg"
            alt="Dr Savkovic Logo"
            width={180}
            height={50}
            className="invert object-contain md:w-[220px]"
          />
        </div>

        {/* DESKTOP LINKOVI (Skriveni na mobilnom) */}
        <div
          ref={navRef}
          className="hidden md:flex items-center gap-6 lg:gap-8 font-medium"
        >
          {menuItems.map((label, i) => (
            <a
              key={i}
              href={`#${label.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                handleScroll(i);
              }}
              className="nav-link relative px-2 py-1 uppercase text-[13px] tracking-wider font-semibold transition-colors hover:text-cyan-400"
            >
              {label}
            </a>
          ))}
        </div>

        {/* HAMBURGER DUGME (Samo na mobilnom) */}
        <button
          className="md:hidden z-[110] p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`w-full h-[2px] bg-white transition-all ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-full h-[2px] bg-white transition-all ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-full h-[2px] bg-white transition-all ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* MOBILNI MENU OVERLAY */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-[105] bg-black/95 backdrop-blur-xl translate-x-full md:hidden flex flex-col items-center justify-center gap-8"
      >
        {menuItems.map((label, i) => (
          <button
            key={i}
            onClick={() => handleScroll(i)}
            className="mobile-link text-2xl uppercase tracking-[0.3em] font-light text-white hover:text-cyan-400"
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
}
