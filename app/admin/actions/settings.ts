"use server";

import { requireAdmin } from "@/lib/auth";
import type { ActionResult } from "@/lib/result";
import { revalidateContent } from "@/lib/data/revalidate";
import { updateSettings } from "@/lib/data/settings";
import type { SettingsInput } from "@/lib/validators";
import { settingsSchema } from "@/lib/validators";

export async function updateSettingsAction(
  input: SettingsInput,
): Promise<ActionResult> {
  const session = await requireAdmin();
  if (!session) return { ok: false, error: "Unauthorized" };

  const parsed = settingsSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid input." };

  try {
    await updateSettings(parsed.data);
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "Failed to save settings." };
  }
  revalidateContent();
  return { ok: true };
}
