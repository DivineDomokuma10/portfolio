"use client";
import { useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";

import { updateSettingsAction } from "@/app/admin/actions/settings";
import { settingsSchema, type SettingsInput } from "@/lib/validators";
import type { ISettings } from "@/interfaces";

import { fieldClass } from "../shared/form-field";
import { SubmitButton } from "../shared/submit-button";

interface AboutFormProps {
  settings: ISettings;
}

export function AboutForm({ settings }: AboutFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      aboutParagraphs: settings.aboutParagraphs,
      contact: settings.contact,
    },
  });

  const paragraphs = useWatch({ control, name: "aboutParagraphs" }) ?? [];

  function addParagraph() {
    setValue("aboutParagraphs", [...paragraphs, ""]);
  }

  function removeParagraph(index: number) {
    setValue(
      "aboutParagraphs",
      paragraphs.filter((_, i) => i !== index),
    );
  }

  function onSubmit(values: SettingsInput) {
    setError(null);
    startTransition(async () => {
      try {
        const result = await updateSettingsAction(values);
        if (!result.ok) setError(result.error);
      } catch {
        setError("Something went wrong.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-3">
        {paragraphs.map((_, index) => (
          <div key={index} className="flex items-start gap-2">
            <textarea
              {...register(`aboutParagraphs.${index}`)}
              rows={3}
              className={fieldClass}
              aria-invalid={Boolean(errors.aboutParagraphs?.[index])}
            />

            <button
              type="button"
              onClick={() => removeParagraph(index)}
              aria-label="Remove paragraph"
              className="shrink-0 p-2 text-secondary transition-colors hover:text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      {errors.aboutParagraphs?.message && (
        <p className="text-xs text-red-400">{errors.aboutParagraphs.message}</p>
      )}

      <div>
        <button
          type="button"
          onClick={addParagraph}
          className="flex items-center gap-1.5 text-xs text-primary transition-colors hover:text-white"
        >
          <Plus size={14} />
          Add paragraph
        </button>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <SubmitButton isPending={isPending}>Save about</SubmitButton>
    </form>
  );
}
