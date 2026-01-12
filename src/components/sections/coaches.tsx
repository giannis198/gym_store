'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Instagram, Twitter } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface CoachData {
  id: string
  name: string
  role: string
  bio: string
  image?: string
}

export function Coaches({ coaches = [] }: { coaches?: CoachData[] }) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Initial reveal for the section header
    gsap.from('.coaches-header', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power4.out'
    })

    // Image reveal animation
    gsap.set('.coach-image-wrapper', { scale: 1.2, filter: 'grayscale(100%)' })
    
    ScrollTrigger.batch('.coach-card', {
      onEnter: (elements) => {
        gsap.to(elements, {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: 'power4.out',
          overwrite: true
        })
        
        // Target the images inside the wrappers for a reveal effect
        elements.forEach((el) => {
          const img = el.querySelector('.coach-image-wrapper')
          gsap.to(img, {
            scale: 1,
            filter: 'grayscale(0%)',
            duration: 1.5,
            ease: 'power2.out',
            delay: 0.2
          })
        })
      },
      start: 'top 85%',
    })

    ScrollTrigger.refresh()
  }, { scope: sectionRef })

  return (
    <section 
      id="coaches"
      ref={sectionRef}
      className="py-32 bg-matte-black relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="coaches-header mb-20 text-center">
          <h2 className="text-xs uppercase tracking-[0.5em] text-neon-volt font-black mb-4">Elite Staff</h2>
          <h3 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter">
            THE <span className="text-white/10">ARCHITECTS</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {coaches.map((coach, index) => (
            <div key={index} className="coach-card opacity-0 translate-y-20 group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-8 bg-slate-grey/20 border border-white/5">
                <div 
                  className="coach-image-wrapper absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${coach.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex gap-4">
                    <Instagram className="w-5 h-5 text-white hover:text-neon-volt cursor-pointer transition-colors" />
                    <Twitter className="w-5 h-5 text-white hover:text-neon-volt cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-2xl font-black italic uppercase tracking-tight group-hover:text-neon-volt transition-colors duration-300">
                  {coach.name}
                </h4>
                <div className="text-xs uppercase tracking-widest text-white/40 font-bold">
                  {coach.role}
                </div>
                <p className="pt-4 text-white/60 leading-relaxed text-sm">
                  {coach.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
