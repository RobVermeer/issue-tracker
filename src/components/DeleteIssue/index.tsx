"use client"

import { Trash } from "lucide-react"
import { Button } from "../ui/button"
import { deleteIssueById } from "@/lib/issue"

interface Props {
  id: string
}

export function DeleteIssue({ id }: Props) {
  async function handleRemove() {
    await deleteIssueById(id)
  }

  return (
    <form action={handleRemove}>
      <Button className="w-full" type="submit" variant="destructive">
        <Trash size="16" className="mr-2" /> Remove issue
      </Button>
    </form>
  )
}
