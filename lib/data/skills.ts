import { cache } from "react";

import { db } from "@/lib/supabase";
import type { Database } from "@/supabase/database.types";
import type { ISkillCategory } from "@/interfaces";
import type { SkillInput } from "@/lib/validators";

type SkillCategoryRow = Database["public"]["Tables"]["skill_categories"]["Row"];

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}

function toSkillCategory(row: SkillCategoryRow): ISkillCategory {
  return {
    id: row.id,
    name: row.name,
    techs: toStringArray(row.techs),
    imageUrl: row.image_url,
    sortOrder: row.sort_order,
  };
}

export const getSkillCategories = cache(async (): Promise<ISkillCategory[]> => {
  const { data, error } = await db()
    .from("skill_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []).map(toSkillCategory);
});

export async function createSkillCategory(input: SkillInput): Promise<void> {
  const { error } = await db().from("skill_categories").insert({
    name: input.name,
    techs: input.techs,
    image_url: input.imageUrl || null,
    sort_order: input.sortOrder ?? 0,
  });
  if (error) throw new Error(error.message);
}

export async function updateSkillCategory(id: string, input: SkillInput): Promise<void> {
  const { error } = await db()
    .from("skill_categories")
    .update({
      name: input.name,
      techs: input.techs,
      image_url: input.imageUrl || null,
      sort_order: input.sortOrder ?? 0,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteSkillCategory(id: string): Promise<void> {
  const { error } = await db().from("skill_categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
