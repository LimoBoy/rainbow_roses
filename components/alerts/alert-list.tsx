"use client";

import {
    AlertCircleIcon,
    BellIcon,
    CheckCircle2Icon,
    InfoIcon,
    RocketIcon,
    ShieldIcon,
    StarIcon,
    TriangleAlertIcon,
    XIcon,
    ZapIcon,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import {AlertColor, AlertIconName, AlertItemProps, useAlertStore} from "@/app/stores/alert-store";
import React from "react";

const colorStyles: Record<AlertColor, string> = {
    default: "",
    destructive: "",
    success:
        "border-green-500/50 text-green-700 dark:text-green-400 [&>svg]:text-green-600 dark:[&>svg]:text-green-400 bg-green-50 dark:bg-green-950/30",
    warning:
        "border-yellow-500/50 text-yellow-700 dark:text-yellow-400 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/30",
    info:
        "border-blue-500/50 text-blue-700 dark:text-blue-400 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400 bg-blue-50 dark:bg-blue-950/30",
}

const defaultIcons: Record<AlertColor, typeof InfoIcon> = {
    default: InfoIcon,
    destructive: AlertCircleIcon,
    success: CheckCircle2Icon,
    warning: TriangleAlertIcon,
    info: InfoIcon,
}

const iconMap: Record<AlertIconName, typeof InfoIcon> = {
    rocket: RocketIcon,
    bell: BellIcon,
    star: StarIcon,
    shield: ShieldIcon,
    zap: ZapIcon,
}

export function AlertItem({
                              color = "default",
                              icon,
                              title,
                              description,
                              className,
                              onDismiss,
                              duration
                          }: AlertItemProps) {
    const Icon = icon ? iconMap[icon] : defaultIcons[color];
    const variant = color === "destructive" ? "destructive" : "default";

    React.useEffect(() => {
        // duration = 0 means the alert remains visible.
        if (!duration || duration <= 0 || !onDismiss) {
            return
        }

        const timeoutId = window.setTimeout(() => {
            onDismiss()
        }, duration)

        return () => {
            window.clearTimeout(timeoutId)
        }
    }, [duration, onDismiss])

    return (
        <Alert
            variant={variant}
            className={cn("relative w-full pr-10 cursor-pointer", colorStyles[color], className)}
            onClick={onDismiss}
        >
            {Icon && <Icon />}
            {title && <AlertTitle>{title}</AlertTitle>}
            {description && <AlertDescription>{description}</AlertDescription>}
            {onDismiss && (
                <button
                    type="button"
                    onClick={onDismiss}
                    aria-label="Dismiss alert"
                    className="cursor-pointer absolute right-2 top-2 rounded-md p-1 text-current/70 hover:text-current hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                    <XIcon className="size-4" />
                </button>
            )}
        </Alert>
    )
}

export interface AlertListProps {
    className?: string
    dismissible?: boolean
}

export function AlertList({ className, dismissible = true }: AlertListProps) {
    const alerts = useAlertStore((s) => s.alerts)
    const removeAlert = useAlertStore((s) => s.removeAlert)

    if (alerts.length === 0) return null

    return (
        <div className={cn("flex w-96 flex-col gap-3", className)}>
            {alerts.map((alert) => (
                <AlertItem
                    key={alert.id}
                    {...alert}
                    onDismiss={dismissible ? () => removeAlert(alert.id) : undefined}
                />
            ))}
        </div>
    )
}

// --- Example usage ---
// Layout (put once, e.g. in app/layout.tsx or a client wrapper it renders):
//
// <div className="fixed top-4 right-4 z-50">
//   <AlertList />
// </div>
//
// Anywhere in a Client Component, trigger an alert (must be called from
// client code — e.g. inside an onClick/onSubmit handler or useEffect):
//
// "use client"
// import { useAlertStore } from "@/stores/alert-store"
//
// function PaymentForm() {
//   const addAlert = useAlertStore((s) => s.addAlert)
//
//   async function onSubmit() {
//     try {
//       await pay()
//       addAlert({
//         color: "success",
//         title: "Payment successful",
//         description: "Your payment has been processed.",
//       })
//     } catch {
//       addAlert({
//         color: "destructive",
//         title: "Payment failed",
//         description: "Please check your payment method and try again.",
//       })
//     }
//   }
// }
//
// Note: color already picks a sensible default icon (info/alert-circle/
// check/triangle-alert). Only pass `icon` (one of "rocket" | "bell" |
// "star" | "shield" | "zap") when you want to override it — and always as
// a string name, never a component reference.
