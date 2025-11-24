
"use client";

import { useRouter } from "next/navigation";

export default function NavigateLogin() {
    const router = useRouter();

    return (
        <button onClick={() => router.push("/login")}>
            Login
        </button>
    );
}

