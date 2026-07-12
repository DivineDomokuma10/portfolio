// lib/schema.ts

import { siteConfig } from "./metadata";

export const jsonLd = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}#website`,

      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,

      publisher: {
        "@id": `${siteConfig.url}#person`,
      },

      inLanguage: "en",
    },

    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}#homepage`,

      url: siteConfig.url,
      name: siteConfig.title,
      isPartOf: {
        "@id": `${siteConfig.url}#website`,
      },

      about: {
        "@id": `${siteConfig.url}#person`,
      },

      description: siteConfig.description,

      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.ogImage}`,
      },
    },

    {
      "@type": "Person",
      "@id": `${siteConfig.url}#person`,

      name: "Divine Domokuma",

      url: siteConfig.url,

      image: `${siteConfig.url}${siteConfig.ogImage}`,

      jobTitle: "Frontend Engineer",

      description:
        "Frontend Engineer specializing in React, Next.js and TypeScript, building scalable digital products.",

      sameAs: [
        siteConfig.links.github,
        siteConfig.links.linkedin,
        siteConfig.links.x,
      ],

      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Federal University Otuoke",
      },

      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Frontend Architecture",
        "User Interface Design",
        "Tailwind CSS",
        "Prisma",
        "Supabase",
        "PostgreSQL",
        "Design Systems",
        "Performance Optimization",
        "Multi-tenant Applications",
        "Educational Technology",
      ],

      worksFor: {
        "@type": "Organization",
        name: "Freelance",
      },
    },
  ],
};
