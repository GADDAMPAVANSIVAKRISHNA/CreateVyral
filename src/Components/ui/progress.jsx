import * as React from "react"
import { cn } from "@/lib/utils"

const Progress = ({ value = 0, className, ...props }) => {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div className={cn("w-full bg-gray-100 rounded-full h-2 overflow-hidden", className)} {...props}>
      <div className="h-full bg-indigo-500" style={{ width: `${pct}%` }} />
    </div>
  )
}

export { Progress }
