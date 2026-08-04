import { cache } from "react";

import { db } from "@/lib/supabase";
import type { IContactLink, ISettings } from "@/interfaces";
import type { SettingsInput } from "@/lib/validators";

const DEFAULT_SETTINGS: ISettings = { aboutParagraphs: [], contact: [] };

export const getSettings = cache(async (): Promise<ISettings> => {
  const { data, error } = await db()
    .from("settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return DEFAULT_SETTINGS;

  return {
    aboutParagraphs: data.about_paragraphs as unknown as string[],
    contact: data.contact as unknown as IContactLink[],
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
