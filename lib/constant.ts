import { P } from "@/types";
import { ISkillRecord } from "@/interfaces";
import { ICardContext } from "@/context/card-context";
import { Mail, MessageCircle, Phone, Twitter } from "lucide-react";

export const NAV_LINKS = [
  { text: "home", path: "/" },
  { text: "works", path: "/works" },
  { text: "about-me", path: "/about-me" },
  { text: "contact", path: "/#contact" },
];

export const skills: P<Record<keyof ISkillRecord, ICardContext>> = {
  databases: { img: "/Bg.jpeg", techs: ["Mongodb"] },
  language: { techs: ["TypeScript", "Html5", "JavaScript", "CSS3"] },
  framework: {
    techs: ["Nextjs", "ExpressJs", "React", "Astrojs"],
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
    links: { github: "https://www.github.com", live: "live.com" },
    textInfo: {
      title: "ChertNode",
      desc: "Minecraft Server boosting",
    },
  },
  {
    techs: ["Html", "CSS", "Javascript"],
    img: "/Bg.jpeg",
    links: { github: "https://www.github.com", live: "live.com" },
    textInfo: {
      title: "ChertNode",
      desc: "Minecraft Server boosting",
    },
  },
  {
    techs: ["React.js", "Tailwindcss", "Express.js"],
    img: "/Bg.jpeg",
    links: { github: "https://www.github.com", live: "live.com" },
    textInfo: {
      title: "ProjectX",
      desc: "Discord anti-craft analyzer",
    },
  },
];

export const CONTACT_INFO = [
  {
    icon: Phone,
    link: "tel:+2349071214921",
    text: "+2349071214921",
  },
  {
    icon: Twitter,
    link: "https://x.com/Dkodes100",
    text: "@Dkodes100",
  },
  {
    icon: Mail,
    link: "mailto:divinedomokuma@gmail.com",
    text: "divinedomokuma@gmail.com",
  },
  {
    icon: MessageCircle,
    link: "https://wa.me/qr/CTYTPNFMS2BSP1",
    text: "Divine Domokuma",
  },
];

export const ABOUT_ME_INFO = [
  `
    I'm a Frontend Developer with a strong focus on building
    modern web applications using JavaScript, TypeScript, React,
    Next.js, and Node.js. 
  `,
  `
    Solving real-world problems through
    thoughtful software design and creating applications that are
    responsive, scalable, and easy to maintain are what i pride myself in building.
  `,
  `
    Whether I'm implementing a clean frontend interface,
    integrating backend APIs, or working with databases, I care about
    writing code that is both efficient and maintainable.
  `,
  `
    Over the past few years, I've built projects ranging from
    educational platforms and secure communication systems to
    portfolio websites and productivity tools. Each project has
    strengthened my understanding of software architecture, state
    management, authentication, database design, and user experience.
  `,
];
