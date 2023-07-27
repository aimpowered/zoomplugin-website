import React, {ReactNode } from "react";
import {getServerSession} from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

interface Props {
    children: ReactNode;
}

export default async function PrivateLayout({children}: Props){
    const session = await getServerSession(authOptions);

    if (!session?.user) redirect("/");
    
    return <>{children}</>;
}