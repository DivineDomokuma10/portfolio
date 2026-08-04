"use server";

import { requireAdmin } from "@/lib/auth";
import type { ActionResult } from "@/lib/result";
import { revalidateContent } from "@/lib/data/revalidate";
import {
  createSkillCategory,
  deleteSkillCategory,
  updateSkillCategory,
} from "@/lib/data/skills";
import type { SkillInput } from "@/lib/validators";
import { skillSchema } from "@/lib/validators";

export async function createSkillCategoryAction(
  input: SkillInput,
): Promise<ActionResult> {
  const session = await requireAdmin();
  if (!session) return { ok: false, error: "Unauthorized" };

  const parsed = skillSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid input." };

  await createSkillCategory(parsed.data);
  revalidateContent();
  return { ok: true };
}

export async function updateSkillCategoryAction(
  id: string,
  input: SkillInput,
): Promise<ActionResult> {
  const session = await requireAdmin();
  if (!session) return { ok: false, error: "Unauthorized" };

  const parsed = skillSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid input." };

  await updateSkillCategory(id, parsed.data);
  revalidateContent();
  return { ok: true };
}

export async function deleteSkillCategoryAction(id: string): Promise<ActionResult> {
  const session = await requireAdmin();
  if (!session) return { ok: false, error: "Unauthorized" };

  await deleteSkillCategory(id);
  revalidateContent();
  return { ok: true };
}
