"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { prisma } from "@/lib/prisma"
import { cache } from "react"

export const getProjectsForUser = cache(async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("Not authenticated")
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: session.user.id,
    },
  })

  return projects
})
