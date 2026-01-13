'use client'

import React, { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PremiumButton } from '@/components/ui/premium-button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label' // Keep Label for direct use outside FormField if needed
import { Mail, Phone, MapPin } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const contactFormSchema = z.object({
  name: z.string().min(1, 'Your name is required'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500, 'Message cannot exceed 500 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    gsap.from('.contact-reveal', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      ease: 'power4.out',
    })

    ScrollTrigger.refresh()
  }, { scope: sectionRef })

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionStatus('submitting');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(data); // Log form data
    setSubmissionStatus('success');
    toast.success('Message sent successfully!');
    form.reset(); // Reset form after successful submission
  };

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="py-32 bg-matte-black relative overflow-hidden border-t border-white/5"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <div className="space-y-12">
            <div className="contact-reveal">
              <h2 className="text-xs uppercase tracking-[0.5em] text-neon-volt font-black mb-4">Get In Touch</h2>
              <h3 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
                READY TO <br /> <span className="text-white/10">FIGHT?</span>
              </h3>
            </div>

            <div className="contact-reveal space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-slate-grey/20 flex items-center justify-center border border-white/5 group-hover:border-neon-volt/50 transition-colors">
                  <Mail className="w-5 h-5 text-neon-volt" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/30 font-bold">Email</div>
                  <div className="text-lg font-bold">hq@ironandgloves.com</div>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-slate-grey/20 flex items-center justify-center border border-white/5 group-hover:border-neon-volt/50 transition-colors">
                  <Phone className="w-5 h-5 text-neon-volt" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/30 font-bold">Call</div>
                  <div className="text-lg font-bold">+1 (555) 000-IRON</div>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-slate-grey/20 flex items-center justify-center border border-white/5 group-hover:border-neon-volt/50 transition-colors">
                  <MapPin className="w-5 h-5 text-neon-volt" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/30 font-bold">Studio</div>
                  <div className="text-lg font-bold text-white/70">123 Combat Alley, Brooklyn, NY</div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-reveal bg-slate-grey/10 border border-white/5 p-8 md:p-12 rounded-3xl relative">
            {!mounted ? (
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-white/50">Loading contact form...</p>
              </div>
            ) : submissionStatus === 'success' ? (
              <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 bg-neon-volt rounded-full flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-matte-black border-t-transparent rounded-full animate-spin hidden" />
                  <span className="text-4xl text-matte-black font-black">✓</span>
                </div>
                <h4 className="text-3xl font-black italic uppercase tracking-tight">Message Received</h4>
                <p className="text-white/50">Our team will reach out within 24 hours.</p>
                <button 
                  onClick={() => setSubmissionStatus('idle')}
                  className="text-neon-volt font-bold uppercase tracking-widest text-xs hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest text-white/40">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your Name" 
                            className="bg-transparent border-white/10 h-14 focus-visible:ring-neon-volt text-white"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest text-white/40">Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="Email Address" 
                            className="bg-transparent border-white/10 h-14 focus-visible:ring-neon-volt text-white"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs uppercase tracking-widest text-white/40">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your Message" 
                            className="bg-transparent border-white/10 min-h-[150px] focus-visible:ring-neon-volt text-white resize-none"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <PremiumButton 
                    type="submit" 
                    disabled={submissionStatus === 'submitting'}
                    className="w-full py-8 text-lg"
                  >
                    {submissionStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                  </PremiumButton>
                </form>
              </Form>
            )}
          </div>
        </div>

        {/* Final Site CTA */}
        <div className="contact-reveal mt-40 border-t border-white/5 pt-40 text-center">
          <h4 className="text-8xl md:text-[15vw] font-black italic uppercase tracking-tighter leading-none opacity-5 hover:opacity-10 transition-opacity duration-700 cursor-default select-none">
            IRON <span className="text-neon-volt">&</span> GLOVES
          </h4>
          <p className="mt-8 text-white/30 text-xs font-bold uppercase tracking-[0.5em]">Copyright © 2026 Iron & Gloves Boxing Club</p>
        </div>
      </div>
    </section>
  )
}
