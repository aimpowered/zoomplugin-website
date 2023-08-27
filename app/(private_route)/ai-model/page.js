"use client"
import React, { useEffect, useRef } from "react";

export default function YourComponent() {
  const webcamRef = useRef(null);
  const labelContainerRef = useRef(null);

  useEffect(() => {
    async function initTeachableMachine() {
      const URL = "https://teachablemachine.withgoogle.com/models/RFPmylbbW/";
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      // Load TensorFlow.js and the Teachable Machine Image library
      const tfScript = document.createElement("script");
      tfScript.src =
        "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js";
      tfScript.async = true;
      document.body.appendChild(tfScript);

      tfScript.onload = async () => {
        const tmScript = document.createElement("script");
        tmScript.src =
          "https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js";
        tmScript.async = true;
        document.body.appendChild(tmScript);

        tmScript.onload = async () => {
          const model = await tmImage.load(modelURL, metadataURL);
          const maxPredictions = model.getTotalClasses();

          const flip = true; // whether to flip the webcam
          const webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
          await webcam.setup(); // request access to the webcam
          await webcam.play();
          window.requestAnimationFrame(loop);

          document
            .getElementById("webcam-container")
            .appendChild(webcam.canvas);
          const labelContainer = document.getElementById("label-container");
          for (let i = 0; i < maxPredictions; i++) {
            labelContainer.appendChild(document.createElement("div"));
          }

          async function loop() {
            webcam.update(); // update the webcam frame
            await predict();
            window.requestAnimationFrame(loop);
          }

          async function predict() {
            const prediction = await model.predict(webcam.canvas);
            for (let i = 0; i < maxPredictions; i++) {
              const classPrediction =
                prediction[i].className +
                ": " +
                prediction[i].probability.toFixed(2);
              labelContainer.childNodes[i].innerHTML = classPrediction;
            }
          }
        };
      };
    }

    initTeachableMachine();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex">Teachable Machine Image Model for thumbs up and down</div>
      <div className="flex" id="webcam-container" ref={webcamRef}></div>
      <div className="flex" id="label-container" ref={labelContainerRef}></div>
    </div>
  );
}
