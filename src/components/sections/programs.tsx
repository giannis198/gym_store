'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PremiumCard } from '@/components/ui/premium-card'
import { Zap, Target, Dumbbell, ArrowRight } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const programs = [
  {
    title: "Boxing Tech",
    description: "Master the sweet science. Focus on footwork, defensive maneuvers, and precision striking.",
    intensity: "Medium - High",
    icon: Target,
    color: "text-blue-400"
  },
  {
    title: "Boxfit",
    description: "High-octane conditioning. Burn 800+ calories in a session designed to push your limits.",
    intensity: "Ultra High",
    icon: Zap,
    color: "text-neon-volt"
  },
  {
    title: "Strength & Cond",
    description: "Build the engine behind the punch. Explosive power and functional athletic strength.",
    intensity: "High",
    icon: Dumbbell,
    color: "text-red-500"
  }
]

export function Programs() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Ensure all cards are initially hidden via GSAP to prevent flash of unstyled content
    gsap.set('.program-card', { y: 100, opacity: 0 })

    ScrollTrigger.batch('.program-card', {
      onEnter: (elements) => {
        gsap.to(elements, {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power4.out',
          overwrite: true
        })
      },
      onLeaveBack: (elements) => {
        gsap.to(elements, {
          y: 100,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.in'
        })
      },
      start: 'top 90%',
    })

    ScrollTrigger.refresh()
  }, { scope: sectionRef })

  return (
    <section 
      id="programs"
      ref={sectionRef}
      className="py-32 bg-matte-black relative"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-[0.4em] text-neon-volt font-bold">Training Tracks</h2>
            <h3 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
              CHOOSE YOUR <br /> <span className="text-white/20">WEAPON</span>
            </h3>
          </div>
          <p className="text-white/50 max-w-sm text-lg">
            Every session is a battle. Select the track that matches your goals and prepare to work.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <PremiumCard 
              key={index} 
              className="program-card group flex flex-col justify-between min-h-[400px] border-white/5 hover:border-neon-volt/30 transition-all duration-500"
            >
              <div className="space-y-8">
                <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center ${program.color} group-hover:scale-110 transition-transform duration-500`}>
                  <program.icon className="w-8 h-8" />
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-3xl font-black italic uppercase tracking-tight">{program.title}</h4>
                  <p className="text-white/60 leading-relaxed">
                    {program.description}
                  </p>
                </div>
              </div>

              <div className="pt-8 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-white/30">Intensity</span>
                  <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full bg-white/5 ${program.color}`}>
                    {program.intensity}
                  </span>
                </div>
                
                <button className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs group/btn">
                  Explore Track 
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </PremiumCard>
          ))}
        </div>
      </div>
    </section>
  )
}
