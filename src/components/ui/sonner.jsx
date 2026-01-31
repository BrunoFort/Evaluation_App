"use client";
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-neutral-900 group-[.toaster]:border-neutral-300 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-neutral-600",
          actionButton:
            "group-[.toast]:bg-purple-600 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-neutral-200 group-[.toast]:text-neutral-600",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
