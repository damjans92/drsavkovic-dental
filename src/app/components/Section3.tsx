"use client";

import { forwardRef, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Konzervativna stomatologija",
    slug: "https://drsavkovic.rs/terapijske-usluge/konzervativna-stomatologija",
  },
  {
    title: "Endodoncija",
    slug: "https://drsavkovic.rs/terapijske-usluge/endodoncija",
  },
  {
    title: "Protetska hirurgija",
    slug: "https://drsavkovic.rs/terapijske-usluge/protetska-hirurgija",
  },
  {
    title: "Izbeljivanje zuba",
    slug: "https://drsavkovic.rs/terapijske-usluge/izbeljivanje",
  },
  {
    title: "Opšti pregled",
    slug: "https://drsavkovic.rs/terapijske-usluge/pregled",
  },
  {
    title: "Terapija folijama",
    slug: "https://drsavkovic.rs/terapijske-usluge/terapija-folijama",
  },
];

const Section3 = forwardRef<HTMLDivElement, { title: string }>(
  ({ title }, ref) => {
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // 1. Force refresh ScrollTrigger-a jer se visina stranice menja zbog 3D modela
      ScrollTrigger.refresh();

      let ctx = gsap.context(() => {
        // 2. Proveravamo da li elementi postoje pre animacije
        const items = gsap.utils.toArray(".service-item");

        if (items.length > 0) {
          gsap.fromTo(
            items,
            { x: -50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: listRef.current,
                start: "top 90%", // Čim uđe u vidokrug
                onEnter: () => console.log("Section 3 animacija počela"), // Debug u konzoli
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
            <div className="space-y-4">
              <h2 className="text-[10px] tracking-[0.5em] uppercase text-cyan-400 font-bold">
                Ekspertiza
              </h2>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-[0.9]">
                {title}
              </h1>
            </div>

            {/* LISTA KOJA JE INICIJALNO VIDLJIVA (za svaki slučaj) */}
            <div
              ref={listRef}
              className="flex flex-col border-t border-white/10"
            >
              {services.map((service, i) => (
                <a
                  key={i}
                  href={service.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-item group flex items-center justify-between py-6 border-b border-white/10 hover:px-4 transition-all duration-500 cursor-pointer"
                  style={{ opacity: 0 }} // GSAP će ovo promeniti na 1
                >
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] font-mono opacity-20 group-hover:opacity-100 group-hover:text-cyan-400 transition-all">
                      0{i + 1}
                    </span>
                    <h3 className="text-xl md:text-3xl font-light tracking-tight group-hover:tracking-widest transition-all duration-700 uppercase">
                      {service.title}
                    </h3>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <ArrowUpRight className="text-cyan-400 w-8 h-8" />
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-5" />
        </div>
      </section>
    );
  }
);

Section3.displayName = "Section3";
export default Section3;
