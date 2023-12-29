import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { LoginForm } from "@/components/LoginForm"

export default async function Login() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/")
  }

  return <LoginForm />
}
