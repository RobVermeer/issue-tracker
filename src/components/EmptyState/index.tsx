import { ReactNode } from "react"

interface Props {
  icon?: ReactNode
  title: ReactNode
  children?: ReactNode
}

export const EmptyState = ({ icon, title, children }: Props) => (
  <div className="grid gap-1 justify-center text-center">
    {icon && <div className="flex justify-center mb-2">{icon}</div>}
    <h3 className="text-xl text-secondary-foreground">{title}</h3>
    {children && <p className="text-muted-foreground">{children}</p>}
  </div>
)
