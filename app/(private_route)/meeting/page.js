//Meeting Register/Join in Page
"use client"
import Alert from "@/components/Alert";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HomePage = () => {

    const [formData, setFormData] = useState({
        meetingNumber: "",
        passWord: "",
        userName: "",
        role: 0,
    });
    
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const router = useRouter();

    // Redirect to zoom page with the form data
    const joinMeeting = (event) => {
        event.preventDefault();

        // Construct the query string from the form data
        const query = new URLSearchParams(formData).toString();

        // Redirect to the zoom page
        router.push(`/zoom?${query}`);
    };  

    // Handle Meeting Info data
    const handleMeetingInfo = (event) => {
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

    async function sendMessage(ev) {
        ev.preventDefault();

        if (newMessage) {
            const data = { newMessage };
            await axios.post("/api/message", data);

            axios.get("/api/message").then((response) => {
                setMessages(response.data.body);
                setNewMessage("");
            });
        } else{
            return <Alert value="asdf" />
        }
            
    };

    async function deleteMessage(id) {
        await axios.delete('/api/message?id=' + id);

        axios.get("/api/message").then((response) => {
            setMessages(response.data.body);
        });

    };

    useEffect(() => {
        axios.get("/api/message").then((response) => {
            setMessages(response.data.body);
        });
    }, []);
    return (
        <div className="flex justify-center">
            <div className="flex flex-auto">
                <form onSubmit={joinMeeting} className="max-w-sm mx-auto mt-14">
                    <div className="text-4xl font-bold text-gray-900 mb-3">
                        Join Meeting:
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">
                            Meeting ID:
                            <input
                                type="text"
                                name="meetingNumber"
                                value={formData.meetingNumber}
                                onChange={handleMeetingInfo}
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
                                onChange={handleMeetingInfo}
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
                                onChange={handleMeetingInfo}
                                placeholder="Enter User Name"
                                className="textbox"
                            />
                        </label>
                    </div>
                    <button className="button" type="submit">
                        Join
                    </button>
                </form>
            </div>
            <div className="flex flex-auto flex-col">
                <div className="text-4xl font-bold text-gray-900 mt-14 ">
                    Messages:
                </div>
                <div className="max-w-sm mt-2">
                    {messages.map((message) => (
                        <div
                            key={message._id}
                            className="flex bg-gray-100 p-2 my-1 rounded"
                        >
                            <div className="flex ">{message.message}</div>
                            <div className="flex flex-auto items-center justify-end">
                                <button 
                                    onClick={() => deleteMessage(message._id)}
                                >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-4 h-4 m-1"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-auto">
                <form onSubmit={sendMessage} className="max-w-sm mx-auto mt-14">
                    <label className="block mb-2">
                        <div className="text-4xl font-bold text-gray-900 mb-3">
                            Add Message:
                        </div>
                        <input
                            type="text"
                            name="meetingNumber"
                            value={newMessage}
                            onChange={(ev) => setNewMessage(ev.target.value)}
                            placeholder="Enter you message here"
                            className="textbox"
                        />
                    </label>
                    <button className="button" type="">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HomePage;
