"use client";

import React, { useState } from "react";
import axios from "axios";

import { useAuth } from "../context/AuthContext";
import { Router } from "next/router";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // To hold the image preview URL
  const [prediction, setPrediction] = useState(null);
  const [generatedData, setGeneratedData] = useState(null); // State to hold generated data from /generate
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { user } = useAuth(); // Access the user from AuthContext
  
  if (user === null) ; // If user is not logged in, don't render the component

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // Set image preview URL
    if (selectedImage) {
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    setLoading(true);
    setError(null);

    try {
      // First request: to classify the image
      const response = await axios.post("http://127.0.0.1:5000/classify", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const predictionResult = response.data.predicted_class;
      setPrediction(predictionResult);

      // Second request: to generate data based on the prediction
      const generateResponse = await axios.post(
        "http://127.0.0.1:5000/generate",
        { flower: response.data.predicted_class }, // Sending the prediction value
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Store the generated data in the state
      setGeneratedData(generateResponse.data);
      speakText(generateResponse.data.description)

    } catch (err) {
      setError("Error during classification: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const speakText = (textToSpeak) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      // Optionally, you can modify the speech parameters
      utterance.lang = 'en-US';
      utterance.rate = 1;  // Speed of speech
      utterance.pitch = 1; // Pitch of speech

      // Use the SpeechSynthesis API to speak the text
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  };

  // const handleClick = () => {
  //   speakText(text);
  // };

  return (
    <div className="flex justify-center items-center h-full w-screen bg-gray-50 mt-0 sm:mt-64 lg:mt-20">
  <div className={`bg-blue-200 sm:md:flex-col lg:flex-row p-8 rounded-lg shadow-xl  sm:w-3/4 md:w-3/4 lg:w-10/12 flex flex-col sm:flex-row ${!generatedData? "justify-center items-center":""}  space-y-6 sm:space-y-0 sm:space-x-8`}>

    {/* Left Section (Input + Prediction) */}
    <div className="flex-col lg:w-4/12 sm:md:w-full items-center justify-center">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Image Input</h1>

      <form onSubmit={handleSubmit} className="space-y-4 flex  justify-center flex-col">
        <div className="">
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="block w-full text-sm text-gray-700 border border-b-blue-950 rounded-lg p-3"
          />
        </div>

        {/* Show image preview if available */}
        {imagePreview && (
          <div className="mt-4 text-center">
            <img
              src={imagePreview}
              alt="Image preview"
              className="max-w-full h-auto border border-gray-300 rounded-md"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 text-white font-semibold rounded-lg ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} transition-all duration-300`}
        >
          {loading ? "Classifying..." : "Classify Image"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      {prediction !== null && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-bold text-gray-800 ">Predicted Class: {prediction}</h3>
        </div>
      )}
    </div>

    {/* Right Section (Generated Data) */}
    <div className="flex-1 lg:w-8/12 sm:md:w-full">
      {generatedData && (
        <div className="mt-4 p-6 bg-gray-100 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Flower Description:</h3>
          <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">{generatedData.description}</p>
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default ImageUpload;
