import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = ({ className, children, ...props }) => (
  <span
    className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800", className)}
    {...props}
  >
    {children}
  </span>
)

export { Badge }
