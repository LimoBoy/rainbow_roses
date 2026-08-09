import { NextRequest, NextResponse } from "next/server";
import { createActivationToken } from "@/lib/activation";
import { sendActivationEmail } from "@/lib/email";
import prisma from "@/lib/prisma";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESPONSE = { message: "If an inactive account exists for that email, we sent an activation link." };

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as { email?: unknown };
        const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

        if (!EMAIL_REGEX.test(email)) {
            return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || user.isActivated) {
            return NextResponse.json(RESPONSE);
        }

        const activation = createActivationToken();
        await prisma.user.update({
            where: { id: user.id },
            data: {
                activationCode: activation.code,
                activationExpiresAt: activation.expiresAt,
            },
        });
        await sendActivationEmail({ email: user.email, firstName: user.firstName, code: activation.code });

        return NextResponse.json(RESPONSE);
    } catch (error) {
        console.error("Activation resend error:", error);
        return NextResponse.json(
            { error: "We couldn't send an activation email right now. Please try again." },
            { status: 503 }
        );
    }
}
