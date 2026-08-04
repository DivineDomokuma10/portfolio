"use client";
import { useState, useTransition } from "react";

import { deleteSkillCategoryAction } from "@/app/admin/actions/skills";
import type { ISkillCategory } from "@/interfaces";

import { SkillForm } from "./skill-form";
import { ConfirmButton } from "../shared/confirm-button";

interface SkillListProps {
  categories: ISkillCategory[];
}

export function SkillList({ categories }: SkillListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  function handleDelete(id: string) {
    startTransition(async () => {
      try {
        const result = await deleteSkillCategoryAction(id);
        if (!result.ok) setError(result.error);
      } catch {
        setError("Something went wrong.");
      }
    });
  }

  if (categories.length === 0) {
    return <p className="text-secondary text-sm">No skill categories yet.</p>;
  }

  return (
    <div className="space-y-3">
      {error && <p className="text-xs text-red-400">{error}</p>}

      {categories.map((category) => (
        <div key={category.id} className="border border-secondary p-4">
          {editingId === category.id ? (
            <SkillForm initial={category} onSaved={() => setEditingId(null)} />
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-white">{category.name}</h3>
                <p className="text-xs text-secondary">
                  {category.techs.length} tools
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditingId(category.id)}
                  className="border border-secondary px-3 py-1.5 text-xs text-white transition-colors hover:border-primary"
                >
                  Edit
                </button>

                <ConfirmButton onConfirm={() => handleDelete(category.id)} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
