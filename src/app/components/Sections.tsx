"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Sections = () => {
  return (
    <div className="relative w-full">
      {/* <div
        className="fixed inset-0 -z-10 w-full h-full"
        style={{
          background:
            "linear-gradient(135deg, var(--color-start, #ff0000), var(--color-end, #00ff00))",
          willChange: "background",
          contain: "paint",
        }}
      /> */}

      <div className="relative z-10">
        <section
          id="section-1"
          className="h-screen flex items-center justify-center"
        >
          <h1 className="text-6xl font-light">
            Dr Savković <span className="font-bold">Dental</span>
          </h1>
        </section>

        <section
          id="section-2"
          className="h-screen flex items-center justify-center"
        >
          <div className="max-w-2xl p-12 bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 hover:-translate-y-2 transition-transform duration-500 shadow-2xl">
            <h2 className="text-4xl font-semibold">Savremena estetika</h2>
            <p className="mt-4 text-lg opacity-80 font-light">
              Vaš osmeh zaslužuje najmoderniji pristup stomatologiji.
            </p>
          </div>
        </section>

        <section
          id="section-3"
          className="h-screen flex items-center justify-center"
        >
          <h2 className="text-4xl font-semibold">Implantologija</h2>
        </section>

        <section
          id="section-4"
          className="h-screen flex items-center justify-center"
        >
          <h2 className="text-4xl font-semibold">Protetika</h2>
        </section>

        <section
          id="section-5"
          className="h-screen flex items-center justify-center"
        >
          <h2 className="text-4xl font-semibold">Zakažite termin</h2>
        </section>
      </div>
    </div>
  );
};

export default Sections;
