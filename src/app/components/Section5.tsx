"use client";

import { forwardRef, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Section5 = forwardRef<HTMLDivElement, { title: string }>(
  ({ title }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      let ctx = gsap.context(() => {
        gsap.from(".contact-card", {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        });
      }, containerRef);

      return () => ctx.revert();
    }, []);

    return (
      <section
        ref={ref}
        id="kontakt"
        className="min-h-screen flex items-center justify-start text-white px-8 md:px-20 py-24 relative"
      >
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* LEVA STRANA: GLAVNI INFO */}
          <div className="lg:col-span-6 space-y-12" ref={containerRef}>
            <div className="space-y-4">
              <h2 className="text-[10px] tracking-[0.5em] uppercase text-cyan-400 font-bold">
                Kontakt
              </h2>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-[0.9]">
                {title}
              </h1>
            </div>

            {/* GRID SA KONTAKT KARTICAMA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Lokacija */}
              <div className="contact-card group space-y-3">
                <div className="flex items-center gap-3 text-cyan-400">
                  <MapPin size={18} />
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    Adresa
                  </span>
                </div>
                <p className="text-xl font-light opacity-80 group-hover:opacity-100 transition-opacity">
                  Kneza Miloša 42,
                  <br /> 11000 Beograd
                </p>
              </div>

              {/* Telefon */}
              <div className="contact-card group space-y-3">
                <div className="flex items-center gap-3 text-cyan-400">
                  <Phone size={18} />
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    Pozovite nas
                  </span>
                </div>
                <a
                  href="tel:+381640000000"
                  className="block text-xl font-light opacity-80 hover:text-cyan-400 transition-all"
                >
                  +381 64 555 44 33
                </a>
              </div>

              {/* Email */}
              <div className="contact-card group space-y-3">
                <div className="flex items-center gap-3 text-cyan-400">
                  <Mail size={18} />
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    Email
                  </span>
                </div>
                <a
                  href="mailto:info@drsavkovic.rs"
                  className="block text-xl font-light opacity-80 hover:text-cyan-400 transition-all lowercase"
                >
                  info@drsavkovic.rs
                </a>
              </div>

              {/* Radno vreme */}
              <div className="contact-card group space-y-3">
                <div className="flex items-center gap-3 text-cyan-400">
                  <Clock size={18} />
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    Radno Vreme
                  </span>
                </div>
                <p className="text-xl font-light opacity-80">
                  Pon — Pet: 10:00 - 20:00
                  <br />
                  <span className="text-sm opacity-50">
                    Subota — Nedelja: Zatvoreno
                  </span>
                </p>
              </div>
            </div>

            {/* Social Link suptilan */}
            <div className="contact-card pt-8 border-t border-white/10 flex items-center gap-6">
              <a
                href="#"
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest opacity-50 hover:opacity-100 hover:text-cyan-400 transition-all"
              >
                <Instagram size={16} /> Instagram
              </a>
              <span className="text-[10px] opacity-20 uppercase tracking-widest italic">
                Pravimo Vrednost © 2025
              </span>
            </div>
          </div>

          {/* DESNA STRANA: Ovde zub može da bude veći i centralizovaniji u Canvasu */}
          <div className="hidden lg:block lg:col-span-6" />
        </div>
      </section>
    );
  }
);

Section5.displayName = "Section5";
export default Section5;
