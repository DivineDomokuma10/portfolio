import { createClient } from "@supabase/supabase-js";

import type { Database } from "../supabase/database.types";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Missing Supabase env vars");

const supabase = createClient<Database>(url, key);

async function ensureBucket(): Promise<void> {
  const { error: getError } = await supabase.storage.getBucket("images");

  if (getError) {
    const { error: createError } = await supabase.storage.createBucket(
      "images",
      {
        public: true,
      },
    );

    if (createError) throw new Error(createError.message);
    console.log("Created bucket: images");
  }
}

async function seedProjects(): Promise<void> {
  const projects: Database["public"]["Tables"]["projects"]["Insert"][] = [
    {
      id: "6b1a5b90-0000-4000-8000-000000000001",
      title: "ChertNode",
      description: "Minecraft Server boosting",
      techs: ["Html", "CSS", "Javascript"],
      image_url: null,
      github_url: "https://www.github.com",
      live_url: "https://live.com",
      category: "web",
      sort_order: 0,
    },
    {
      id: "6b1a5b90-0000-4000-8000-000000000002",
      title: "ChertNode API",
      description: "Minecraft Server boosting API",
      techs: ["Html", "CSS", "Javascript"],
      image_url: null,
      github_url: "https://www.github.com",
      live_url: "https://live.com",
      category: "web",
      sort_order: 1,
    },
    {
      id: "6b1a5b90-0000-4000-8000-000000000003",
      title: "ProjectX",
      description: "Discord anti-craft analyzer",
      techs: ["React.js", "Tailwindcss", "Express.js"],
      image_url: null,
      github_url: "https://www.github.com",
      live_url: "https://live.com",
      category: "web",
      sort_order: 2,
    },
  ];

  const { error } = await supabase
    .from("projects")
    .upsert(projects, { onConflict: "id" });

  if (error) throw new Error(error.message);
  console.log(`Seeded projects: ${projects.length}`);
}

async function seedSkillCategories(): Promise<void> {
  const categories = [
    { name: "databases", techs: ["Mongodb"], image_url: null, sort_order: 0 },
    {
      name: "language",
      techs: ["TypeScript", "Html5", "JavaScript", "CSS3"],
      image_url: null,
      sort_order: 1,
    },
    {
      name: "framework",
      techs: ["Nextjs", "ExpressJs", "React", "Astrojs"],
      image_url: null,
      sort_order: 2,
    },
    {
      name: "library",
      techs: [
        "Zod",
        "Nodejs",
        "Axios",
        "Motion",
        "Tailwindcss",
        "RHF",
        "ReactQuery",
        "Zustand",
        "Shadcn",
      ],
      image_url: null,
      sort_order: 3,
    },
  ];

  const { error } = await supabase
    .from("skill_categories")
    .upsert(categories, { onConflict: "name" });

  if (error) throw new Error(error.message);
  console.log(`Seeded skill categories: ${categories.length}`);
}

async function seedSettings(): Promise<void> {
  const aboutParagraphs = [
    "I'm a Frontend Developer with a strong focus on building modern web applications using JavaScript, TypeScript, React, Next.js, and Node.js.",
    "Solving real-world problems through thoughtful software design and creating applications that are responsive, scalable, and easy to maintain are what i pride myself in building.",
    "Whether I'm implementing a clean frontend interface, integrating backend APIs, or working with databases, I care about writing code that is both efficient and maintainable.",
    "Over the past few years, I've built projects ranging from educational platforms and secure communication systems to portfolio websites and productivity tools. Each project has strengthened my understanding of software architecture, state management, authentication, database design, and user experience.",
  ];

  const contact = [
    { icon: "phone", link: "tel:+2349071214921", text: "+2349071214921" },
    { icon: "twitter", link: "https://x.com/Dkodes100", text: "@Dkodes100" },
    {
      icon: "mail",
      link: "mailto:divinedomokuma@gmail.com",
      text: "divinedomokuma@gmail.com",
    },
    {
      icon: "whatsapp",
      link: "https://wa.me/qr/CTYTPNFMS2BSP1",
      text: "Divine Domokuma",
    },
  ];

  const { error } = await supabase.from("settings").upsert(
    {
      id: 1,
      about_paragraphs: aboutParagraphs,
      contact,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) throw new Error(error.message);

  console.log("Seeded settings.");
}

async function main(): Promise<void> {
  await ensureBucket();
  await seedProjects();
  await seedSkillCategories();
  await seedSettings();
  console.log("Seed complete.");
}

main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
