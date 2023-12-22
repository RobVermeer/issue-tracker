import { getIssuesForProject } from "@/lib/issue"
import { EmptyState } from "@/components/EmptyState"
import {
  Activity,
  BadgeInfo,
  Bug,
  ListPlus,
  ServerCrash,
  Siren,
} from "lucide-react"
import { Badge } from "../ui/badge"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { ScrollArea } from "../ui/scroll-area"

interface Props {
  projectId?: string
}

export async function Issues({ projectId }: Props) {
  const issues = await getIssuesForProject(projectId)

  return (
    <div className="grid gap-2">
      {issues.length === 0 && (
        <EmptyState icon={<ServerCrash size="48" />} title="No issues yet" />
      )}

      {issues.map(({ id, message, level, createdAt, project, extra }) => (
        <Sheet key={id}>
          <SheetTrigger asChild>
            <div className="border rounded flex items-center gap-2 text-lg overflow-hidden pr-4 cursor-pointer">
              {level === "error" && (
                <div className="border-r p-4 bg-red-500 text-background">
                  <Siren size="24" />
                </div>
              )}
              {level === "info" && (
                <div className="border-r p-4 bg-blue-500 text-background">
                  <BadgeInfo size="24" />
                </div>
              )}
              {level === "debug" && (
                <div className="border-r p-4 bg-green-500 text-background">
                  <Bug size="24" />
                </div>
              )}
              <div className="overflow-hidden">
                <p className="truncate">{message}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(createdAt).toLocaleDateString("en", {
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </p>
              </div>
              <Badge variant="outline" className="ml-auto">
                {project.name}
              </Badge>
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="flex gap-2 items-center">
                <Activity className="text-primary" /> Issue
              </SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-full pb-8">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-foreground">
                    Project
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                    <Badge variant="outline">{project.name}</Badge>
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-foreground">
                    Message
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                    {message}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-foreground">
                    Created at
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                    {new Date(createdAt).toLocaleDateString("en", {
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-foreground">
                    Level
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                    <Badge variant="secondary">{level}</Badge>
                  </dd>
                </div>

                {extra &&
                  Object.entries(JSON.parse(extra)).map(([key, value]) => (
                    <div
                      key={key}
                      className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                    >
                      <dt className="text-sm font-medium leading-6 text-foreground">
                        {key}
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-muted-foreground sm:col-span-2 sm:mt-0">
                        {value as string}
                      </dd>
                    </div>
                  ))}
              </dl>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
