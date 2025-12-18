"use client";

import { forwardRef, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Section4 = forwardRef<HTMLDivElement, { title: string }>(
  ({ title }, ref) => {
    const galleryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      let ctx = gsap.context(() => {
        gsap.from(".gallery-card", {
          y: 60,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 75%",
          },
        });
      }, galleryRef);

      return () => ctx.revert();
    }, []);

    return (
      <section
        ref={ref}
        className="min-h-screen flex items-center justify-start text-white px-8 md:px-20 py-24"
      >
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEVA STRANA: TEXT */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <h2 className="text-[10px] tracking-[0.5em] uppercase text-cyan-400 font-bold">
                Rezultati
              </h2>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-[0.9]">
                {title}
              </h1>
            </div>
            <p className="text-lg opacity-60 font-light leading-relaxed max-w-sm">
              Spoj biologije i digitalne tehnologije. Pogledajte transformacije
              koje vraćaju samopouzdanje.
            </p>

            <a
              href="https://drsavkovic.rs/galerija"
              target="_blank"
              className="inline-flex items-center gap-4 group text-xs uppercase tracking-[0.3em] font-bold border-b border-white/20 pb-2 hover:border-cyan-400 transition-all"
            >
              Pogledaj celu galeriju{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-2 transition-transform"
              />
            </a>
          </div>

          {/* DESNA STRANA: PLACEHOLDER GALERIJA */}
          <div
            ref={galleryRef}
            className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Kartica 1 */}
            <div className="gallery-card relative aspect-square bg-white/5 rounded-2xl overflow-hidden group border border-white/10">
              <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest opacity-20 group-hover:opacity-90 transition-opacity">
                <Image
                  src="/fasete-pre-posle.png"
                  alt="Pre / Posle - Primer 1"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Kad budeš imao slike, samo koristi <Image fill /> ovde */}
              <div className="absolute bottom-6 left-6">
                <span className="text-[10px] bg-cyan-500 text-black px-3 py-1 font-bold uppercase rounded-full">
                  Fasete
                </span>
              </div>
            </div>

            {/* Kartica 2 */}
            <div className="gallery-card relative aspect-square bg-white/5 rounded-2xl overflow-hidden group border border-white/10 md:translate-y-12">
              <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest opacity-20 group-hover:opacity-90 transition-opacity">
                <Image
                  src="/protetika-pre-posle.png"
                  alt="Pre / Posle - Primer 2"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-6 left-6">
                <span className="text-[10px] bg-cyan-500 text-black px-3 py-1 font-bold uppercase rounded-full">
                  Implantologija
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

Section4.displayName = "Section4";
export default Section4;
