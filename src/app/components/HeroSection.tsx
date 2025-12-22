"use client";

import { forwardRef, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";

interface HeroSectionProps {
  lastSectionRef: React.RefObject<HTMLElement | null>;
}

const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ lastSectionRef }, ref) => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLButtonElement>(null);
    const scrollLineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      if (!ref || !("current" in ref) || !ref.current) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "power4.out", duration: 1.2 },
        });

        tl.from(titleRef.current, {
          y: 100,
          opacity: 0,
          skewY: 7,
          stagger: 0.2,
        })
          .from(
            textRef.current,
            {
              y: 30,
              opacity: 0,
            },
            "-=0.8"
          )
          .from(
            ctaRef.current,
            {
              scale: 0.8,
              opacity: 0,
            },
            "-=0.6"
          );

        gsap.to(scrollLineRef.current, {
          yPercent: 100,
          duration: 1.5,
          repeat: -1,
          ease: "sine.inOut",
        });

        gsap.to(titleRef.current, {
          yPercent: -20,
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            scrub: true,
          },
        });
      }, ref);

      return () => ctx.revert();
    }, [ref]);

    const handleCTAClick = () => {
      const smoother = ScrollSmoother.get();
      if (!smoother || !lastSectionRef.current) return;
      smoother.scrollTo(lastSectionRef.current, true, "top");
    };

    return (
      <section
        ref={ref}
        className="min-h-screen flex items-center justify-start text-white px-8 md:px-20 relative overflow-hidden"
      >
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 xl:col-span-5 space-y-8 z-10">
            <div className="space-y-2">
              {/* EYEBROW */}
              <h2 className="text-[10px] tracking-[0.5em] uppercase text-cyan-400 font-bold">
                Digital Dentistry • 3D Printing
              </h2>

              {/* MAIN TITLE */}
              <div className="overflow-hidden">
                <h1
                  ref={titleRef}
                  className="text-6xl md:text-8xl font-black leading-[0.85] uppercase tracking-tighter italic"
                >
                  DENTAL <br />
                  <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(0,255,255,0.3)] text-5xl md:text-7xl">
                    3D PRINT
                  </span>
                </h1>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p
              ref={textRef}
              className="text-lg md:text-xl opacity-70 font-light max-w-md leading-relaxed"
            >
              High-precision 3D printing solutions for dental laboratories and
              clinics. Crowns, surgical guides, models and aligners — optimized
              for speed, accuracy and repeatability.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mt-10">
              <button
                ref={ctaRef}
                onClick={handleCTAClick}
                className="group relative px-10 py-4 bg-cyan-500 text-black font-bold rounded-sm 
                 overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_#00ffff]"
              >
                <span className="relative z-10 uppercase tracking-widest text-xs">
                  Explore workflow
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              <div className="flex items-center gap-4 px-2 opacity-50">
                <div className="w-8 h-[1px] bg-white"></div>
                <span className="text-[10px] uppercase tracking-widest text-white italic">
                  CAD / CAM • Resin • Precision
                </span>
              </div>
            </div>
          </div>

          {/* PRAZNO – ZA 3D ZUB / ŠTAMPU */}
          <div className="hidden lg:block lg:col-span-6" />
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] uppercase tracking-[0.4em] font-light italic">
            Scroll
          </span>
          <div className="w-[2px] h-12 bg-white/100 relative overflow-hidden">
            <div
              ref={scrollLineRef}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent -translate-y-full"
            />
          </div>
        </div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";
export default HeroSection;
