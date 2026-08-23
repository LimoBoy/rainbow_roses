"use client";

import {useSession} from "next-auth/react";

export default function AdminDashboard() {
    const { data: session } = useSession();

    return (
        <>
            {session?.user?.name}
        </>
    );
}