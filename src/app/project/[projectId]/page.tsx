import { EmptyState } from "@/components/EmptyState"
import { Issues } from "@/components/Issues"
import { ProjectSelect } from "@/components/ProjectSelect"
import { getProjectsForUser } from "@/lib/project"
import { ServerCog } from "lucide-react"
import Link from "next/link"

interface Props {
  params: { projectId: string }
}

export default async function Project({ params }: Props) {
  const projects = await getProjectsForUser()

  return (
    <main className="grid gap-6 p-4 mb-8 mx-auto md:max-w-xl">
      {projects.length === 0 && (
        <EmptyState icon={<ServerCog size="48" />} title="No projects found">
          Create new project in{" "}
          <Link href="/profile" className="text-primary">
            your profile
          </Link>
        </EmptyState>
      )}

      {projects.length > 0 && (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-lg">Dashboard</h1>
            <ProjectSelect projects={projects} />
          </div>

          <Issues projectId={params.projectId} />
        </>
      )}
    </main>
  )
}
