import { P } from "@/types";
import { ISkillRecord } from "@/interfaces";
import { ICardContext } from "@/context/card-context";
import { Mail, MessageCircle, Phone, Twitter } from "lucide-react";

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
    techs: ["React.js", "Tailwindcss", "Express.js"],
    img: "/Bg.jpeg",
    links: { github: "github.com", live: "live.com" },
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
