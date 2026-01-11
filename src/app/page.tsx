import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Programs } from "@/components/sections/programs";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Programs />
      
      {/* Placeholder sections for next tracks */}
      <section id="coaches" className="container mx-auto px-4 py-20 min-h-screen border-t border-white/5">
        <h2 className="text-5xl font-black italic uppercase mb-12 text-white/20">Elite Coaches</h2>
      </section>
    </div>
  );
}
