import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Programs } from "@/components/sections/programs";
import { Coaches } from "@/components/sections/coaches";
import { Pricing } from "@/components/sections/pricing";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Programs />
      <Coaches />
      <Pricing />
      
      {/* Placeholder sections for next tracks */}
      <section id="schedule" className="container mx-auto px-4 py-20 min-h-screen border-t border-white/5">
        <h2 className="text-5xl font-black italic uppercase mb-12 text-white/20">Class Schedule</h2>
      </section>
    </div>
  );
}
