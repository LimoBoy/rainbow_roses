"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Loader2, MailCheck } from "lucide-react";

type ActivationStatus = "loading" | "success" | "error" | "expired";

export default function ActivationPage() {
    const params = useParams<{ code: string }>();
    const router = useRouter();

    const hasToken = Boolean(params?.code);
    const [status, setStatus] = useState<ActivationStatus>(() =>
        hasToken ? "loading" : "error"
    );
    const [errorMessage, setErrorMessage] = useState<string>(() =>
        hasToken ? "" : "Missing activation token."
    );
    const [email, setEmail] = useState("");
    const [resending, setResending] = useState(false);
    const [resent, setResent] = useState(false);
    const [resendError, setResendError] = useState("");

    useEffect(() => {
        // Nothing to fetch if there's no token — initial state already reflects that.
        if (!hasToken) return;

        let cancelled = false;

        async function activateAccount() {
            try {
                const res = await fetch(`/api/auth/activation/${encodeURIComponent(params.code)}`, {
                    method: "POST",
                });

                const data = await res.json().catch(() => ({}));

                // Every setState below runs after an `await`, i.e. in a microtask —
                // never synchronously within the effect's own call stack.
                if (cancelled) return;

                if (res.ok) {
                    setStatus("success");
                } else if (res.status === 410) {
                    // Token expired
                    setStatus("expired");
                } else {
                    setStatus("error");
                    setErrorMessage(data?.error ?? "We couldn't activate your account.");
                }
            } catch {
                if (!cancelled) {
                    setStatus("error");
                    setErrorMessage("Something went wrong. Check your connection and try again.");
                }
            }
        }

        activateAccount();

        return () => {
            cancelled = true;
        };
    }, [hasToken, params?.code]);

    async function handleResend(e: React.FormEvent) {
        e.preventDefault();
        if (!email) return;

        setResending(true);
        setResendError("");
        try {
            const res = await fetch("/api/auth/activation/resend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json().catch(() => ({}));
            if (res.ok) {
                setResent(true);
            } else {
                setResendError(data?.error ?? "We couldn't send a new activation link.");
            }
        } catch {
            setResendError("Something went wrong. Check your connection and try again.");
        } finally {
            setResending(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="items-center text-center">
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        {status === "loading" && (
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        )}
                        {status === "success" && (
                            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                        )}
                        {(status === "error" || status === "expired") && (
                            <XCircle className="h-6 w-6 text-destructive" />
                        )}
                    </div>

                    <CardTitle className="text-xl">
                        {status === "loading" && "Activating your account"}
                        {status === "success" && "Account activated"}
                        {status === "expired" && "Link expired"}
                        {status === "error" && "Activation failed"}
                    </CardTitle>

                    <CardDescription>
                        {status === "loading" &&
                            "Hang tight while we confirm your email address."}
                        {status === "success" &&
                            "Your account is ready. You can sign in now."}
                        {status === "expired" &&
                            "This activation link has expired. Request a new one below."}
                        {status === "error" &&
                            (errorMessage || "We couldn't activate your account.")}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {(status === "expired" || status === "error") && !resent && (
                        <form onSubmit={handleResend} className="space-y-3">
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Button type="submit" className="w-full" disabled={resending}>
                                {resending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Resend activation email
                            </Button>
                            {resendError && (
                                <p className="text-sm text-destructive" role="alert">
                                    {resendError}
                                </p>
                            )}
                        </form>
                    )}

                    {(status === "expired" || status === "error") && resent && (
                        <Alert>
                            <MailCheck className="h-4 w-4" />
                            <AlertTitle>Check your inbox</AlertTitle>
                            <AlertDescription>
                                We sent a new activation link to {email}.
                            </AlertDescription>
                        </Alert>
                    )}

                    {status === "error" && !resent && (
                        <Alert variant="destructive">
                            <AlertTitle>Something&#39;s not right</AlertTitle>
                            <AlertDescription>
                                You can request a new activation link below.
                            </AlertDescription>
                        </Alert>
                    )}
                </CardContent>

                <CardFooter className="flex flex-col gap-2">
                    {status === "success" && (
                        <Button className="w-full" onClick={() => router.push("/login")}>
                            Go to sign in
                        </Button>
                    )}
                    {(status === "error" || status === "expired") && (
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => router.push("/")}
                        >
                            Back to homepage
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
