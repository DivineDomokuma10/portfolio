import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/login-form";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <div className="grid min-h-dvh place-items-center bg-background grid-pattern px-4">
      <div className="w-full max-w-sm border border-secondary bg-background p-6">
        <h1 className="mb-1 text-xl font-semibold text-white">Admin Login</h1>
        <p className="mb-6 text-sm text-secondary">Sign in to manage content.</p>
        <LoginForm />
      </div>
    </div>
  );
}
