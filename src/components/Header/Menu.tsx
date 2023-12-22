"use client"

import { Session } from "next-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "next-auth/react"
import { Activity, Gift, ListTodo, LogOut, MenuIcon } from "lucide-react"
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/Logo"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"
import { getInitials } from "@/lib/string"

interface Props {
  session: Session
}

export function Menu({ session }: Props) {
  const [open, setOpen] = useState(false)
  const initials = getInitials(session.user.name)

  const close = () => setOpen(false)
  const logout = () => {
    signOut()
    close()
  }

  return (
    <div className="flex gap-2">
      <Link href="/profile" scroll={false}>
        <Avatar className="border border-slate-500 cursor-pointer">
          {session.user.image && (
            <AvatarImage
              src={session.user.image}
              alt={`@${session.user.name}`}
            />
          )}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </Link>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="relative text-white">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="top">
          <div className="grid gap-3 max-w-md mx-auto">
            <SheetHeader>
              <SheetTitle>
                <Logo
                  className="justify-center text-slate-900 dark:text-white"
                  onClick={close}
                />
              </SheetTitle>
            </SheetHeader>

            <Link
              href="/"
              scroll={false}
              onClick={close}
              className="flex gap-2 items-center mt-4"
            >
              <Activity
                className="text-orange-500"
                size="18"
                strokeWidth="2.5"
              />{" "}
              Issues
            </Link>

            <Separator />

            <a
              href="https://36.robvermeer.nl"
              className="flex gap-2 items-center"
            >
              <ListTodo
                className="text-green-400"
                size="18"
                strokeWidth="2.5"
              />{" "}
              36 hours
            </a>

            <a
              href="https://wishlist.ru-coding.nl"
              className="flex gap-2 items-center"
            >
              <Gift className="text-rose-600" size="18" strokeWidth="2.5" />{" "}
              Wishlist
            </a>

            <Button
              variant="secondary"
              className="flex gap-2 items-center mt-5"
              onClick={logout}
            >
              <LogOut className="text-red-500 dark:text-red-400" size="16" />{" "}
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
