import { create } from "zustand"
import type { ReactNode } from "react"

export type AlertColor =
    | "default"
    | "destructive"
    | "success"
    | "warning"
    | "info"

// Keep this list in sync with `iconMap` in alert-list.tsx. Using a string
// key (instead of storing the component itself) keeps AlertConfig a plain,
// serializable object, so it's safe to build/pass around from Server
// Components without hitting "Only plain objects can be passed to Client
// Components" errors.
export type AlertIconName = "rocket" | "bell" | "star" | "shield" | "zap"

export interface AlertConfig {
    id: string | number
    color?: AlertColor
    /** Optional override; omit to use the default icon for `color`. */
    icon?: AlertIconName
    title?: ReactNode
    description?: ReactNode
    className?: string
    duration?: number
}

/** Props for the presentational AlertItem component (adds onDismiss). */
export interface AlertItemProps extends Omit<AlertConfig, "id"> {
    onDismiss?: () => void
}

interface AlertStore {
    alerts: AlertConfig[]
    /** Adds an alert. Auto-generates an id if one isn't provided. */
    addAlert: (
        alert: Omit<AlertConfig, "id"> & { id?: string | number }
    ) => string | number
    removeAlert: (id: string | number) => void
    clearAlerts: () => void
}

export const useAlertStore = create<AlertStore>((set) => ({
    alerts: [
        // {
        //     id: "seed-1",
        //     color: "destructive",
        //     title: "Payment failed",
        //     description:
        //         "Your payment could not be processed. Please check your payment method and try again.",
        // },
        // {
        //     id: "seed-2",
        //     color: "success",
        //     title: "Payment successful",
        //     description: "Your payment has been processed.",
        // },
        // {
        //     id: "seed-3",
        //     color: "warning",
        //     title: "Storage almost full",
        //     description: "You're using 92% of your available storage.",
        // },
        // {
        //     id: "seed-4",
        //     color: "info",
        //     icon: "rocket",
        //     title: "New feature",
        //     description: "Dark mode is now available in settings.",
        // },
    ],
    addAlert: (alert) => {
        const id = alert.id ?? crypto.randomUUID()
        set((state) => ({ alerts: [...state.alerts, { ...alert, id, duration: alert.duration ?? 5000, }] }))
        return id
    },
    removeAlert: (id) => {
        set((state) => ({ alerts: state.alerts.filter((a) => a.id !== id) }))
    },
    clearAlerts: () => set({ alerts: [] }),
}));