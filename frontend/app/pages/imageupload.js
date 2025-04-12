"use client";

import React, { useState } from "react";
import axios from "axios";

import {supabase} from "../supabase/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { Router } from "next/router";
import GenerateMCQ from "../components/generatemcq"; 

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // To hold the image preview URL
  const [prediction, setPrediction] = useState(null);
  const [generatedData, setGeneratedData] = useState(null); // State to hold generated data from /generate
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mcq, setMcq] = useState(null);
  
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

      const generateResponse = await axios.post(
        "http://127.0.0.1:5000/generate",
        { flower: response.data.predicted_class }, 
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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

      utterance.lang = 'en-US';
      utterance.rate = 1;  
      utterance.pitch = 1; 

      // Use the SpeechSynthesis API to speak the text
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  };

  // const handleClick = () => {
  //   speakText(text);
  // };  

  const handleMCQ = async (e) => { 
    e.preventDefault()
    const response = await axios.post('http://localhost:5000/questions', 
      {
        flower: prediction
      }
    )
    const mcqData = response.data
    setMcq(mcqData)
  }



  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className={`bg-white rounded-lg shadow-lg p-8 w-full max-w-5xl ${!generatedData ? "flex flex-col items-center" : ""}`}>
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Image Upload and Classification</h1>

        <div className="flex flex-col lg:flex-row w-full space-y-8 lg:space-y-0 lg:space-x-8">
          
          {/* Left Section (Input + Prediction) */}
          <div className="lg:w-5/12 flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Upload Your Image</h2>
            
            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Show image preview if available */}
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Image preview"
                    className="w-full h-auto border border-gray-300 rounded-md"
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
                <h3 className="text-lg font-bold text-gray-800">Predicted Class: {prediction}</h3>
              </div>
            )}
          </div>

          {/* Right Section (Generated Data) */}
          <div className="lg:w-7/12">
            {generatedData ? (
              <div className="space-y-6">
                <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Flower Description</h3>
                  <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">{generatedData.description}</p>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Overview</h3>
                  <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">{generatedData.overview}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-center">Upload an image to see more about it.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {prediction && (
        <div className="flex flex-col justify-center w-1/4 h-20 mt-8">
          <button 
            type="button" 
            onClick={handleMCQ} 
            className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 cursor-pointer text-white font-semibold rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 transition-all duration-300 space-x-9"
          >
            Test Yourself
          </button>
        </div>
      )}

      {mcq && (
        <div className="w-full max-w-5xl mt-8">
          <GenerateMCQ mcq={mcq} flower={prediction} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
