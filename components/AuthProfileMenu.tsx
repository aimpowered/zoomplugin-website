// Login / Logout button for Navbad
"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function AuthProfileMenu() {
    const { data, status } = useSession();
    const isAuth = status === "authenticated";

    if (isAuth)
        return (
            <div className="flex items-center space-x-2">
                <p className="text-gray-600">Hello, {data?.user?.name}</p>
                <button
                    className="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={() => signOut()}
                >
                    Logout
                </button>
            </div>
        );
    return (
        <div className="flex items-center space-x-2 ">
            <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
                Login
            </Link>
        </div>
    );
}
