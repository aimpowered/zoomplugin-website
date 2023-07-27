"use client";

import { useSession,signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function AuthProfileMenu() {
    const {data, status} = useSession();
    const isAuth = status === "authenticated";

    if (isAuth)
        return (
            <p>
              {data?.user?.name} <button onClick={() => signOut()}>Logout</button>  
            </p>
        );
        return (
            <ul className="flex items-center space-x-6">
                <li>
                <Link href="/">Login</Link>
               </li>
            </ul>
        );  

}