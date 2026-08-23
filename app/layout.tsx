import type { Metadata } from "next";
import {Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import {AlertList} from "@/components/alerts/alert-list";
import {Modal} from "@/components/modals/modal/modal";
import { SessionProvider } from "@/app/session-provider";
import { Dancing_Script } from 'next/font/google';

const dancingScript = Dancing_Script({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-dancing-script',
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Rainbow Roses",
    description: "Rainbow Roses",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${dancingScript.variable} ${geistMono.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col">
        <SessionProvider>
            {children}
            <div className="fixed top-4 right-4 z-50 ">
                <AlertList />
            </div>
            <Modal />
        </SessionProvider>
        </body>
        </html>
    );
}
