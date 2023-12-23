import { EditProject } from "@/components/EditProject"
import { EmptyState } from "@/components/EmptyState"
import { Issues } from "@/components/Issues"
import { NewProject } from "@/components/NewProject"
import { ProjectSelect } from "@/components/ProjectSelect"
import { getProjectsForUser } from "@/lib/project"
import { ServerCog } from "lucide-react"
import Link from "next/link"

export default async function Home() {
  const projects = await getProjectsForUser()

  return (
    <main className="grid gap-6 p-4 mb-8 mx-auto md:max-w-xl">
      {projects.length === 0 && (
        <EmptyState icon={<ServerCog size="48" />} title="No projects found" />
      )}

      {projects.length > 0 && (
        <>
          <h2 className="text-lg">Projects</h2>

          <div className="grid gap-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center pr-24 font-semibold relative rounded-md p-3 bg-secondary hover:ring-2 ring-inset ring-primary transition-all"
              >
                {project.name}

                <EditProject project={project} />
              </div>
            ))}
          </div>
        </>
      )}

      <NewProject />
    </main>
  )
}
