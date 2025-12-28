import * as React from "react"
import { cn } from "@/lib/utils"

const Label = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <label
      className={cn("mb-1 block text-sm font-medium text-muted-foreground", className)}
      ref={ref}
      {...props}
    >
      {children}
    </label>
  )
})
Label.displayName = "Label"

export { Label }
