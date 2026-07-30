import Contact from "@/components/sections/contact";
import Project from "@/components/sections/project";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import SkillSection from "@/components/sections/skills";

export default function Home() {
  return (
    <main className="w-full h-fit flex flex-col space-y-10 md:w-5/6">
      <HeroSection />
      <AboutSection />
      <SkillSection />
      <Project />
      <Contact />
    </main>
  );
}
