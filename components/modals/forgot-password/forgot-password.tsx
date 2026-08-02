import { useState } from "react";

// shadcn/ui components (from "@/components/ui/...")
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ForgotPasswordFormState {
    email: string;
}

export default function ForgotPasswordPage() {
    const [form, setForm] = useState<ForgotPasswordFormState>({
        email: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, email: e.target.value }));

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Reset password for", form.email);
    };

    return (
        <div className="w-full bg-white flex justify-center">
            <div className="w-full max-w-md px-6 pt-6 pb-16">
                <p className="text-center text-lg text-neutral-700 mb-10">
                    Please enter your email address below to receive a password reset
                    link.
                </p>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-neutral-900">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="h-11 rounded-md border-neutral-300"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 bg-[#0f1330] hover:bg-[#0f1330]/90 text-white text-sm tracking-wide rounded-md"
                    >
                        CONTINUE
                    </Button>
                </form>
            </div>
        </div>
    );
}
