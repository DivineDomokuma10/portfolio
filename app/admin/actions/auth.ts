"use server";

import { redirect } from "next/navigation";

import { createSession, destroySession, verifyCredentials } from "@/lib/auth";
import type { ActionResult } from "@/lib/result";
import { loginSchema } from "@/lib/validators";

export async function loginAction(input: {
  email: string;
  password: string;
}): Promise<ActionResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid email or password." };

  const { email, password } = parsed.data;
  if (!verifyCredentials(email, password)) {
    return { ok: false, error: "Invalid email or password." };
  }

  await createSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}
