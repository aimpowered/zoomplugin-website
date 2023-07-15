import { useEffect, useState } from "react";
import router from "next/router";
const axios = require("axios");
const { ZOOM } = require("../Constants/Zoom");

const Meeting = () => {
    //-------------- Chatbox component ----------------------
    const [message, setMessage] = useState(""); 
    const [displayedMessage, setDisplayedMessage] = useState(""); 
    const [isMessageVisible, setIsMessageVisible] = useState(false); 

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisplayedMessage(message); 
        setMessage(""); 
        setIsMessageVisible(true); 
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleCloseMessage = () => {
        setIsMessageVisible(false);
    };
    

    //-------------- Zoom WEB SDK setup ----------------------
    useEffect(() => {
        return async () => {
            new Promise(async (resolve, reject) => {
                const ZoomEmbed = await (
                    await import("@zoomus/websdk/embedded")
                ).default;

                resolve(ZoomEmbed.createClient());
            })
                .then(async (client) => {
                    let meetingSDKElement = document.getElementById("meetingSDKElement");

                    // Initialize the client and cutomize the UI for zoom meeting
                    client.init({
                        language: "en-US",
                        zoomAppRoot: meetingSDKElement,
                        customize: {
                            video: {
                                defaultViewType: "gallery",
                            },
                            isResizable: true,
                            viewSizes: {
                                default: {
                                    width: 1000,
                                    height: 1000
                                },
                                ribbon: {
                                    width: 300,
                                    height: 1000,
                                },
                            },
                            chat: {
                                popper: {
                                    placement: "right",
                                },
                            },
                        },
                    });

                    //Get credientials from index.js in URL
                    let payload = router.query;

                    // Get the signature from the server (/pages/api/Zoom/index.js)
                    const { data } = await axios({
                        url: "/api/Zoom/",
                        method: "POST",
                        data: payload,
                    })
                        .then((response) => {
                            return response;
                        })
                        .catch((error) => {
                            console.log("---signature axios request error ---", error);
                        });

                    // Join the meeting as guest user
                    client.join({
                        signature: data.signature,
                        sdkKey: data.sdkKey,
                        meetingNumber: payload.meetingNumber,
                        password: payload.passWord,
                        userName: payload.userName,
                        userEmail: "",
                        tk: "",
                        zak: "",
                    });
                })
                .catch((error) => {
                    console.log("---Error inside useEffect---", error);
                });
        };
    });

    return (
        <div>
            {/* Displaying chatbox message at top of the screen */}
            {isMessageVisible && (
                <div className="flex justify-center" id="messageContainer">
                    <div className="bg-green-500 text-white p-2 rounded-lg mb-2">
                        <div className="flex items-center">
                            <span className="mr-2">{displayedMessage}</span>

                            <button>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                    onClick={handleCloseMessage}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Meeting Component and Chatbox Component */}
            <div className="flex">
                <div className="w-70 h-4/5 flex-auto" id="meetingSDKElement"></div>
                <div className="w-30 flex justify-end items-end">
                    <form className="mt-2 flex" onSubmit={handleSubmit}>
                        <input
                            className="rounded-l-lg textbox"
                            type="text"
                            value={message}
                            onChange={handleChange}
                            placeholder="Type your message..."
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                            type="submit"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

Meeting.displayName = "Zoom Component View";

export default Meeting;
