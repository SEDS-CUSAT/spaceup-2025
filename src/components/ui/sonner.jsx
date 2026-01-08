"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner";

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: "group border border-neutral-800 bg-black/90 backdrop-blur-xl text-neutral-100 shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)]",
          description: "text-neutral-400",
          actionButton: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600",
          cancelButton: "bg-neutral-800 text-neutral-200 hover:bg-neutral-700",
          success: "border-green-500/30 bg-green-500/10 text-green-400",
          error: "border-red-500/30 bg-red-500/10 text-red-400",
          warning: "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
          info: "border-blue-500/30 bg-blue-500/10 text-blue-400",
        },
      }}
      style={
        {
          "--normal-bg": "rgba(0, 0, 0, 0.9)",
          "--normal-text": "rgb(245, 245, 245)",
          "--normal-border": "rgb(38, 38, 38)",
          "--border-radius": "0.5rem"
        }
      }
      {...props} />
  );
}

export { Toaster }
