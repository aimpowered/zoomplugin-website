//Meeting Register/Join in Page
"use client"
import axios from "axios";
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
        console.log("send message from page file :", newMessage); 

        const data = { newMessage };
        await axios.post('/api/message', data);

        axios.get("/api/message").then((response) => {
        setMessages(response.data.body);
        console.log(response.data.body);
    });
    };

    useEffect(() => {
        axios.get("/api/message").then((response) => {
            setMessages(response.data.body);
            console.log(response.data.body);
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
            <div className="text-4xl font-bold text-gray-900 mt-14 ">Messages:</div>
          <div className="max-w-sm mt-2">
            {messages.map((message) => (
              <div key={message._id} className="bg-gray-100 p-2 my-1 rounded">
                {message.message}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-auto">
                <form onSubmit={sendMessage} className="max-w-sm mx-auto mt-14">
                    <label className="block mb-2">
                        <div className="text-4xl font-bold text-gray-900 mb-3">Add Notes:</div>
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
