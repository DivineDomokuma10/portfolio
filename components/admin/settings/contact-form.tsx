"use client";
import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";

import { updateSettingsAction } from "@/app/admin/actions/settings";
import { settingsSchema, type SettingsInput } from "@/lib/validators";
import { CONTACT_ICONS } from "@/lib/icons";
import type { ISettings } from "@/interfaces";

import { FormField, fieldClass } from "../shared/form-field";
import { SubmitButton } from "../shared/submit-button";

interface ContactFormProps {
  settings: ISettings;
}

const ICON_OPTIONS = Object.keys(CONTACT_ICONS);

export function ContactForm({ settings }: ContactFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      aboutParagraphs: settings.aboutParagraphs,
      contact: settings.contact,
    },
  });

  const { fields, append, remove } = useFieldArray<SettingsInput, "contact">({
    control,
    name: "contact",
  });

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
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid items-start gap-3 border border-secondary p-3 md:grid-cols-[10rem_1fr_1fr_auto]"
          >
            <FormField label="Icon">
              <select
                {...register(`contact.${index}.icon`)}
                className={fieldClass}
              >
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Text" error={errors.contact?.[index]?.text?.message}>
              <input
                {...register(`contact.${index}.text`)}
                className={fieldClass}
                aria-invalid={Boolean(errors.contact?.[index]?.text)}
              />
            </FormField>

            <FormField label="Link" error={errors.contact?.[index]?.link?.message}>
              <input
                {...register(`contact.${index}.link`)}
                className={fieldClass}
                aria-invalid={Boolean(errors.contact?.[index]?.link)}
              />
            </FormField>

            <button
              type="button"
              onClick={() => remove(index)}
              aria-label="Remove contact"
              className="shrink-0 self-end p-2 text-secondary transition-colors hover:text-red-400"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div>
        <button
          type="button"
          onClick={() =>
            append({ icon: "mail", link: "", text: "" })
          }
          className="flex items-center gap-1.5 text-xs text-primary transition-colors hover:text-white"
        >
          <Plus size={14} />
          Add contact
        </button>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <SubmitButton isPending={isPending}>Save contact</SubmitButton>
    </form>
  );
}
