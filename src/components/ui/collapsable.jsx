"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root
Collapsible.displayName = "Collapsible"

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger
CollapsibleTrigger.displayName = "CollapsibleTrigger"

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent
CollapsibleContent.displayName = "CollapsibleContent"

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
}
