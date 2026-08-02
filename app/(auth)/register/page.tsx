"use client"
import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useAlertStore} from "@/app/stores/alert-store";

interface SignUpFormState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    subscribe: boolean;
}

type TextField = "firstName" | "lastName" | "email" | "password";

export default function SignUpPage() {
    const addAlert = useAlertStore((s) => s.addAlert);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [form, setForm] = useState<SignUpFormState>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        subscribe: false,
    });

    const handleChange =
        (field: TextField) => (e: React.ChangeEvent<HTMLInputElement>) =>
            setForm((prev) => ({...prev, [field]: e.target.value}));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                password: form.password,
                subscribe: form.subscribe,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            // show data.error to the user (e.g. toast / inline error state)
            addAlert({
                color: "destructive",
                title: data.error,
                description: "Please try again.",
            })
            return;
        }

        // success — e.g. redirect to a "check your email" page
        console.log(data.message, data.user);

        addAlert({
            color: "success",
            title: "Register Success",
            description: "Please verify your email.",
        });


    };

    return (
        <div className="min-h-screen w-full bg-white flex justify-center">
            <div className="w-full max-w-md px-6 pt-6 pb-16 relative">
                {/* Close / back chevron */}

                <h1 className="text-center text-2xl font-medium tracking-wide text-neutral-900 mt-6 mb-10">
                    SIGN UP
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-sm font-medium text-neutral-900">
                                First Name
                            </Label>
                            <Input
                                id="firstName"
                                value={form.firstName}
                                onChange={handleChange("firstName")}
                                className="h-11 rounded-md border-neutral-300"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-sm font-medium text-neutral-900">
                                Last Name
                            </Label>
                            <Input
                                id="lastName"
                                value={form.lastName}
                                onChange={handleChange("lastName")}
                                className="h-11 rounded-md border-neutral-300"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-neutral-900">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange("email")}
                            className="h-11 rounded-md border-neutral-300"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-neutral-900">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={handleChange("password")}
                                className="h-11 rounded-md border-neutral-300 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <Eye className="w-5 h-5"/>
                                ) : (
                                    <EyeOff className="w-5 h-5"/>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Checkbox
                            id="subscribe"
                            checked={form.subscribe}
                            onCheckedChange={(checked) =>
                                setForm((prev) => ({...prev, subscribe: checked === true}))
                            }
                            className="mt-0.5 rounded-none border-neutral-900 data-[state=checked]:bg-neutral-900 data-[state=checked]:border-neutral-900"
                        />
                        <Label
                            htmlFor="subscribe"
                            className="block text-sm font-normal leading-relaxed text-neutral-500"
                        >
                            Sign me up for product updates and promotions from Blue Nile by
                            email. You can unsubscribe at any time.
                            See{" "}
                            <a href="#" className="underline text-neutral-500 hover:text-neutral-700">
                                Privacy Policy
                            </a>{" "}
                            for additional information.
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 bg-[#0f1330] hover:bg-[#0f1330]/90 text-white text-sm tracking-wide rounded-md"
                    >
                        CREATE ACCOUNT
                    </Button>
                </form>

                <div className="flex items-center gap-4 my-6">
                    <div className="h-px flex-1 bg-neutral-200"/>
                    <span className="text-xs text-neutral-400">or</span>
                    <div className="h-px flex-1 bg-neutral-200"/>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 rounded-md border-neutral-300 text-neutral-900 font-normal flex items-center justify-center gap-2"
                >
                    <GoogleIcon className="w-4 h-4"/>
                    Sign up with Google
                </Button>

                <div className="h-px bg-neutral-200 my-6" />

                <p className="text-center text-sm text-neutral-500">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-neutral-900">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

function GoogleIcon({className}: { className?: string }) {
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
