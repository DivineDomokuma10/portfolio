"use client";
import { useState } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function TagInput({ value, onChange, placeholder }: TagInputProps) {
  const [draft, setDraft] = useState("");

  function addTag() {
    const tag = draft.trim();
    if (!tag) return;
    setDraft("");
    if (value.includes(tag)) return;
    onChange([...value, tag]);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    } else if (event.key === "Backspace" && draft === "" && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2 border border-secondary bg-background px-2 py-1.5 transition-colors focus-within:border-primary">
      {value.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 rounded-sm bg-primary-opacity px-2 py-1 text-xs text-white"
        >
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            onClick={() => onChange(value.filter((item) => item !== tag))}
            className="text-secondary transition-colors hover:text-red-400"
          >
            <X size={12} />
          </button>
        </span>
      ))}

      <input
        type="text"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        placeholder={placeholder}
        className="min-w-24 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-secondary"
      />
    </div>
  );
}
