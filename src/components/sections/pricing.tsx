'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PremiumCard } from '@/components/ui/premium-card'
import { PremiumButton } from '@/components/ui/premium-button'
import { Check } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const tiers = [
  {
    name: "Basic",
    price: "49",
    features: ["2 Classes Per Week", "Locker Room Access", "Basic Equipment Hire", "Community Events"],
    recommended: false
  },
  {
    name: "Pro",
    price: "89",
    features: ["Unlimited Classes", "Open Gym Access", "1 Personal Training / Mo", "Nutrition Workshop"],
    recommended: true
  },
  {
    name: "Elite",
    price: "149",
    features: ["Unlimited Everything", "Private Recovery Suite", "4 Personal Training / Mo", "Custom Fight Gear Kit"],
    recommended: false
  }
]

export function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.set('.pricing-card', { y: 100, opacity: 0 })

    ScrollTrigger.batch('.pricing-card', {
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
      start: 'top 85%',
    })

    ScrollTrigger.refresh()
  }, { scope: sectionRef })

  return (
    <section 
      id="pricing"
      ref={sectionRef}
      className="py-32 bg-matte-black relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-xs uppercase tracking-[0.5em] text-neon-volt font-black mb-4">Membership</h2>
          <h3 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter">
            JOIN THE <span className="text-white/10">TRIBE</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <PremiumCard 
              key={index} 
              className={`pricing-card relative flex flex-col justify-between border-white/5 transition-all duration-500 ${tier.recommended ? 'border-neon-volt/30 scale-105 z-10' : ''}`}
            >
              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neon-volt text-matte-black text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1 rounded-full whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <div className="space-y-8">
                <div className="text-center">
                  <h4 className="text-2xl font-black italic uppercase tracking-tight text-white/40 mb-2">{tier.name}</h4>
                  <div className="flex items-end justify-center gap-1">
                    <span className="text-4xl font-black italic">$</span>
                    <span className="text-7xl font-black italic leading-none">{tier.price}</span>
                    <span className="text-white/30 font-bold uppercase text-xs mb-2">/mo</span>
                  </div>
                </div>

                <ul className="space-y-4">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/60 text-sm">
                      <Check className="w-4 h-4 text-neon-volt shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-12">
                <PremiumButton 
                  className="w-full py-6" 
                  glow={tier.recommended}
                >
                  Select Plan
                </PremiumButton>
              </div>
            </PremiumCard>
          ))}
        </div>
      </div>
    </section>
  )
}
