"use client";
import gsap from "gsap";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react"; // Koristi useGSAP hook, instaliraj ga: npm install @gsap/react
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

interface NavbarProps {
  sections: React.RefObject<HTMLElement | null>[];
  linkColors: string[];
}

const Navbar = ({ linkColors }: NavbarProps) => {
  const handleScrollTo = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    const smoother = ScrollSmoother.get();
    const target = document.getElementById(`section-${index + 1}`);
    if (smoother && target) {
      smoother.scrollTo(target, true, "top top");
    }
  };
  return (
    <nav
      id="main-navbar"
      className="fixed top-0 left-0 w-full z-[100] p-6 md:p-8 flex justify-between items-center transition-none text-white border-b border-transparent"
    >
      <div className="logo text-xl font-extrabold uppercase tracking-widest text-inherit">
        DR. OSMAN
      </div>

      <div className="flex space-x-6 md:space-x-10">
        <a
          href="#section-1"
          onClick={(e) => handleScrollTo(e, 0)}
          className="nav-link uppercase px-3 py-2 font-medium text-sm md:text-base tracking-wider hover:text-[#00BFFF]   text-inherit"
        >
          Home
        </a>
        <a
          href="#section-2"
          onClick={(e) => handleScrollTo(e, 1)}
          className="nav-link uppercase px-3 py-2 font-medium text-sm md:text-base tracking-wider hover:text-[#00BFFF]   text-inherit"
        >
          Usluge
        </a>
        <a
          href="#section-3"
          onClick={(e) => handleScrollTo(e, 2)}
          className="nav-link uppercase px-3 py-2 font-medium text-sm md:text-base tracking-wider hover:text-[#00BFFF]   text-inherit"
        >
          Tim
        </a>
        <a
          href="#section-4"
          onClick={(e) => handleScrollTo(e, 3)}
          className="nav-link uppercase px-3 py-2 font-medium text-sm md:text-base tracking-wider hover:text-[#00BFFF]   text-inherit"
        >
          Tehnologija
        </a>
        <a
          href="#section-5"
          onClick={(e) => handleScrollTo(e, 4)}
          className="nav-link uppercase px-3 py-2 font-medium text-sm md:text-base tracking-wider hover:text-[#00BFFF]   text-inherit"
        >
          Kontakt
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
