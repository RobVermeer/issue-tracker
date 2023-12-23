"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { prisma } from "@/lib/prisma"
import { cache } from "react"
import { revalidatePath } from "next/cache"
import { getErrorMessage } from "../utils"
import crypto from "crypto"

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

export const createProjectForUser = async (formData: FormData) => {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      throw new Error("No access")
    }

    const userId = session.user.id
    const name = formData.get("name")?.toString()

    if (!name) {
      throw new Error("Name is required")
    }

    const secret = crypto.randomBytes(32).toString("base64url")

    await prisma.project.create({
      data: {
        name,
        userId,
        secret,
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
