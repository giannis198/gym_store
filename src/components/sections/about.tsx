"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // useGSAP(() => {
  //   const mm = gsap.matchMedia()

  //   mm.add({
  //     isDesktop: "(min-width: 768px)",
  //     isMobile: "(max-width: 767px)"
  //   }, (context) => {
  //     const isDesktop = context.conditions?.isDesktop as boolean

  //     // Initial state
  //     gsap.set('.about-reveal', { y: 100, opacity: 0 })

  //     gsap.to('.about-reveal', {
  //       scrollTrigger: {
  //         trigger: sectionRef.current,
  //         start: 'top 90%',
  //         toggleActions: 'play none none reverse',
  //       },
  //       y: 0,
  //       opacity: 1,
  //       stagger: 0.2,
  //       duration: 1.2,
  //       ease: 'power4.out',
  //     })

  //     // Parallax effect for the background text
  //     gsap.to('.about-bg-text', {
  //       scrollTrigger: {
  //         trigger: sectionRef.current,
  //         start: 'top bottom',
  //         end: 'bottom top',
  //         scrub: 1,
  //       },
  //       x: isDesktop ? -200 : -100,
  //       ease: 'none',
  //     })

  //     ScrollTrigger.refresh()

  //     return () => mm.revert()
  //   })
  // }, { scope: sectionRef })

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isDesktop } = context.conditions!;
          const q = context.selector;

          if (!q) return;

          gsap.fromTo(
            q(".about-reveal"),
            { y: 100, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.2,
              duration: 1.2,
              ease: "power4.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );

          gsap.to(q(".about-bg-text"), {
            x: isDesktop ? -200 : -100,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-matte-black"
    >
      {/* Texture Overlays */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      {/* Background Kinetic Typography */}
      <div className="about-bg-text absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap text-[20vw] font-black italic opacity-[0.02] pointer-events-none select-none uppercase">
        DISCIPLINE POWER RESILIENCE DISCIPLINE POWER RESILIENCE
      </div>

      {/* Decorative SVG Pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.05] pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div ref={textRef} className="space-y-8 text-left">
            <h2 className="about-reveal text-5xl md:text-7xl font-black italic uppercase leading-none tracking-tighter">
              DISCIPLINE <br />
              <span className="text-neon-volt">POWER</span> <br />
              RESILIENCE
            </h2>

            <div className="about-reveal space-y-6 text-white/70 text-lg md:text-xl font-medium max-w-xl">
              <p>
                IRON &amp; GLOVES isn&apos;t just a gym. It&apos;s a proving
                ground for those who refuse to settle for average. Our
                methodology blends elite boxing technique with high-intensity
                athletic conditioning.
              </p>
              <p>
                We believe in the transformative power of the sweet science.
                Whether you&apos;re stepping into the ring for the first time or
                looking to sharpen your edge, we provide the environment, the
                expertise, and the community to help you conquer your limits.
              </p>
            </div>

            <div className="about-reveal pt-4">
              <div className="flex gap-12">
                <div>
                  <div className="text-4xl font-black italic text-white">
                    500+
                  </div>
                  <div className="text-xs uppercase tracking-widest text-white/40">
                    Active Members
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-black italic text-white">
                    12
                  </div>
                  <div className="text-xs uppercase tracking-widest text-white/40">
                    Elite Coaches
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-black italic text-white">
                    20+
                  </div>
                  <div className="text-xs uppercase tracking-widest text-white/40">
                    Weekly Classes
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="about-reveal relative h-[500px] md:h-[700px] bg-slate-grey/20 border border-white/5 rounded-2xl overflow-hidden group">
            {/* Placeholder for the abstract image task */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-125 mix-blend-luminosity opacity-50 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8">
              <div className="text-xs uppercase tracking-[0.3em] text-neon-volt mb-2">
                The Sanctuary
              </div>
              <div className="text-2xl font-black italic uppercase">
                The Proving Ground
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
