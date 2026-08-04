# CONTENT-ADMIN — Master Implementation Spec

> This document is the **single source of truth** for building the self-serve content
> admin for this portfolio. Read it top-to-bottom and implement **exactly** what is
> written: file paths, signatures, data shapes, and order. Do not improvise new
> architecture, rename files, or add patterns not listed here. If something cannot be
> implemented as specified, stop and update this document first, then continue.

---

## 1. Overview

Replace all hardcoded content in `lib/constant.ts` with a password-protected admin
dashboard at `/admin` so the site owner can manage **projects, skills, about-me text,
and contact info** (including image uploads) with zero code changes.

- Framework: Next.js 16 App Router, React 19, TypeScript, Tailwind v4, pnpm.
- Hosting: Vercel.
- Backend: **Supabase** (Postgres + Storage).
- Auth: custom minimal JWT (jose) + scrypt. Single admin user.
- All writes go through **Server Actions** (auth-guarded, zod-validated).
- Public pages stay **static**; mutations call `revalidatePath("/", "layout")`.

## 2. Non-negotiable principles

1. **Separation of concerns.** Routes compose, Server Actions enforce use-cases,
   `lib/data/*` is the only place that talks to Supabase, presentational components
   receive props and contain zero data logic.
2. **KISS.** One SDK (`@supabase/supabase-js`). No ORM, no REST API layer, no state
   library, no auth in proxy/middleware, no image pipeline. Three tables.
3. **Performance.** Server Components for all public pages; parallel `Promise.all`
   fetches; `React.cache()` request dedup; static rendering + targeted revalidation;
   `next/image` with a Supabase remote pattern.
4. **Reactivity.** Client forms use `react-hook-form` + `zod` and call Server Actions
   inside `useTransition`. Pending states disable buttons. Revalidation updates the UI.
5. **Readability.** Small single-purpose files, consistent naming
   (`getX`/`createX`/`updateX`/`deleteX`), one `ActionResult` helper, types in
   `interfaces/`. **No comments in code** unless a file's behavior is non-obvious.
6. **Security.** `requireAdmin()` at the top of every mutating action + admin layout
   gate; httpOnly/secure/strict cookie; short-lived signed JWT; scrypt +
   timing-safe compare; zod on every input; file type/size limits; service-role key
   is server-only (`server-only` package); robots disallows `/admin`.

## 3. Architecture & data flow

```
Browser ──public pages──▶ Server Components ──▶ lib/data/* ──▶ Supabase (Postgres + Storage)
        └──/admin forms──▶ Server Actions (requireAdmin + zod) ──▶ lib/data/* ──▶ Supabase
                                             │  revalidatePath("/", "layout")
                                             ▼
                                 cached public pages refresh
```

- Supabase access uses the **service-role** key on the server only. Nothing
  service-role reaches the client. Image URLs are plain public storage URLs.
- RLS stays **enabled** (Supabase default). Service role bypasses RLS; no policies
  need to be authored.

## 4. Target file tree

```
supabase/
  migrations/0001_init.sql      # schema (Section 6)
  database.types.ts             # hand-written Database type (Section 14)
lib/
  supabase.ts                   # server-only service-role client (Section 8)
  auth.ts                       # JWT/cookies/session (Section 9)
  validators.ts                 # zod schemas (Section 10)
  icons.ts                      # contact icon name -> lucide (Section 11)
  result.ts                     # ActionResult<T> (Section 12)
  constant.ts                   # trimmed to NAV_LINKS only (Section 13)
  data/
    index.ts                    # re-exports
    projects.ts                 # getProjects / createProject / updateProject / deleteProject
    skills.ts                   # getSkillCategories / create / update / delete
    settings.ts                 # getSettings (cached) / updateSettings
    revalidate.ts               # revalidateContent()
interfaces/index.ts             # domain types (Section 7)
app/
  admin/
    layout.tsx                  # auth gate + admin chrome (Section 15)
    page.tsx                    # redirect -> /admin/projects
    actions/
      auth.ts                   # loginAction / logoutAction
      projects.ts               # create/update/delete/uploadImage
      skills.ts
      settings.ts
    login/page.tsx
    projects/page.tsx
    skills/page.tsx
    about/page.tsx
    contact/page.tsx
  layout.tsx                    # <Wrapper footer={<Footer />}>{children}</Wrapper>
  page.tsx                      # async; Promise.all; pass props to sections
  works/page.tsx                # getProjects("web") + getProjects("mobile")
  about-me/page.tsx             # settings + skill categories
components/
  admin/
    admin-nav.tsx               # client nav + logout
    shared/
      form-field.tsx
      tag-input.tsx
      image-upload.tsx
      submit-button.tsx
      confirm-button.tsx
    projects/
      project-form.tsx
      project-list.tsx
    skills/
      skill-form.tsx
      skill-list.tsx
    settings/
      about-form.tsx
      contact-form.tsx
  sections/
    about.tsx                   # presentational (props)
    contact.tsx                 # presentational (props)
    project.tsx                 # presentational (props)
    skills.tsx                  # presentational (props)
  shared/
    utils.tsx                   # Wrapper gains `footer` slot
    footer.tsx                  # async server comp, fetches settings
scripts/seed.ts                 # creates bucket + seeds content
.env.example
CONTENT-ADMIN.md                # this file
```

## 5. Dependencies & env

Install with pnpm:

```bash
pnpm add @supabase/supabase-js jose react-hook-form @hookform/resolvers zod server-only
pnpm add -D tsx
```

`.env.example` (copy to `.env`; never commit `.env`):

```
SUPABASE_URL=https://<ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-jwt>
AUTH_SECRET=<openssl rand -base64 32>
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=<strong-password>
```

Package.json scripts to add:

```json
"typecheck": "tsc --noEmit",
"seed": "tsx --env-file=.env scripts/seed.ts"
```

## 6. Database schema (`supabase/migrations/0001_init.sql`)

```sql
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  techs jsonb not null default '[]',
  image_url text,
  github_url text,
  live_url text,
  category text not null default 'web' check (category in ('web','mobile')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists skill_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  techs jsonb not null default '[]',
  image_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists settings (
  id integer primary key default 1 check (id = 1),
  about_paragraphs jsonb not null default '[]',
  contact jsonb not null default '[]',
  updated_at timestamptz not null default now()
);

create index if not exists projects_category_sort_idx on projects (category, sort_order);
```

Storage bucket: **`images`**, public. Created by `scripts/seed.ts`.

Apply migrations via Supabase SQL editor, or `supabase db push` if the CLI is linked.
Settings row is guaranteed to exist via `getSettings()` fallback and the seed.

## 7. Domain types (`interfaces/index.ts`)

Keep existing `ISkillRecord`? **No** — delete it. Keep `P` in `types/index.ts` untouched.
Add:

```ts
import type { ICardContext } from "@/context/card-context";

export interface IContactLink {
  icon: string;   // key into CONTACT_ICONS in lib/icons.ts
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
```

Also in `context/card-context.tsx`, add `id?: string;` to `ICardContext` (stable keys).

## 8. `lib/supabase.ts`

```ts
import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/supabase/database.types";

declare global {
  // eslint-disable-next-line no-var
  var __supabase: SupabaseClient<Database> | undefined;
}

function createServerSupabase(): SupabaseClient<Database> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  }
  return createClient<Database>(url, key, { auth: { persistSession: false } });
}

export function db(): SupabaseClient<Database> {
  if (process.env.NODE_ENV === "production") return createServerSupabase();
  global.__supabase ??= createServerSupabase();
  return global.__supabase;
}
```

## 9. `lib/auth.ts`

```ts
import "server-only";
import { scryptSync, timingSafeEqual } from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "admin_session";
const TOKEN_TTL = "7d";

export interface Session {
  email: string;
}

function secretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("Missing AUTH_SECRET");
  return new TextEncoder().encode(secret);
}

function scryptHash(value: string): Buffer {
  const salt = process.env.AUTH_SECRET ?? "salt";
  return scryptSync(value, salt, 64);
}

function safeEqual(a: Buffer, b: Buffer): boolean {
  return a.length === b.length && timingSafeEqual(a, b);
}

export function verifyCredentials(email: string, password: string): boolean {
  if (email !== process.env.ADMIN_EMAIL) return false;
  const expected = process.env.ADMIN_PASSWORD ?? "";
  return safeEqual(scryptHash(password), scryptHash(expected));
}

async function signSession(): Promise<string> {
  const email = process.env.ADMIN_EMAIL ?? "";
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TOKEN_TTL)
    .sign(secretKey());
}

async function verifySession(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (typeof payload.email !== "string") return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  return token ? verifySession(token) : null;
}

export async function requireAdmin(): Promise<Session | null> {
  return getSession();
}

export async function createSession(): Promise<void> {
  const token = await signSession();
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
```

Note: Next 16 — `await cookies()` is mandatory.

## 10. `lib/validators.ts`

```ts
import { z } from "zod";

// zod 4: use top-level z.url() (z.string().url() is deprecated).
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
```

## 11. `lib/icons.ts`

```ts
import { Github, Linkedin, Mail, MessageCircle, Phone, Twitter } from "lucide-react";

export const CONTACT_ICONS = {
  phone: Phone,
  twitter: Twitter,
  mail: Mail,
  whatsapp: MessageCircle,
  github: Github,
  linkedin: Linkedin,
} as const;

export type ContactIconName = keyof typeof CONTACT_ICONS;
```

## 12. `lib/result.ts`

```ts
export type ActionResult<T = undefined> =
  | { ok: true; data?: T }
  | { ok: false; error: string };
```

## 13. `lib/constant.ts` (trimmed)

Only `NAV_LINKS` remains (unchanged content). Remove `skills`, `projects`,
`CONTACT_INFO`, `ABOUT_ME_INFO`. Their data now lives in the DB (seeded).

## 14. `supabase/database.types.ts` (hand-written)

```ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          techs: Json;
          image_url: string | null;
          github_url: string | null;
          live_url: string | null;
          category: string;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string;
          techs?: Json;
          image_url?: string | null;
          github_url?: string | null;
          live_url?: string | null;
          category?: string;
          sort_order?: number;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Insert"]>;
        Relationships: [];
      };
      skill_categories: {
        Row: {
          id: string;
          name: string;
          techs: Json;
          image_url: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          techs?: Json;
          image_url?: string | null;
          sort_order?: number;
        };
        Update: Partial<Database["public"]["Tables"]["skill_categories"]["Insert"]>;
        Relationships: [];
      };
      settings: {
        Row: {
          id: number;
          about_paragraphs: Json;
          contact: Json;
          updated_at: string;
        };
        Insert: {
          id?: number;
          about_paragraphs?: Json;
          contact?: Json;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["settings"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
```

## 15. `app/admin/layout.tsx`

```tsx
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { AdminNav } from "@/components/admin/admin-nav";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-dvh bg-background grid-pattern">
      <AdminNav email={session.email} />
      <main className="mx-auto max-w-4xl px-4 py-10">{children}</main>
    </div>
  );
}
```

## 16. Server Actions (all in `app/admin/actions/`)

Conventions:
- Every file starts with `"use server";`.
- Every mutating function starts with `const session = await requireAdmin(); if (!session) return { ok: false, error: "Unauthorized" };`.
- Arguments are **typed plain objects** (serializable), not FormData — except
  `uploadImageAction` which takes `FormData` (file).
- After any content mutation call `revalidateContent()`.
- Actions never import from `components/` and never contain JSX.

`actions/auth.ts`:

```ts
"use server";

import { redirect } from "next/navigation";

import { createSession, destroySession, verifyCredentials } from "@/lib/auth";
import type { ActionResult } from "@/lib/result";
import { loginSchema } from "@/lib/validators";

export async function loginAction(
  input: { email: string; password: string },
): Promise<ActionResult> {
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
```

`actions/projects.ts`:

```ts
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
  if (file.size > IMAGE_MAX_BYTES) return { ok: false, error: "Image must be 5MB or smaller." };

  const path = `projects/${randomUUID()}.${extension}`;
  const { error } = await db()
    .storage.from("images")
    .upload(path, file, { upsert: false, contentType: file.type });
  if (error) return { ok: false, error: error.message };

  const { data } = db().storage.from("images").getPublicUrl(path);
  return { ok: true, data: { url: data.publicUrl } };
}
```

`actions/skills.ts` and `actions/settings.ts` follow the same pattern:

- `createSkillCategoryAction(input: SkillInput)`, `updateSkillCategoryAction(id, input)`,
  `deleteSkillCategoryAction(id)` — map to `lib/data/skills.ts` + `revalidateContent()`.
- `updateSettingsAction(input: SettingsInput)` — maps to `lib/data/settings.ts` +
  `revalidateContent()`.

## 17. Data layer (`lib/data/`)

`lib/data/index.ts`:

```ts
export * from "./projects";
export * from "./skills";
export * from "./settings";
export * from "./revalidate";
```

`lib/data/revalidate.ts`:

```ts
import { revalidatePath } from "next/cache";

export function revalidateContent() {
  revalidatePath("/", "layout");
}
```

`lib/data/projects.ts`:

```ts
import { db } from "@/lib/supabase";
import type { Database } from "@/supabase/database.types";
import type { IProject, IProjectCard } from "@/interfaces";
import type { ProjectInput } from "@/lib/validators";

type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];

function toProject(row: ProjectRow): IProject {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    techs: row.techs as string[],
    imageUrl: row.image_url,
    githubUrl: row.github_url,
    liveUrl: row.live_url,
    category: row.category as IProject["category"],
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toCard(project: IProject): IProjectCard {
  return {
    id: project.id,
    img: project.imageUrl ?? undefined,
    techs: project.techs,
    links: {
      github: project.githubUrl ?? "/",
      live: project.liveUrl ?? "/",
    },
    textInfo: { title: project.title, desc: project.description },
  };
}

export async function getProjects(
  category?: "web" | "mobile",
): Promise<IProject[]> {
  let query = db()
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (category) query = query.eq("category", category);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []).map(toProject);
}

export async function getProjectCards(
  category?: "web" | "mobile",
): Promise<IProjectCard[]> {
  return (await getProjects(category)).map(toCard);
}

export async function createProject(input: ProjectInput): Promise<void> {
  const { error } = await db().from("projects").insert({
    title: input.title,
    description: input.description,
    techs: input.techs,
    image_url: input.imageUrl || null,
    github_url: input.githubUrl || null,
    live_url: input.liveUrl || null,
    category: input.category,
    sort_order: input.sortOrder ?? 0,
  });
  if (error) throw new Error(error.message);
}

export async function updateProject(id: string, input: ProjectInput): Promise<void> {
  const { error } = await db()
    .from("projects")
    .update({
      title: input.title,
      description: input.description,
      techs: input.techs,
      image_url: input.imageUrl || null,
      github_url: input.githubUrl || null,
      live_url: input.liveUrl || null,
      category: input.category,
      sort_order: input.sortOrder ?? 0,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await db().from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
```

`lib/data/skills.ts`: mirrors projects. `getSkillCategories(): Promise<ISkillCategory[]>`
(ordered by `sort_order`), `createSkillCategory(input: SkillInput)`,
`updateSkillCategory(id, input)`, `deleteSkillCategory(id)`. Use a
`toSkillCategory(row)` mapper that converts snake_case columns to `ISkillCategory`
and casts `techs` via `row.techs as string[]`.

`lib/data/settings.ts`:

```ts
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
```

## 18. Seed (`scripts/seed.ts`)

Run once after env is set: `pnpm seed`. It:

1. Creates storage bucket `images` if missing (`storage.createBucket("images", { public: true })`).
2. Upserts the current portfolio content (from the old `constant.ts`): 3 web projects,
   4 skill categories, about paragraphs, contact entries.
3. Upserts the single settings row (`id = 1`).

Structure:

```ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../supabase/database.types";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("Missing Supabase env vars");

const supabase = createClient<Database>(url, key);

// 1. bucket
const { error: bucketError } = await supabase.storage.getBucket("images");
if (bucketError) {
  await supabase.storage.createBucket("images", { public: true });
}

// 2. seed projects / skill_categories (upsert, ids optional)
// 3. seed settings row (upsert id=1)

console.log("Seed complete.");
```

Seed data — copy verbatim from the OLD `lib/constant.ts` values (projects array,
skills record, ABOUT_ME_INFO, CONTACT_INFO with icon names as strings: phone/twitter/mail/whatsapp).

## 19. Public pages refactor

### `components/shared/utils.tsx` (Wrapper gains footer slot)

- Add `footer?: ReactNode` to the `IProps`-adjacent props for `Wrapper`.
- Remove `import Footer from "./footer";` and the `<Footer />` element; render `{footer}` in its place.

### `app/layout.tsx`

- `import Footer from "@/components/shared/footer";`
- Render `<Wrapper footer={<Footer />}>{children}</Wrapper>`.
- Everything else unchanged.

### `components/shared/footer.tsx`

- Remove `import { CONTACT_INFO } from "@/lib/constant";`.
- `import { getSettings } from "@/lib/data/settings";` and `import { CONTACT_ICONS } from "@/lib/icons";`
- Make the component `async`; `const { contact } = await getSettings();`
- Render icons via `CONTACT_ICONS[info.icon as ContactIconName]` (guard with a fallback).
- Server component (no `"use client"`). It imports `Logo` (client) — allowed.

### `components/sections/about.tsx` (server, presentational)

- Props: `{ paragraphs: string[] }`.
- Replace `ABOUT_ME_INFO.slice(0, 2)` with `paragraphs.slice(0, 2)`.
- Remove the constant import.

### `components/sections/contact.tsx` (server, presentational)

- Props: `{ contact: IContactLink[] }`.
- Replace `CONTACT_INFO.map(...)` with `contact.map(...)`; render icons via `CONTACT_ICONS`.
- Remove the constant import.

### `components/sections/project.tsx` (client, presentational)

- Props: `{ projects: IProjectCard[] }`.
- Replace `projects.map(...)` with the prop; change key to `project.id`.
- Remove the constant import.

### `components/sections/skills.tsx` (client, presentational)

- Props: `{ categories: ISkillCategory[] }`.
- `const mySkills = categories;` — no `Object.keys(skills)`. Card data:
  `{ techs: category.techs, img: category.imageUrl ?? undefined }`.
- Change key to `category.id`.
- Remove the constant import. Remove the `ISkillRecord`/`P` usage.

### `app/page.tsx` (async server)

```tsx
import Contact from "@/components/sections/contact";
import Project from "@/components/sections/project";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import SkillSection from "@/components/sections/skills";

import { getProjectCards } from "@/lib/data/projects";
import { getSkillCategories } from "@/lib/data/skills";
import { getSettings } from "@/lib/data/settings";

export default async function Home() {
  const [projects, categories, settings] = await Promise.all([
    getProjectCards(),
    getSkillCategories(),
    getSettings(),
  ]);

  return (
    <main className="w-full h-fit flex flex-col space-y-10 md:w-5/6">
      <HeroSection />
      <AboutSection paragraphs={settings.aboutParagraphs.slice(0, 2)} />
      <SkillSection categories={categories} />
      <Project projects={projects} />
      <Contact contact={settings.contact} />
    </main>
  );
}
```

### `app/works/page.tsx` (async server)

- `const [webProjects, mobileProjects] = await Promise.all([getProjectCards("web"), getProjectCards("mobile")]);`
- Web section maps `webProjects`, mobile section maps `mobileProjects` — **fixes the
  duplicate-section bug**.
- Keys use `project.id`. Empty category → render
  `<p className="text-secondary text-sm">Nothing here yet.</p>`.

### `app/about-me/page.tsx` (async server)

- `const [settings, categories] = await Promise.all([getSettings(), getSkillCategories()]);`
- Replace `ABOUT_ME_INFO.map(...)` with `settings.aboutParagraphs.map(...)`.
- `<SkillSection categories={categories} />`.
- Remove the constant import.

## 20. Admin UI

### `app/admin/page.tsx`

```tsx
import { redirect } from "next/navigation";
export default function AdminIndex() {
  redirect("/admin/projects");
}
```

### `app/admin/login/page.tsx`

Server component rendering `<LoginForm />` (client). Import `getSession`; if already
authenticated, `redirect("/admin")`. (Layout gate already prevents render, but this
keeps it correct when unauthenticated.)

### `app/admin/projects/page.tsx` (server)

```tsx
import { getProjects } from "@/lib/data/projects";
import { ProjectForm } from "@/components/admin/projects/project-form";
import { ProjectList } from "@/components/admin/projects/project-list";

export default async function AdminProjectsPage() {
  const projects = await getProjects();
  return (
    <div className="space-y-12">
      <h1 className="text-2xl font-semibold text-white">Projects</h1>
      <ProjectForm />
      <ProjectList projects={projects} />
    </div>
  );
}
```

`app/admin/skills/page.tsx`, `app/admin/about/page.tsx`, `app/admin/contact/page.tsx`
mirror this with their forms/lists and data fetchers.

### Client components (`components/admin/`)

All are `"use client"`. Use `react-hook-form` + `zodResolver` from
`@hookform/resolvers/zod`. Call actions inside `useTransition`:

```ts
const [isPending, startTransition] = useTransition();
const [error, setError] = useState<string | null>(null);

function onSubmit(values: ProjectInput) {
  startTransition(async () => {
    const result = await createProjectAction(values);
    if (!result.ok) setError(result.error);
    else form.reset();
  });
}
```

- **`form-field.tsx`** — props `{ label, error?, children, name? }`; label + error line.
- **`tag-input.tsx`** — RHF `Controller`; text input + chips; Enter/"," adds, backspace removes;
  exposes `value: string[]`, `onChange`.
- **`image-upload.tsx`** — props `{ value?: string; onChange(url?: string) }`.
  File input; on select validate type/size client-side; show preview via
  `URL.createObjectURL`; call `uploadImageAction(formData)` inside `useTransition`;
  on success `onChange(result.data.url)`; "Remove" button clears.
- **`submit-button.tsx`** — props `{ isPending, children }`; disabled + label "Saving…"
  when pending.
- **`confirm-button.tsx`** — two-step: idle → "Delete"; after click shows "Confirm?" for
  3s then calls `onConfirm`.
- **`project-form.tsx`** — props `{ initial?: IProject }`. RHF `defaultValues` from
  `initial` (editing) or empty defaults (creating). Fields: title, description,
  category (select web/mobile), techs (tag-input), imageUrl (image-upload),
  githubUrl, liveUrl, sortOrder (number). Calls `createProjectAction` or
  `updateProjectAction(initial.id, values)`. On success `form.reset()` (create) or
  call an `onSaved` callback (edit).
- **`project-list.tsx`** — receives serializable projects; each row shows title,
  category badge, techs count, Edit + Delete buttons. Edit renders `<ProjectForm initial={project} onSaved={close} />`. Delete uses `confirm-button` → `deleteProjectAction`.
- **`skill-form.tsx` / `skill-list.tsx`** — mirror projects (name instead of
  title/desc/category; techs + imageUrl + sortOrder).
- **`about-form.tsx`** — RHF; edits `aboutParagraphs: string[]` as a paragraph list
  (textareas + add/remove) and `contact` untouched, submits the full settings object.
  Note: RHF `useFieldArray` only accepts **object** arrays (`FieldArrayPath`), so `string[]`
  must be managed with `useWatch({ control, name: "aboutParagraphs" })` + `setValue`,
  rendering textareas via `register(\`aboutParagraphs.${index}\`)`.
- **`contact-form.tsx`** — RHF; `contact: IContactLink[]` via a row editor
  (icon select from `Object.keys(CONTACT_ICONS)`, link, text; add/remove). Calls
  `updateSettingsAction`.
- **`login-form.tsx`** — RHF `loginSchema`; calls `loginAction`; on error shows
  message; submit disabled while pending.
- **`admin-nav.tsx`** — links to the four admin sections + "View site" (`/`) +
  logout (calls `logoutAction`), shows `email`.

Styling: reuse the existing design tokens (`bg-background`, `text-white`,
`text-secondary`, `border-secondary`, `border-primary`, `text-primary`) with the same
dark aesthetic. Keep forms simple and accessible (labels, `aria-invalid`).

## 21. Config changes

`next.config.ts`:

```ts
images: {
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 768, 1024, 1280, 1536],
  remotePatterns: [
    { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/images/**" },
  ],
},
```

`app/robots.ts`:

```ts
rules: { userAgent: "*", allow: "/", disallow: "/admin" },
```

`app/sitemap.ts`: remove the `/contact` entry (route does not exist; it 404s).

## 22. Verification

1. `pnpm typecheck` (tsc --noEmit) — clean.
2. `pnpm lint` — clean.
3. Manual (requires user env): `pnpm seed`; `/admin` redirects when logged out;
   login; CRUD each section + image upload; confirm home/works/about-me/footer
   update immediately; `/works` web vs mobile split correct; logout.
4. `pnpm build` with env set — clean.

## 23. User setup checklist (final, hand-off)

1. Create a Supabase project; note the URL and service-role key.
2. Copy `.env.example` → `.env`; fill `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
   `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
3. Run `supabase/migrations/0001_init.sql` in the Supabase SQL editor.
4. `pnpm seed` (creates bucket + loads current content).
5. `pnpm dev` → visit `/admin` → log in.

## 24. Implementation order (do not reorder)

1. Phase 1 — deps + config (Section 5, 6, 14, 21) + `.env.example`.
2. Phase 2 — `interfaces` (7), `context` id (7), `lib/*` (8–13), `lib/data` (17), `scripts/seed.ts` (18).
3. Phase 3 — `app/admin/actions/*` (16), `app/admin/layout.tsx` (15), login page + form, `admin-nav`.
4. Phase 4 — public refactor (19): wrapper slot, layout, footer, sections, `app/page.tsx`,
   `app/works/page.tsx`, `app/about-me/page.tsx`.
5. Phase 5 — admin UI (20): shared form components, project/skill/about/contact pages.
6. Phase 6 — `pnpm typecheck`, `pnpm lint`, fix; confirm no stale imports of
   `projects`/`skills`/`CONTACT_INFO`/`ABOUT_ME_INFO` remain.
