import AboutSection from "@/components/sections/about";
import HeroSection from "@/components/sections/hero";
import SkillSection from "@/components/sections/skills";

export default function Home() {
  return (
    <main className="w-full h-fit flex flex-col md:w-5/6">
      <HeroSection />
      <AboutSection />
      <SkillSection />
    </main>
  );
}
