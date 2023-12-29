import { EmptyState } from "@/components/EmptyState"
import { Issues } from "@/components/Issues"
import { ProjectSelect } from "@/components/ProjectSelect"
import { authOptions } from "@/lib/nextAuth"
import { getProjectsForUser } from "@/lib/project"
import { ServerCog } from "lucide-react"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) redirect("/login")

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

          <Issues />
        </>
      )}
    </main>
  )
}
