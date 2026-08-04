"use server";

import { randomUUID } from "crypto";

import { db } from "@/lib/supabase";
import { requireAdmin } from "@/lib/auth";
import type { ActionResult } from "@/lib/result";
import { revalidateContent } from "@/lib/data/revalidate";
import {
  createProject,
  deleteProject,
  updateProject,
} from "@/lib/data/projects";
import type { ProjectInput } from "@/lib/validators";
import { projectSchema } from "@/lib/validators";

const IMAGE_MAX_BYTES = 5 * 1024 * 1024;
const IMAGE_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

export async function createProjectAction(input: ProjectInput): Promise<ActionResult> {
  const session = await requireAdmin();
  if (!session) return { ok: false, error: "Unauthorized" };

  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid input." };

  await createProject(parsed.data);
  revalidateContent();
  return { ok: true };
}

export async function updateProjectAction(
  id: string,
  input: ProjectInput,
): Promise<ActionResult> {
  const session = await requireAdmin();
  if (!session) return { ok: false, error: "Unauthorized" };

  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid input." };

  await updateProject(id, parsed.data);
  revalidateContent();
  return { ok: true };
}

export async function deleteProjectAction(id: string): Promise<ActionResult> {
  const session = await requireAdmin();
  if (!session) return { ok: false, error: "Unauthorized" };

  await deleteProject(id);
  revalidateContent();
  return { ok: true };
}

export async function uploadImageAction(
  formData: FormData,
): Promise<ActionResult<{ url: string }>> {
  const session = await requireAdmin();
  if (!session) return { ok: false, error: "Unauthorized" };

  const file = formData.get("file");
  if (!(file instanceof File)) return { ok: false, error: "No file provided." };

  const extension = IMAGE_TYPES[file.type];
  if (!extension) return { ok: false, error: "Only PNG, JPEG, or WebP allowed." };
  if (file.size > IMAGE_MAX_BYTES) {
    return { ok: false, error: "Image must be 5MB or smaller." };
  }

  const path = `projects/${randomUUID()}.${extension}`;
  const { error } = await db()
    .storage.from("images")
    .upload(path, file, { upsert: false, contentType: file.type });
  if (error) return { ok: false, error: error.message };

  const { data } = db().storage.from("images").getPublicUrl(path);
  return { ok: true, data: { url: data.publicUrl } };
}
