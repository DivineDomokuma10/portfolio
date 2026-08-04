import { getSkillCategories } from "@/lib/data/skills";

import { SkillForm } from "@/components/admin/skills/skill-form";
import { SkillList } from "@/components/admin/skills/skill-list";

export default async function AdminSkillsPage() {
  const categories = await getSkillCategories();

  return (
    <div className="space-y-12">
      <h1 className="text-2xl font-semibold text-white">Skills</h1>

      <section className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-wide text-secondary">
          Add category
        </h2>
        <SkillForm />
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-wide text-secondary">
          Existing
        </h2>
        <SkillList categories={categories} />
      </section>
    </div>
  );
}
