import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Programs } from "@/components/sections/programs";
import { Coaches } from "@/components/sections/coaches";
import { Pricing } from "@/components/sections/pricing";
import { Schedule } from "@/components/sections/schedule";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Programs />
      <Coaches />
      <Pricing />
      <Schedule />
      <Contact />
    </div>
  );
}
