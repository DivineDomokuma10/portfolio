import { P } from "@/types";
import { ISkillRecord } from "@/interfaces";
import { ICardContext } from "@/context/card-context";

export const NAV_LINKS = [
  { text: "home", path: "/" },
  { text: "works", path: "/works" },
  { text: "about-me", path: "/about-me" },
  { text: "contact", path: "/contact" },
];

export const skills: P<Record<keyof ISkillRecord, ICardContext>> = {
  databases: { img: "/Bg.jpeg", techs: ["Mongodb"] },
  language: { techs: ["TypeScript", "Html5", "JavaScript", "CSS3"] },
  framework: {
    techs: ["Nextjs", "Expressjs", "React", "Astrojs"],
  },
  library: {
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
  },
};

export const projects: Array<ICardContext> = [
  {
    techs: ["Html", "CSS", "Javascript"],
    img: "/Bg.jpeg",
    links: { github: "github.com", live: "live.com" },
    textInfo: {
      title: "ChertNode",
      desc: "Minecraft Server boosting",
    },
  },
  {
    techs: ["Html", "CSS", "Javascript"],
    img: "/Bg.jpeg",
    links: { github: "github.com", live: "live.com" },
    textInfo: {
      title: "ChertNode",
      desc: "Minecraft Server boosting",
    },
  },
  {
    techs: ["React.js", "Tailwindcss", "Expess.js"],
    img: "/Bg.jpeg",
    links: { github: "github.com", live: "live.com" },
    textInfo: {
      title: "ProjectX",
      desc: "Discord anti-craft analyzer",
    },
  },
];
