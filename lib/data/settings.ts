import { cache } from "react";

import { db } from "@/lib/supabase";
import type { IContactLink, ISettings } from "@/interfaces";
import type { SettingsInput } from "@/lib/validators";

const DEFAULT_SETTINGS: ISettings = { aboutParagraphs: [], contact: [] };

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function toContactLinks(value: unknown): IContactLink[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (v): v is IContactLink =>
      typeof v === "object" &&
      v !== null &&
      typeof (v as IContactLink).icon === "string" &&
      typeof (v as IContactLink).link === "string" &&
      typeof (v as IContactLink).text === "string",
  );
}

export const getSettings = cache(async (): Promise<ISettings> => {
  const { data, error } = await db()
    .from("settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return DEFAULT_SETTINGS;

  return {
    aboutParagraphs: toStringArray(data.about_paragraphs),
    contact: toContactLinks(data.contact),
  };
});

export async function updateSettings(input: SettingsInput): Promise<void> {
  const { error } = await db()
    .from("settings")
    .upsert(
      {
        id: 1,
        about_paragraphs: input.aboutParagraphs,
        contact: input.contact,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );
  if (error) throw new Error(error.message);
}
