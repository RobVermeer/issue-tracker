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
import { Plus } from "lucide-react"
import { createProjectForUser } from "@/lib/project"

export const NewProject = () => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  async function handleSubmit(data: FormData) {
    const { type, errors } = await createProjectForUser(data)

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus size="16" className="mr-2" /> New project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} id="add" className="grid gap-4 py-4">
          <Label htmlFor="name">Name</Label>
          <Input required id="name" name="name" />
        </form>
        <DialogFooter>
          <Button type="submit" form="add">
            <Plus size="16" className="mr-2" /> Create project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
