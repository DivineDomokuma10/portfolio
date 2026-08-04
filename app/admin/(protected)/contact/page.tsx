import { getSettings } from "@/lib/data/settings";

import { ContactForm } from "@/components/admin/settings/contact-form";

export default async function AdminContactPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-12">
      <h1 className="text-2xl font-semibold text-white">Contact</h1>

      <section className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-wide text-secondary">
          Channels
        </h2>
        <ContactForm settings={settings} />
      </section>
    </div>
  );
}
