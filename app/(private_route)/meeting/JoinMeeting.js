// JoinMeeting.js
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingForm from "./MeetingForm";

function JoinMeeting() {
    const [formData, setFormData] = useState({
        meetingNumber: "",
        passWord: "",
        userName: "",
        role: 0,
    });

    const router = useRouter();

    // Redirect to the zoom page with the form data
    const joinMeeting = (event) => {
        event.preventDefault();
        const query = new URLSearchParams(formData).toString();
        router.push(`/zoom?${query}`);
    };

    const handleMeetingInfo = (event) => {
        const { name, value } = event.target;
        if (name === "meetingNumber") {
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
        <div>
            <MeetingForm
                formData={formData}
                handleMeetingInfo={handleMeetingInfo}
                joinMeeting={joinMeeting}
            />
        </div>
    );
}

export default JoinMeeting;
