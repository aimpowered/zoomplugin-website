"use client";
import React from "react";
import { Icon } from "@iconify/react";

function YouTubeVideo({ videoId, title, description, time }) {
  const boxStyles = {
    backgroundColor: "#FEBD2F",
  };
  return (
    <div className="w-full md:w-1/2 p-2">
      <div
        className=" rounded-3xl shadow-lg shadow-gray-500 p-4"
        style={boxStyles}
      >
        <iframe
          width="100%"
          height="350px"
          src={`https://www.youtube.com/embed/${videoId}`}
          allowFullScreen
        ></iframe>
        <div className="h-24">
          <h2 className="text-xl font-bold mt-4">{title}</h2>
          <p className="text-base mt-2">{description}</p>
        </div>
        <div className="flex flex-nowrap gap-2">
          <Icon
            icon="ion:time-outline"
            width="20px"
            height="20px"
            style={{ marginTop: "3px" }}
          />
          <p className="text-base ">{time}</p>
        </div>
      </div>
    </div>
  );
}

const title1 = "It's time to take a deep breath and relax";
const desc1 = "Regain your focus with this 1-minute calming technique";

const title2 = "Stretch out your muscles";
const desc2 =
  "Be prepared to stretch your stiff arms, head, and shoulders with this 2-minute 'still in your chair' routine";

export default function App() {
  return (
    <div className="p-10">
      <div className="w-full flex justify-start">
        <a href="#" className="text-black-500 text-2xl">
          &lt; Home
        </a>
      </div>
      <div className="m-4 mt-4">
        <div className="mb-4 text-center font-semibold text-lg">
          Hi Misha! Follow these tips to relax your muscles and mind before your
          meeting
        </div>
        <div className="flex flex-nowrap gap-20">
          <YouTubeVideo
            videoId="Nhdl70HABYQ?si=h3OGQDEcPufUEAJD"
            title={title1}
            description={desc1}
            time="1 min"
          />
          <YouTubeVideo
            videoId="VIDEO_ID_2"
            title={title2}
            description={desc2}
            time="2 min"
          />
        </div>
      </div>
    </div>
  );
}
