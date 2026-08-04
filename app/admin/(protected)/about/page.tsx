import { getSettings } from "@/lib/data/settings";

import { AboutForm } from "@/components/admin/settings/about-form";

export default async function AdminAboutPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-12">
      <h1 className="text-2xl font-semibold text-white">About Me</h1>

      <section className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-wide text-secondary">
          Paragraphs
        </h2>
        <AboutForm settings={settings} />
      </section>
    </div>
  );
}
