"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getProjectsForUser } from "@/lib/project"
import { redirect, useParams } from "next/navigation"

interface Props {
  projects: NonNullable<Awaited<ReturnType<typeof getProjectsForUser>>>
}

export function ProjectSelect({ projects }: Props) {
  const { projectId = "---" } = useParams<{ projectId?: string }>()

  function handleChange(value: string) {
    if (value === "---") {
      redirect("/")
    }

    redirect(`/project/${value}`)
  }

  return (
    <Select onValueChange={handleChange} defaultValue={projectId}>
      <SelectTrigger className="w-auto">
        <SelectValue placeholder="Select Project" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="---">All projects</SelectItem>
          {projects.map(({ id, name }) => (
            <SelectItem key={id} value={id}>
              {name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
