import type { ICardContext } from "@/context/card-context";

export interface IContactLink {
  icon: string;
  link: string;
  text: string;
}

export interface IProject {
  id: string;
  title: string;
  description: string;
  techs: string[];
  imageUrl: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  category: "web" | "mobile";
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type IProjectCard = ICardContext & { id: string };

export type IProjectInput = Omit<IProject, "id" | "createdAt" | "updatedAt">;

export interface ISkillCategory {
  id: string;
  name: string;
  techs: string[];
  imageUrl: string | null;
  sortOrder: number;
}

export type ISkillInput = Omit<ISkillCategory, "id">;

export interface ISettings {
  aboutParagraphs: string[];
  contact: IContactLink[];
}
