"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close
const SheetPortal = DialogPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Backdrop>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Backdrop>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Backdrop
    className={cn(
      "fixed inset-0 z-[110] bg-black/40 backdrop-blur-xs transition-opacity duration-300",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = DialogPrimitive.Backdrop.displayName

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Popup>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Popup>
>(({ className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <DialogPrimitive.Popup
      ref={ref}
      className={cn(
        "fixed top-0 right-0 z-[120] h-screen w-80 bg-white dark:bg-stone-950 text-foreground shadow-2xl transition-transform duration-300 ease-in-out border-l border-stone-100 dark:border-stone-850 focus:outline-none flex flex-col justify-between",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Popup>
  </SheetPortal>
))
SheetContent.displayName = DialogPrimitive.Popup.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
}
