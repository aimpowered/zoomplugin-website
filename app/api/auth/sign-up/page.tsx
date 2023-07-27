"use client";

// import { InputField } from "@/components/InputField";
import Link from "next/link";
import { ChangeEventHandler, FormEventHandler, useState } from "react";

const SignUp = () => {
    const [busy, setBusy] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = userInfo;
    
    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const { name, value } = target;
        
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        setBusy(true);
        e.preventDefault();
        const res = await fetch("/api/auth/sign-in", { //changed form users
            method: "POST",
            body: JSON.stringify(userInfo),
            }).then((res) => res.json());
        console.log(res);
        setBusy(false);
    };



    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form className="w-1/3" onSubmit={handleSubmit}>
                <input
                    type="text" // Changed "textbox" to "text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="Name" // Added a placeholder for better user experience
                />
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email" // Added a placeholder for better user experience
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Password" // Added a placeholder for better user experience
                />
                <button
                    className="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                    type="submit"
                    disabled={busy}
                    style={{opacity: busy? 0.5 : 1}}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
    
}

export default SignUp;