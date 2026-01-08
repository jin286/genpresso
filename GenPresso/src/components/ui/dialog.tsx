"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog@1.1.6";
import { X } from "lucide-react";

import { cn } from "./utils";
import { CloseButton } from "./close-button";

const Dialog = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Root>,
  React.ComponentProps<typeof DialogPrimitive.Root>
>((props, ref) => {
  return <DialogPrimitive.Root ref={ref} data-slot="dialog" {...props} />;
});

Dialog.displayName = "Dialog";

const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  React.ComponentProps<typeof DialogPrimitive.Trigger>
>((props, ref) => {
  return <DialogPrimitive.Trigger ref={ref} data-slot="dialog-trigger" {...props} />;
});

DialogTrigger.displayName = "DialogTrigger";

const DialogPortal = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Portal>,
  React.ComponentProps<typeof DialogPrimitive.Portal>
>((props, ref) => {
  return <DialogPrimitive.Portal ref={ref} data-slot="dialog-portal" {...props} />;
});

DialogPortal.displayName = "DialogPortal";

const DialogClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentProps<typeof DialogPrimitive.Close>
>((props, ref) => {
  return <DialogPrimitive.Close ref={ref} data-slot="dialog-close" {...props} />;
});

DialogClose.displayName = "DialogClose";

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentProps<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-[100] bg-black/50",
        className,
      )}
      {...props}
    />
  );
});

DialogOverlay.displayName = "DialogOverlay";

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentProps<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-[100] grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close asChild>
          <div className="absolute right-2.5 top-2.5 z-50">
            <CloseButton 
              onClick={() => {}} 
              ariaLabel="닫기"
              size="sm"
            />
          </div>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});

DialogContent.displayName = "DialogContent";

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
});

DialogHeader.displayName = "DialogHeader";

const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
});

DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentProps<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Title
      ref={ref}
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  );
});

DialogTitle.displayName = "DialogTitle";

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentProps<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => {
  return (
    <DialogPrimitive.Description
      ref={ref}
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
});

DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
