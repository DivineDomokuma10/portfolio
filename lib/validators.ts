import { z } from "zod";

const optionalUrl = z.union([z.url(), z.literal("")]).optional();

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const projectSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().max(500),
  techs: z.array(z.string().trim().min(1)).max(30),
  imageUrl: optionalUrl,
  githubUrl: optionalUrl,
  liveUrl: optionalUrl,
  category: z.enum(["web", "mobile"]),
  sortOrder: z.number().int().min(0).optional(),
});

export const skillSchema = z.object({
  name: z.string().trim().min(1).max(50),
  techs: z.array(z.string().trim().min(1)).max(40),
  imageUrl: optionalUrl,
  sortOrder: z.number().int().min(0).optional(),
});

export const settingsSchema = z.object({
  aboutParagraphs: z.array(z.string().trim()),
  contact: z.array(
    z.object({
      icon: z.string().min(1),
      link: z.string().min(1),
      text: z.string().min(1),
    }),
  ),
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type SkillInput = z.infer<typeof skillSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
