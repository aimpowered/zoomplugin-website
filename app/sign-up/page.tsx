// Signup Page - User sign up only
"use client";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@/components/Alert"; // Import the Alert component

const SignUp = () => {
    const router = useRouter();
    const [busy, setBusy] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [userCreatedStatus, setUserCreatedStatus] = useState(0); 

    const { name, email, password } = userInfo;
    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const { name, value } = target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        setBusy(true);
        e.preventDefault();
        const res = await fetch("/api/auth/users", {
            method: "POST",
            body: JSON.stringify(userInfo),
        })
        if (res.status == 200){
            router.push("/");
        };
        setUserCreatedStatus(res.status);
        setBusy(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
                {userCreatedStatus === 200 ? (
                    <Alert value="User created successfully!" />
                ) : userCreatedStatus === 422 ? (
                    <Alert value="User already exists!" />
                ) : userCreatedStatus === 0 ? (
                    <></>
                ) : (
                    <Alert value="Error creating user" />
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <button
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        type="submit"
                        disabled={busy}
                        style={{ opacity: busy ? 0.5 : 1 }}
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already a user,{" "}
                    <a href="/" className="text-blue-500 underline">
                        log in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;