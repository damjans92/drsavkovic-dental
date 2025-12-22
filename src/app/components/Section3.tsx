"use client";

import { forwardRef, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    title: "Dental Models & Study Casts",
    slug: "#",
  },
  {
    title: "Surgical Guides",
    slug: "#",
  },
  {
    title: "Temporary Crowns & Bridges",
    slug: "#",
  },
  {
    title: "Aligner Models",
    slug: "#",
  },
  {
    title: "Digital Wax-Up",
    slug: "#",
  },
  {
    title: "Gingiva Masks & Soft Tissue",
    slug: "#",
  },
];

const Section3 = forwardRef<HTMLDivElement, { title: string }>(
  ({ title }, ref) => {
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      ScrollTrigger.refresh();

      const ctx = gsap.context(() => {
        const items = gsap.utils.toArray(".service-item");

        if (items.length) {
          gsap.fromTo(
            items,
            { x: -50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              stagger: 0.12,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: listRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }, listRef);

      return () => ctx.revert();
    }, []);

    return (
      <section
        ref={ref}
        className="min-h-screen flex items-center justify-start text-white px-8 md:px-20 py-24 relative"
      >
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 xl:col-span-6 space-y-12">
            {/* HEADLINE */}
            <div className="space-y-4">
              <h2 className="text-[10px] tracking-[0.5em] uppercase text-cyan-400 font-bold">
                Production
              </h2>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-[0.9]">
                {title || "Production Capabilities"}
              </h1>
            </div>

            {/* LISTA */}
            <div
              ref={listRef}
              className="flex flex-col border-t border-white/10"
            >
              {capabilities.map((item, i) => (
                <div
                  key={i}
                  className="service-item group flex items-center justify-between py-6 border-b border-white/10 hover:px-4 transition-all duration-500 cursor-default"
                  style={{ opacity: 0 }}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] font-mono opacity-20 group-hover:opacity-100 group-hover:text-cyan-400 transition-all">
                      0{i + 1}
                    </span>
                    <h3 className="text-xl md:text-3xl font-light tracking-tight group-hover:tracking-widest transition-all duration-700 uppercase">
                      {item.title}
                    </h3>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <ArrowUpRight className="text-cyan-400 w-7 h-7" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DESNA STRANA OSTAVLJENA ZA 3D ZUB / CANVAS */}
          <div className="hidden lg:block lg:col-span-5" />
        </div>
      </section>
    );
  }
);

Section3.displayName = "Section3";
export default Section3;
