"use client";

import {signOut} from "next-auth/react";
import {LogOut} from 'lucide-react';

export default function SignOutButton() {
    return (
        <button className="flex items-center gap-2 cursor-pointer" onClick={() => signOut({callbackUrl: "/login"})}>
            <span>Sign Out</span>
            <LogOut/>
        </button>

)
    ;
}