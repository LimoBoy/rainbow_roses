import { NextRequest, NextResponse } from "next/server";
import { isActivationCode } from "@/lib/activation";
import prisma from "@/lib/prisma";

export async function POST(
    _request: NextRequest,
    { params }: { params: Promise<{ code: string }> }
) {
    try {
        const { code } = await params;

        if (!isActivationCode(code)) {
            return NextResponse.json({ error: "Invalid activation link." }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { activationCode: code } });

        if (!user) {
            return NextResponse.json({ error: "This activation link is invalid or has already been used." }, { status: 404 });
        }

        if (user.isActivated) {
            return NextResponse.json({ message: "Your account is already activated." });
        }

        if (!user.activationExpiresAt || user.activationExpiresAt <= new Date()) {
            return NextResponse.json(
                { error: "This activation link has expired." },
                { status: 410 }
            );
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                isActivated: true,
                activationCode: null,
                activationExpiresAt: null,
            },
        });

        return NextResponse.json({ message: "Account activated successfully." });
    } catch (error) {
        console.error("Activation error:", error);
        return NextResponse.json(
            { error: "Something went wrong while activating your account." },
            { status: 500 }
        );
    }
}
