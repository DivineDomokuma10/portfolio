"use client";
import { useState, useTransition } from "react";

import { deleteProjectAction } from "@/app/admin/actions/projects";
import type { IProject } from "@/interfaces";

import { ProjectForm } from "./project-form";
import { ConfirmButton } from "../shared/confirm-button";

interface ProjectListProps {
  projects: IProject[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function handleDelete(id: string) {
    startTransition(async () => {
      try {
        const result = await deleteProjectAction(id);
        if (!result.ok) setError(result.error);
      } catch {
        setError("Something went wrong.");
      }
    });
  }

  if (projects.length === 0) {
    return <p className="text-secondary text-sm">No projects yet.</p>;
  }

  return (
    <div className="space-y-3">
      {error && <p className="text-xs text-red-400">{error}</p>}

      {projects.map((project) => (
        <div key={project.id} className="border border-secondary p-4">
          {editingId === project.id ? (
            <ProjectForm initial={project} onSaved={() => setEditingId(null)} />
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-white">{project.title}</h3>
                <p className="text-xs text-secondary">
                  {project.category} · {project.techs.length} tools
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingId(project.id)}
                  className="border border-secondary px-3 py-1.5 text-xs text-white transition-colors hover:border-primary"
                >
                  Edit
                </button>

                <ConfirmButton onConfirm={() => handleDelete(project.id)} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
