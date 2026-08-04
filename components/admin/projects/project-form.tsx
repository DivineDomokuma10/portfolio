"use client";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createProjectAction,
  updateProjectAction,
} from "@/app/admin/actions/projects";
import { projectSchema, type ProjectInput } from "@/lib/validators";
import type { IProject } from "@/interfaces";

import { FormField, fieldClass } from "../shared/form-field";
import { TagInput } from "../shared/tag-input";
import { ImageUpload } from "../shared/image-upload";
import { SubmitButton } from "../shared/submit-button";

interface ProjectFormProps {
  initial?: IProject;
  onSaved?: () => void;
}

export function ProjectForm({ initial, onSaved }: ProjectFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: initial
      ? {
          title: initial.title,
          description: initial.description,
          category: initial.category,
          techs: initial.techs,
          imageUrl: initial.imageUrl ?? "",
          githubUrl: initial.githubUrl ?? "",
          liveUrl: initial.liveUrl ?? "",
          sortOrder: initial.sortOrder,
        }
      : {
          title: "",
          description: "",
          category: "web",
          techs: [],
          imageUrl: "",
          githubUrl: "",
          liveUrl: "",
          sortOrder: 0,
        },
  });

  function onSubmit(values: ProjectInput) {
    setError(null);
    startTransition(async () => {
      try {
        const result = initial
          ? await updateProjectAction(initial.id, values)
          : await createProjectAction(values);

        if (!result.ok) setError(result.error);
        else if (initial) onSaved?.();
        else reset();
      } catch {
        setError("Something went wrong.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <FormField label="Title" error={errors.title?.message}>
        <input
          {...register("title")}
          className={fieldClass}
          aria-invalid={Boolean(errors.title)}
        />
      </FormField>

      <FormField label="Description" error={errors.description?.message}>
        <textarea
          {...register("description")}
          rows={3}
          className={fieldClass}
          aria-invalid={Boolean(errors.description)}
        />
      </FormField>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Category" error={errors.category?.message}>
          <select
            {...register("category")}
            className={fieldClass}
            aria-invalid={Boolean(errors.category)}
          >
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
          </select>
        </FormField>

        <FormField label="Sort order" error={errors.sortOrder?.message}>
          <input
            type="number"
            min={0}
            {...register("sortOrder", { valueAsNumber: true })}
            className={fieldClass}
            aria-invalid={Boolean(errors.sortOrder)}
          />
        </FormField>
      </div>

      <Controller
        control={control}
        name="techs"
        render={({ field }) => (
          <FormField label="Tech stack" error={errors.techs?.message}>
            <TagInput
              value={field.value}
              onChange={field.onChange}
              placeholder="Type a tool and press Enter"
            />
          </FormField>
        )}
      />

      <Controller
        control={control}
        name="imageUrl"
        render={({ field }) => (
          <FormField label="Image" error={errors.imageUrl?.message}>
            <ImageUpload value={field.value ?? ""} onChange={field.onChange} />
          </FormField>
        )}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Live URL" error={errors.liveUrl?.message}>
          <input
            type="url"
            {...register("liveUrl")}
            className={fieldClass}
            aria-invalid={Boolean(errors.liveUrl)}
          />
        </FormField>

        <FormField label="GitHub URL" error={errors.githubUrl?.message}>
          <input
            type="url"
            {...register("githubUrl")}
            className={fieldClass}
            aria-invalid={Boolean(errors.githubUrl)}
          />
        </FormField>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <SubmitButton isPending={isPending}>
        {initial ? "Save changes" : "Add project"}
      </SubmitButton>
    </form>
  );
}
