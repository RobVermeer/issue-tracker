"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { prisma } from "@/lib/prisma"
import { cache } from "react"

export const getIssuesForProject = cache(async (projectId?: string) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error("Not authenticated")
  }

  const issues = await prisma.issue.findMany({
    where: {
      projectId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      project: {
        select: {
          name: true,
        },
      },
    },
  })

  return issues
})
