"use client";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createSkillCategoryAction,
  updateSkillCategoryAction,
} from "@/app/admin/actions/skills";
import { skillSchema, type SkillInput } from "@/lib/validators";
import type { ISkillCategory } from "@/interfaces";

import { FormField, fieldClass } from "../shared/form-field";
import { TagInput } from "../shared/tag-input";
import { ImageUpload } from "../shared/image-upload";
import { SubmitButton } from "../shared/submit-button";

interface SkillFormProps {
  initial?: ISkillCategory;
  onSaved?: () => void;
}

export function SkillForm({ initial, onSaved }: SkillFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillInput>({
    resolver: zodResolver(skillSchema),
    defaultValues: initial
      ? {
          name: initial.name,
          techs: initial.techs,
          imageUrl: initial.imageUrl ?? "",
          sortOrder: initial.sortOrder,
        }
      : { name: "", techs: [], imageUrl: "", sortOrder: 0 },
  });

  function onSubmit(values: SkillInput) {
    setError(null);
    startTransition(async () => {
      try {
        const result = initial
          ? await updateSkillCategoryAction(initial.id, values)
          : await createSkillCategoryAction(values);

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
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Name" error={errors.name?.message}>
          <input
            {...register("name")}
            className={fieldClass}
            aria-invalid={Boolean(errors.name)}
          />
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
          <FormField label="Tools" error={errors.techs?.message}>
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

      {error && <p className="text-xs text-red-400">{error}</p>}

      <SubmitButton isPending={isPending}>
        {initial ? "Save changes" : "Add category"}
      </SubmitButton>
    </form>
  );
}
