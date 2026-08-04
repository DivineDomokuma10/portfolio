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
