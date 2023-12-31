import { prisma } from "@/lib/prisma"

interface Params {
  id: string
}

export async function POST(request: Request, { params }: { params: Params }) {
  try {
    const { id } = params
    const { secret = "nope", message, level, extra } = await request.json()

    if (!id) {
      throw new Error("No ID")
    }

    const project = await prisma.project.findUniqueOrThrow({
      where: {
        id,
        secret,
      },
    })

    await prisma.issue.create({
      data: {
        message,
        level,
        extra: extra ? JSON.stringify(extra) : extra,
        projectId: project.id,
      },
    })

    return Response.json({ success: true })
  } catch (error) {
    console.log(error)
    return Response.error()
  }
}
