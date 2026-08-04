import { getProjects } from "@/lib/data/projects";

import { ProjectForm } from "@/components/admin/projects/project-form";
import { ProjectList } from "@/components/admin/projects/project-list";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-12">
      <h1 className="text-2xl font-semibold text-white">Projects</h1>

      <section className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-wide text-secondary">
          Add project
        </h2>
        <ProjectForm />
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-wide text-secondary">
          Existing
        </h2>
        <ProjectList projects={projects} />
      </section>
    </div>
  );
}
