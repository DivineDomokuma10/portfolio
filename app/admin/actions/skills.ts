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

  try {
    await createSkillCategory(parsed.data);
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Failed to create skill." };
  }
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

  try {
    await updateSkillCategory(id, parsed.data);
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Failed to update skill." };
  }
  revalidateContent();
  return { ok: true };
}

export async function deleteSkillCategoryAction(id: string): Promise<ActionResult> {
  const session = await requireAdmin();
  if (!session) return { ok: false, error: "Unauthorized" };

  try {
    await deleteSkillCategory(id);
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Failed to delete skill." };
  }
  revalidateContent();
  return { ok: true };
}
