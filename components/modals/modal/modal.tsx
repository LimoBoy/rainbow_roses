"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import {useModalStore} from "@/app/stores/modal-store";

export function Modal() {
    const { isOpen, content, options, closeModal } = useModalStore();

    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
        };
        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "overflow-hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.classList.remove("overflow-hidden");
        };
    }, [isOpen, closeModal]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
            onClick={closeModal}
        >
            <div
                className="relative w-full max-w-lg rounded-xl bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {options?.title && (
                    <div className="flex items-center justify-between border-b px-5 py-4">
                        <h2 className="text-lg font-semibold">{options.title}</h2>
                        <button
                            onClick={closeModal}
                            className="rounded-md p-1 text-gray-500 hover:bg-gray-100 cursor-pointer"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                )}
                <div className="p-5">{content}</div>
            </div>
        </div>
    );
}