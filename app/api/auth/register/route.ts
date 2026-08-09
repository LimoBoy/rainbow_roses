import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { createActivationToken } from "@/lib/activation";
import { sendActivationEmail } from "@/lib/email";

interface RegisterBody {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    subscribe?: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as Partial<RegisterBody>;
        const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
        const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
        const password = typeof body.password === "string" ? body.password : "";
        const { subscribe } = body;
        const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

        // --- Basic validation ---
        if (!firstName || !email || !password) {
            return NextResponse.json(
                { error: "firstName, email and password are required." },
                { status: 400 }
            );
        }

        if (!EMAIL_REGEX.test(email)) {
            return NextResponse.json(
                { error: "Please provide a valid email address." },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: "Password must be at least 8 characters long." },
                { status: 400 }
            );
        }

        // --- Check for existing user ---
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            if (!existingUser.isActivated) {
                const activation = createActivationToken();
                await prisma.user.update({
                    where: { id: existingUser.id },
                    data: {
                        activationCode: activation.code,
                        activationExpiresAt: activation.expiresAt,
                    },
                });
                await sendActivationEmail({
                    email: existingUser.email,
                    firstName: existingUser.firstName,
                    code: activation.code,
                });

                return NextResponse.json({
                    message: "If this account needs activation, we sent a new activation link.",
                });
            }

            return NextResponse.json(
                { error: "An account with this email already exists." },
                { status: 409 }
            );
        }

        // --- Hash password ---
        const hashedPassword = await bcrypt.hash(password, 12);

        // --- Generate activation code ---
        const activation = createActivationToken();

        // --- Create user ---
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName: lastName || null,
                email,
                password: hashedPassword,
                activationCode: activation.code,
                activationExpiresAt: activation.expiresAt,
                isActivated: false,
                signedForUpdates: subscribe === true,
            },
        });

        try {
            await sendActivationEmail({
                email: user.email,
                firstName: user.firstName,
                code: activation.code,
            });
        } catch (emailError) {
            await prisma.user.delete({ where: { id: user.id } }).catch(() => undefined);
            console.error("Activation email error:", emailError);
            return NextResponse.json(
                { error: "We couldn't send the activation email. Please try again." },
                { status: 503 }
            );
        }

        // Never return the password hash or raw activation code to the client in the response body
        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            signedForUpdates: user.signedForUpdates,
            isActivated: user.isActivated,
        };

        return NextResponse.json(
            {
                message: "Account created. Please check your email to activate your account.",
                user: safeUser,
            },
            { status: 201 }
        );
    } catch (err) {
        console.error("Register error:", err);
        return NextResponse.json(
            { error: "Something went wrong while creating your account." },
            { status: 500 }
        );
    }
}
