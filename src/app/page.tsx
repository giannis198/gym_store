import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      
      {/* Placeholder sections for next tracks */}
      <section id="programs" className="container mx-auto px-4 py-20 min-h-screen border-t border-white/5">
        <h2 className="text-5xl font-black italic uppercase mb-12">Training Programs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 bg-slate-grey/20 border border-white/5 rounded-lg" />
          ))}
        </div>
      </section>
    </div>
  );
}