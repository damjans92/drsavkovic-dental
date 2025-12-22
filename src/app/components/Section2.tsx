"use client";

import { forwardRef, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface SectionProps {
  title: string;
}

const Section2 = forwardRef<HTMLDivElement, SectionProps>(({ title }, ref) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    const img = imageRef.current;
    if (!el || !img) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".animate-item"), {
        x: -50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
        },
      });

      gsap.from(img, {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: img,
          start: "top 80%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center text-white px-8 md:px-20 py-20 relative"
    >
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* LEVO: TEKST */}
        <div ref={contentRef} className="lg:col-span-7 space-y-8 z-10">
          <div className="overflow-hidden">
            <h2 className="animate-item text-[10px] tracking-[0.5em] uppercase text-cyan-400 font-bold mb-4">
              About the workflow
            </h2>
            <h1 className="animate-item text-5xl md:text-7xl font-black leading-none uppercase tracking-tighter italic">
              {title}
            </h1>
          </div>

          <div className="animate-item space-y-6 text-lg md:text-xl font-light leading-relaxed opacity-80">
            <p className="text-2xl md:text-3xl font-normal text-white leading-snug border-l-4 border-cyan-500 pl-6 py-2">
              A fully digital dental 3D printing pipeline — from CAD design to
              micron-level physical accuracy.
            </p>

            <p>
              Our workflow is built around precision, consistency and speed.
              Using industry-standard CAD/CAM software and calibrated resin
              profiles, we produce dental models, surgical guides, temporary
              crowns and aligners with predictable results.
            </p>

            <p className="hidden md:block">
              Every print is optimized for dimensional accuracy, surface finish
              and material performance. This allows dental laboratories and
              clinics to reduce turnaround time while maintaining strict
              clinical tolerances.
            </p>
          </div>
        </div>

        {/* DESNO: VIZUAL / PRINTER */}
        <div ref={imageRef} className="lg:col-span-5 relative group">
          <div className="absolute -inset-4 border border-cyan-500/20 rounded-2xl translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />

          <div className="relative overflow-hidden rounded-2xl aspect-[4/5] shadow-2xl">
            <Image
              src="/about-photo.jpg"
              alt="Dental 3D Printing Workflow"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          <div className="absolute bottom-6 -left-6 bg-cyan-500 text-black px-6 py-3 font-bold uppercase tracking-widest text-xs rounded-sm shadow-xl">
            CAD → PRINT → FINISH
          </div>
        </div>
      </div>
    </section>
  );
});

Section2.displayName = "Section2";
export default Section2;
