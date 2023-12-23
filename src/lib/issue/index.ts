"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { prisma } from "@/lib/prisma"
import { cache } from "react"
import { revalidatePath } from "next/cache"
import { getErrorMessage } from "../utils"

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

export const deleteIssueById = async (id: string) => {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      throw new Error("No access")
    }

    await prisma.issue.delete({
      where: {
        id,
        project: {
          userId: session.user.id,
        },
      },
    })

    revalidatePath("/")

    return {
      type: "success" as const,
    }
  } catch (error) {
    return {
      type: "error" as const,
      errors: [getErrorMessage(error)],
    }
  }
}
