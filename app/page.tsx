import type { Metadata } from "next";
import Contact from "@/components/sections/contact";
import Project from "@/components/sections/project";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import SkillSection from "@/components/sections/skills";

import { siteConfig } from "@/lib/metadata";
import { getProjectCards } from "@/lib/data/projects";
import { getSkillCategories } from "@/lib/data/skills";
import { getSettings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Home",
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  alternates: { canonical: siteConfig.url },
};

export default async function Home() {
  const [projects, categories, settings] = await Promise.all([
    getProjectCards(),
    getSkillCategories(),
    getSettings(),
  ]);

  return (
    <main className="w-full h-fit flex flex-col space-y-10 md:w-5/6">
      <HeroSection />
      <AboutSection paragraphs={settings.aboutParagraphs.slice(0, 2)} />
      <SkillSection categories={categories} />
      <Project projects={projects} />
      <Contact contact={settings.contact} />
    </main>
  );
}
