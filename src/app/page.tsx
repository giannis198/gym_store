import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Programs } from "@/components/sections/programs";
import { Coaches } from "@/components/sections/coaches";
import { Pricing } from "@/components/sections/pricing";
import { Schedule } from "@/components/sections/schedule";
import { Contact } from "@/components/sections/contact";
import { getPrograms, getCoaches, getScheduleItems } from "@/lib/actions/content";

export default async function Home() {
  const [programs, coaches, scheduleItems] = await Promise.all([
    getPrograms(),
    getCoaches(),
    getScheduleItems()
  ]);

  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Programs programs={programs} />
      <Coaches coaches={coaches} />
      <Pricing />
      <Schedule scheduleItems={scheduleItems as any} />
      <Contact />
    </div>
  );
}