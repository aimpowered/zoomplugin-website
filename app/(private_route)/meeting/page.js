//Meeting Register/Join in Page
"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

const HomePage = () => {

    const [formData, setFormData] = useState({
        meetingNumber: "",
        passWord: "",
        userName: "",
        role: 0,
    });

    const router = useRouter();

    const joinMeeting = (event) => {
        event.preventDefault();

        // Construct the query string from the form data
        const query = new URLSearchParams(formData).toString();

        // Redirect to the desired page with the query parameters
        router.push(`/zoom?${query}`);
    };  

    const handleChange = (event) => {
        const { name, value } = event.target;
        //remove all spaces from meeting number
        if (name == "meetingNumber") {
            var formattedValue = value.replace(/\s/g, "");
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: formattedValue,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    return (
        <form onSubmit={joinMeeting} className="max-w-sm mx-auto mt-14">
            <div className="mb-4">
                <label className="block mb-2">
                    Meeting ID:
                    <input
                        type="text"
                        name="meetingNumber"
                        value={formData.meetingNumber}
                        onChange={handleChange}
                        placeholder="Enter Meeting ID"
                        className="textbox"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block mb-2">
                    Password:
                    <input
                        type="password"
                        name="passWord"
                        value={formData.passWord}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        className="textbox"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block mb-2">
                    User Name:
                    <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        placeholder="Enter User Name"
                        className="textbox"
                    />
                </label>
            </div>
            <button className="button" type="submit">
                Join
            </button>
        </form>
    );
};

export default HomePage;
