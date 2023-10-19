//Meeting Register/Join in Page
"use client";
// App.js
import { useSession } from "next-auth/react";
import JoinMeeting from "./JoinMeeting";
import { SettingsSharp, PersonSharp } from "react-ionicons";

function App() {
    const { data, status } = useSession();

    return (
        <div className="p-10">
            <div className="font-bold text-2xl ">
                Welcome back {data?.user?.name}!
            </div>
            <div className="mb-4">
                Good luck in your meetings today, you're going to kill it!
            </div>
            <div className="flex">
                <div className="w-2/3 max-w-lg">
                    <JoinMeeting />
                </div>
                <div className="w-1/3 ml-4">
                    <div className="border border-black rounded-3xl shadow-lg shadow-gray-500 p-4">
                        <div className="flex text-2xl font-bold mb-4">
                            <PersonSharp
                                color={"#00000"}
                                height="25px"
                                width="25px"
                                className="mt-1 mr-2"
                            />
                            My Profile
                        </div>
                        <div className="ml-8">
                            <div>
                                Access features like badge management, journal
                                viewing, insights, word bank addition, and more.
                            </div>
                            <a
                                href="/profile"
                                className="text-blue-500 hover:underline mt-4"
                            >
                                Edit Profile &gt;
                            </a>
                        </div>
                    </div>
                    <div className="border border-black rounded-3xl shadow-lg shadow-gray-500 p-4 mt-4">
                        <div className="flex align-middle text-2xl font-bold mb-4">
                            {" "}
                            <SettingsSharp
                                color={"#00000"}
                                height="25px"
                                width="25px"
                                className="mt-1 mr-2"
                            />
                            Setting
                        </div>
                        <div className="ml-8">
                            <div>
                                Manage your account username, password, contact
                                information, visual and audio settings, and
                                more.
                            </div>
                            <a
                                href="/journals"
                                className="text-blue-500 hover:underline mt-4"
                            >
                                Edit Setting &gt;
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
