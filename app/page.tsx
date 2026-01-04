import AboutSection from "@/components/sections/about";
import HeroSection from "@/components/sections/hero";
import Project from "@/components/sections/project";
import SkillSection from "@/components/sections/skills";

export default function Home() {
  return (
    <main className="w-full h-fit flex flex-col space-y-10 md:w-5/6">
      <HeroSection />
      <AboutSection />
      <SkillSection />
      <Project />
    </main>
  );
}
