import { prisma } from "@/lib/prisma"

interface Params {
  id: string
}

export async function POST(request: Request, params: Params) {
  try {
    const { id } = params
    const { message, level, extra } = await request.json()

    const project = await prisma.project.findFirstOrThrow({
      where: {
        id,
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
