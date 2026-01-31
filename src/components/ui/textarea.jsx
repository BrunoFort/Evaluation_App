import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[60px] w-full rounded-md",
        "border border-neutral-300 bg-transparent",
        "px-3 py-2 text-base md:text-sm",
        "placeholder:text-neutral-600",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
