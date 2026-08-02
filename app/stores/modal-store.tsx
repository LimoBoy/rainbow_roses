import { create } from "zustand";
import type { ReactNode } from "react";

interface ModalState {
    isOpen: boolean;
    content: ReactNode | null;
    options?: {
        title?: string;
        onClose?: () => void;
    };
    openModal: (content: ReactNode, options?: ModalState["options"]) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
    isOpen: false,
    content: null,
    options: undefined,
    openModal: (content, options) => set({ isOpen: true, content, options }),
    closeModal: () => {
        get().options?.onClose?.();
        set({ isOpen: false, content: null, options: undefined });
    },
}));