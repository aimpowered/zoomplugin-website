// Purpose : To restrict access to the private_route for users without active sessions
import React, { ReactNode } from "react";
import {getServerSession} from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

interface Props {
    children: ReactNode;
}

export default async function PrivateLayout({children}: Props){
    const session = await getServerSession(authOptions);

    // If there is no session, redirect to HomePage
    if (!session?.user) redirect("/");
    
    return <>{children}</>;
}