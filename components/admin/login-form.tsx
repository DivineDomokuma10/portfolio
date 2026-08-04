"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginAction } from "@/app/admin/actions/auth";
import { loginSchema } from "@/lib/validators";
import type { z } from "zod";

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: LoginValues) {
    setError(null);
    startTransition(async () => {
      const result = await loginAction(values);
      if (!result.ok) setError(result.error);
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm text-secondary">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
          className="w-full border border-secondary bg-background px-3 py-2 text-sm text-white outline-none transition-colors focus:border-primary"
        />
        {errors.email && (
          <span className="block text-xs text-red-400">{errors.email.message}</span>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm text-secondary">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.password)}
          {...register("password")}
          className="w-full border border-secondary bg-background px-3 py-2 text-sm text-white outline-none transition-colors focus:border-primary"
        />
        {errors.password && (
          <span className="block text-xs text-red-400">
            {errors.password.message}
          </span>
        )}
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full border border-primary px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-primary hover:text-background disabled:opacity-60"
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
