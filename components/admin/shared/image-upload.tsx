"use client";
import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { Loader2, Trash2, Upload } from "lucide-react";

import { uploadImageAction } from "@/app/admin/actions/projects";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024;

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Only PNG, JPEG, or WebP allowed.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Image must be 5MB or smaller.");
      return;
    }

    const formData = new FormData();
    formData.set("file", file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);
      if (!result.ok) {
        setError(result.error);
      } else if (result.data) {
        onChange(result.data.url);
      }
    });
  }

  if (value) {
    return (
      <div className="space-y-2">
        <div className="relative h-32 w-48 overflow-hidden border border-secondary">
          <Image src={value} alt="Upload preview" fill sizes="192px" className="object-cover" />
        </div>
        <button
          type="button"
          onClick={() => onChange("")}
          className="flex items-center gap-1.5 text-xs text-red-400 transition-colors hover:text-red-300"
        >
          <Trash2 size={14} />
          Remove image
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={isPending}
        className="flex items-center gap-2 border border-secondary px-3 py-2 text-sm text-white transition-colors hover:border-primary disabled:opacity-60"
      >
        {isPending ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Upload size={14} />
        )}
        {isPending ? "Uploading…" : "Upload image"}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
