import bcrypt from "bcryptjs";
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Email and password",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = credentials?.email?.trim().toLowerCase();
                const password = credentials?.password;

                if (!email || !password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (!user || !user.isActivated) {
                    return null;
                }

                const passwordMatches = await bcrypt.compare(password, user.password);

                if (!passwordMatches) {
                    return null;
                }

                return {
                    id: String(user.id),
                    email: user.email,
                    name: [user.firstName, user.lastName].filter(Boolean).join(" "),
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }

            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role;
            }

            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
