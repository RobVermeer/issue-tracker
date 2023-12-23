"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ClipboardCopy, Eye, EyeOff, Plus, Settings, Trash } from "lucide-react"
import {
  deleteProjectById,
  editProjectForUser,
  getProjectsForUser,
} from "@/lib/project"

interface Props {
  project: Awaited<ReturnType<typeof getProjectsForUser>>[0]
}

export const EditProject = ({ project }: Props) => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [showSecret, setShowSecret] = useState(false)

  async function handleSubmit(data: FormData) {
    const { type, errors } = await editProjectForUser(project.id, data)

    if (type === "error") {
      return errors.map((title) => {
        toast({
          variant: "destructive",
          title,
        })
      })
    }

    setOpen(false)
  }

  async function handleRemove() {
    await deleteProjectById(project.id)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="absolute right-1" variant="outline">
          <Settings size="16" className="mr-2" /> Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Project settings</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} id="edit" className="grid gap-4 py-4">
          <Label htmlFor="name">Name</Label>
          <Input required id="name" name="name" defaultValue={project.name} />
          <Label htmlFor="secret" className="flex gap-2 items-center">
            Secret{" "}
            <button
              onClick={() => setShowSecret((prev) => !prev)}
              type="button"
            >
              {showSecret ? <EyeOff size="16" /> : <Eye size="16" />}
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(project.secret)
                toast({ title: "Secret copied" })
              }}
              type="button"
            >
              <ClipboardCopy size="16" />
            </button>
          </Label>
          <Input
            type={showSecret ? "text" : "password"}
            id="secret"
            value={project.secret}
            readOnly
          />
          <Label htmlFor="url" className="flex gap-2 items-center">
            URL{" "}
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://issue.robvermeer.nl/api/${project.id}`
                )
                toast({ title: "URL copied" })
              }}
              type="button"
            >
              <ClipboardCopy size="16" />
            </button>
          </Label>
          <Input
            id="url"
            value={`https://issue.robvermeer.nl/api/${project.id}`}
            readOnly
          />
        </form>
        <DialogFooter className="gap-2 md:gap-0">
          <form action={handleRemove}>
            <Button className="w-full" type="submit" variant="outline">
              <Trash size="16" className="mr-2" /> Remove project
            </Button>
          </form>
          <Button type="submit" form="edit">
            <Plus size="16" className="mr-2" /> Save project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
