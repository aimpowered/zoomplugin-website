// MyProfile.tsx - User profile page with buttons

//Meeting Register/Join in Page
"use client"
// App.js
import { useSession } from "next-auth/react";
import { BookOutline, BarChartOutline, ChatbubblesOutline, RibbonOutline, BatteryChargingOutline } from "react-ionicons";
import styled from "styled-components";


function App() {
    const { data, status } = useSession();

    return (
        <div className="p-10 flex flex-col items-center">
            <div className="w-full flex justify-start">
                <a href="#" className="text-black-500 text-2xl">
                    &lt; Home
                </a>
            </div>
            
            <div className="flex flex-wrap justify-center mx-auto">
                <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                    <div className="border rounded-3xl shadow-lg shadow-gray-500 p-4 ml-20 mr-20" style={{ width: "225px", height: "225px", backgroundColor: "#FEBD2F"}}>
                        <a href="/badge">
                            <div className="flex flex-col items-center font-bold mb-4">
                                <RibbonOutline
                                    color={"#35377D"}
                                    height="60px"
                                    width="60px"
                                    className="mt-1 mr-2"
                                />
                                <span style={{ fontSize: "14px", textAlign: "center"}}>Badge</span>
                            </div>
                            <div className="ml-4 mr-4 my-4">
                                <div style={{ fontSize: "14px", textAlign: "center"}}>
                                    Share what makes you uniquely you
                                </div>
                            </div>
                        </a>
                    </div> 
                </div>     
                    
                <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                    <div className="border rounded-3xl shadow-lg shadow-gray-500 p-4 ml-20 mr-20" style={{ width: "225px", height: "225px", backgroundColor: "#FEBD2F"}}>
                        <a href="/bar-chart-outline">
                            <div className="flex flex-col items-center font-bold mb-4">
                                <BarChartOutline
                                    color={"#35377D"}
                                    height="60px"
                                    width="60px"
                                    className="mt-1 mr-2"
                                />
                                <span style={{ fontSize: "14px", textAlign: "center"}}>Post-Meeting Summaries</span>
                            </div>
                            <div className="ml-4 mr-4 my-4">
                                <div style={{ fontSize: "14px", textAlign: "center"}}>
                                    Access past meeting summaries and insights
                                </div>
                            </div>
                        </a>
                    </div> 
                </div>

                <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                    <div className="border rounded-3xl shadow-lg shadow-gray-500 p-4 ml-20 mr-20" style={{ width: "225px", height: "225px", backgroundColor: "#FEBD2F"}}>
                        <a href="/journal">
                            <div className="flex flex-col items-center font-bold mb-4">
                                <BookOutline
                                    color={"#35377D"}
                                    height="60px"
                                    width="60px"
                                    className="mt-1 mr-2"
                                />
                                <span style={{ fontSize: "14px", textAlign: "center"}}>Journal</span>
                            </div>
                            <div className="ml-4 mr-4 my-4">
                                <div style={{ fontSize: "14px", textAlign: "center"}}>
                                    Review past thoughts or create new ones
                                </div>
                            </div>
                        </a>
                    </div> 
                </div>
                
                <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                    <div className="border rounded-3xl shadow-lg shadow-gray-500 p-4 ml-20 mr-20" style={{ width: "225px", height: "225px", backgroundColor: "#FEBD2F"}}>
                        <a href="/difficult-word-bank">
                            <div className="flex flex-col items-center font-bold mb-4">
                                <BookOutline
                                    color={"#35377D"}
                                    height="60px"
                                    width="60px"
                                    className="mt-1 mr-2"
                                />
                                <span style={{ fontSize: "14px", textAlign: "center"}}>Difficult Word Bank</span>
                            </div>
                            <div className="ml-4 mr-4 my-4">
                                <div style={{ fontSize: "14px", textAlign: "center"}}>
                                    Identify challenging words and expand your word bank
                                </div>
                            </div>
                        </a>
                    </div> 
                </div>

                <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                    <div className="border rounded-3xl shadow-lg shadow-gray-500 p-4 ml-20 mr-20" style={{ width: "225px", height: "225px", backgroundColor: "#FEBD2F"}}>
                        <a href="/relaxation-exercise">
                            <div className="flex flex-col items-center font-bold mb-4">
                                <BookOutline
                                    color={"#35377D"}
                                    height="60px"
                                    width="60px"
                                    className="mt-1 mr-2"
                                />
                                <span style={{ fontSize: "14px", textAlign: "center"}}>Relaxation Exercise</span>
                            </div>
                            <div className="ml-4 mr-4 my-4">
                                <div style={{ fontSize: "14px", textAlign: "center"}}>
                                    Customize meeting relaxation activities
                                </div>
                            </div>
                        </a>
                    </div> 
                </div>

            </div>
        </div>
    );
}

export default App;
