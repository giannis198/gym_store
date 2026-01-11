'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { PremiumButton } from '@/components/ui/premium-button'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } })

    tl.fromTo('.hero-bg-accent', 
      { scaleX: 0, transformOrigin: 'left' }, 
      { scaleX: 1, duration: 1.5 }
    )
    .from('.char', {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
    }, "-=0.8")
    .from(subtitleRef.current, {
      y: 30,
      opacity: 0,
    }, "-=0.6")
    .from(ctaRef.current, {
      y: 30,
      opacity: 0,
      scale: 0.9,
    }, "-=0.8")
  }, { scope: containerRef })

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden"
    >
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,#1a1a1a_0%,#050505_100%)]" />
      <div className="hero-bg-accent absolute top-0 left-0 w-full h-1 bg-neon-volt/20" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-neon-volt/5 blur-[120px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-neon-volt/5 blur-[120px] rounded-full" />

      <div className="max-w-5xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-7xl md:text-9xl font-black italic tracking-tighter leading-[0.8] mb-8 uppercase"
        >
          <div className="overflow-hidden inline-block">
            <span className="char inline-block">I</span>
            <span className="char inline-block">R</span>
            <span className="char inline-block">O</span>
            <span className="char inline-block">N</span>
          </div>
          <br />
          <div className="overflow-hidden inline-block text-neon-volt">
            <span className="char inline-block">&</span>
          </div>
          <br />
          <div className="overflow-hidden inline-block">
            <span className="char inline-block">G</span>
            <span className="char inline-block">L</span>
            <span className="char inline-block">O</span>
            <span className="char inline-block">V</span>
            <span className="char inline-block">E</span>
            <span className="char inline-block">S</span>
          </div>
        </h1>

        <p 
          ref={subtitleRef}
          className="text-lg md:text-2xl text-white/60 max-w-2xl mx-auto mb-12 font-medium tracking-tight"
        >
          Premium boxing training for those who value power, discipline, and elite-level athleticism.
        </p>

        <div ref={ctaRef}>
          <PremiumButton size="lg" className="px-12 py-8 text-xl">
            Explore Programs
          </PremiumButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
        <div className="w-px h-12 bg-white" />
      </div>
    </section>
  )
}
