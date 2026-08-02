import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(req: NextRequest, { params }: { params: Promise<{ code: string }>}) {
    try {
        const { code } = await params;

        if (!code) {
            return NextResponse.json(
                { error: "Activation code is required." },
                { status: 400 }
            );
        }

        const user = await prisma.user.findFirst({
            where: { activationCode: code },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid or expired activation code." },
                { status: 404 }
            );
        }

        if (user.isActivated) {
            return NextResponse.json(
                { message: "Account is already activated." },
                { status: 200 }
            );
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                isActivated: true,
            },
        });

        return NextResponse.json(
            { message: "Account activated successfully." },
            { status: 200 }
        );
    } catch (err) {
        console.error("Activation error:", err);
        return NextResponse.json(
            { error: "Something went wrong while activating your account." },
            { status: 500 }
        );
    }
}