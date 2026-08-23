"use client";
import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// shadcn/ui components (from "@/components/ui/...")
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {useModalStore} from "@/app/stores/modal-store";
import ForgotPasswordPage from "@/components/modals/forgot-password/forgot-password";
import { useAlertStore } from "@/app/stores/alert-store";

interface LoginFormState {
    email: string;
    password: string;
}

type TextField = "email" | "password";

export default function LoginPage() {
    const router = useRouter();
    const openModal = useModalStore((s) => s.openModal);
    const addAlert = useAlertStore((s) => s.addAlert);
    const [form, setForm] = useState<LoginFormState>({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange =
        (field: TextField) => (e: React.ChangeEvent<HTMLInputElement>) =>
            setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await signIn("credentials", {
                email: form.email,
                password: form.password,
                redirect: false,
            });

            if (result?.error) {
                addAlert({
                    color: "destructive",
                    title: "Unable to sign in",
                    description: "Check your email, password, and account activation status.",
                });
                return;
            }

            const session = await getSession();
            const destination = session?.user?.role === "ADMIN" ? "/admin" : "/dashboard";

            router.replace(destination);
            router.refresh();
        } catch {
            addAlert({
                color: "destructive",
                title: "Unable to sign in",
                description: "Check your connection and try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white flex justify-center">
            <div className="w-full max-w-md px-6 pt-6 pb-16 relative">
                {/* Close / back chevron */}

                <h1 className="text-center text-2xl font-medium tracking-wide text-neutral-900 mt-6 mb-10">
                    LOGIN
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-neutral-900">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange("email")}
                            className="h-11 rounded-md border-neutral-300"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-sm font-medium text-neutral-900">
                                Password
                            </Label>
                            <div className="cursor-pointer text-sm text-neutral-500 hover:text-neutral-700"
                                 onClick={() =>
                                     openModal(
                                         <ForgotPasswordPage/>,
                                         { title: "Forgot Password?" }
                                     )
                                 }
                            >
                                Forgot password?
                            </div>
                        </div>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange("password")}
                            className="h-11 rounded-md border-neutral-300"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-12 bg-[#0f1330] hover:bg-[#0f1330]/90 text-white text-sm tracking-wide rounded-md cursor-pointer"
                    >
                        {isSubmitting ? "LOGGING IN..." : "LOGIN"}
                    </Button>
                </form>

                <div className="flex items-center gap-4 my-6">
                    <div className="h-px flex-1 bg-neutral-200" />
                    <span className="text-xs text-neutral-400">or</span>
                    <div className="h-px flex-1 bg-neutral-200" />
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 rounded-md border-neutral-300 text-neutral-900 font-normal flex items-center justify-center gap-2 cursor-pointer"
                >
                    <GoogleIcon className="w-4 h-4" />
                    Sign in with Google
                </Button>

                <div className="h-px bg-neutral-200 my-6" />

                <p className="text-center text-sm text-neutral-500">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="font-semibold text-neutral-900">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

function GoogleIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24">
            <path
                fill="#4285F4"
                d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z"
            />
            <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.07 7.94-2.92l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.12 0-5.76-2.11-6.71-4.94H1.29v3.1A12 12 0 0 0 12 24z"
            />
            <path
                fill="#FBBC05"
                d="M5.29 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.29a12 12 0 0 0 0 10.78z"
            />
            <path
                fill="#EA4335"
                d="M12 4.75c1.76 0 3.35.61 4.6 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.29 6.61l4 3.1C6.24 6.86 8.88 4.75 12 4.75z"
            />
        </svg>
    );
}
