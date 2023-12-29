"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Chrome, Github } from "lucide-react"

export function LoginForm() {
  return (
    <main className="grid gap-3 p-4 mb-8 mx-auto md:max-w-[592px]">
      <Button variant="secondary" onClick={() => signIn("github")}>
        <Github size="18" className="mr-2" /> Login with Github
      </Button>
      <Button variant="secondary" onClick={() => signIn("google")}>
        <Chrome size="18" className="mr-2" /> Login with Google
      </Button>
    </main>
  )
}
