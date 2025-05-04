"use client";

import { useState } from "react";
import Header from "./components/Header";
import CameraSection from "./components/CameraSection";
import ResultsPanel from "./components/ResultsPanel";
import InfoSection from "./components/InfoSection";
import Footer from "./components/Footer";
import BackgroundAnimation from "./components/BackgroundAnimation";
import "./App.css";

// Define a mock detection function
// Note: We use the imageBase64 parameter to avoid the TypeScript warning
const mockDetectEmotion = async (imageBase64) => {
  console.log(
    "Using mock detection for image data length:",
    imageBase64.length
  );

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Create mock data
  const emotions = [
    "Happy",
    "Sad",
    "Angry",
    "Surprised",
    "Neutral",
    "Fearful",
    "Disgusted",
  ];
  const confidences = Array(7)
    .fill()
    .map(() => Math.random());

  // Normalize confidences so they sum to 1
  const sum = confidences.reduce((a, b) => a + b, 0);
  const normalizedConfidences = confidences.map((c) => c / sum);

  // Create results
  const results = emotions
    .map((emotion, index) => ({
      emotion,
      confidence: normalizedConfidences[index],
    }))
    .sort((a, b) => b.confidence - a.confidence);

  return {
    primaryEmotion: results[0].emotion,
    confidence: results[0].confidence * 100,
    allResults: results,
  };
};

// Set up initial detection function to mock
let detectEmotion = mockDetectEmotion;

// Try to import the real API function
import("./services/api")
  .then((api) => {
    detectEmotion = api.detectEmotion;
    console.log("Successfully imported API service");
  })
  .catch((err) => {
    console.error("Error importing API service, using mock data:", err);
    // Keep using the mock function
  });

function App() {
  const [detectionResult, setDetectionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDetectEmotion = async (imageBase64) => {
    try {
      setIsLoading(true);
      setError(null);

      // Call the API to detect emotion
      const result = await detectEmotion(imageBase64);
      setDetectionResult(result);
    } catch (err) {
      console.error("Error in emotion detection:", err);
      setError("Failed to detect emotion. Please try again.");
      setDetectionResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <BackgroundAnimation />
      <div className="content">
        <Header />
        <main>
          {error && (
            <div
              style={{
                padding: "0.75rem",
                backgroundColor: "#fecaca",
                border: "1px solid #ef4444",
                borderRadius: "0.375rem",
                marginBottom: "1rem",
                color: "#b91c1c",
                width: "100%",
                maxWidth: "42rem",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <CameraSection onDetectEmotion={handleDetectEmotion} />

          <ResultsPanel result={detectionResult} isLoading={isLoading} />

          <InfoSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
