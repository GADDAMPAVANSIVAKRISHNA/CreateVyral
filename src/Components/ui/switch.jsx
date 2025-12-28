import * as React from "react"
import { cn } from "@/lib/utils"

const Switch = ({ checked = false, onCheckedChange = () => {}, className, ...props }) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
        checked ? 'bg-indigo-600' : 'bg-gray-200',
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 transform rounded-full bg-white transition-transform",
          checked ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </button>
  )
}

export { Switch }
