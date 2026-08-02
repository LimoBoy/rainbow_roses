import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import prisma from "@/lib/prisma";

interface RegisterBody {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    subscribe?: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateActivationCode(length = 32): string {
    // Returns a random hex string, e.g. for an activation link like /activate/:code
    return crypto.randomBytes(length).toString("hex");
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as Partial<RegisterBody>;
        const { firstName, lastName, email, password, subscribe } = body;

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
            return NextResponse.json(
                { error: "An account with this email already exists." },
                { status: 409 }
            );
        }

        // --- Hash password ---
        const hashedPassword = await bcrypt.hash(password, 12);

        // --- Generate activation code ---
        const activationCode = generateActivationCode();

        // --- Create user ---
        const user = await prisma.user.create({
            data: {
                firstName,
                lastName: lastName || null,
                email,
                password: hashedPassword,
                activationCode,
                isActivated: false,
                signedForUpdates: subscribe === true,
            },
        });

        // TODO: send an activation email here, e.g.
        // await sendActivationEmail(user.email, activationCode);

        // Never return the password hash or raw activation code to the client in the response body
        const { password: _pw, activationCode: _code, ...safeUser } = user;

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
