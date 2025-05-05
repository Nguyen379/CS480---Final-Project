"use client";

import { useState, useEffect, useRef } from "react";
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


function App() {
  const [modelChoice, setModelChoice] = useState("Model 1: trpakov/vit-face-expression");
  const [detectionResult, setDetectionResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Set up initial detection function to mock
  const detectEmotion = useRef(mockDetectEmotion);

  // Try to import the real API function
  useEffect(() => {
    import("./services/api")
    .then((api) => {
      detectEmotion.current = api.detectEmotion;
      console.log("Successfully imported API service");
    })
    .catch((err) => {
      console.error("Error importing API service, using mock data:", err);
      // Keep using the mock function
    });
  }, []);


  const handleDetectEmotion = async (imageBase64) => {
    try {
      setIsLoading(true);
      setError(null);
  
      const result = await detectEmotion.current(imageBase64, modelChoice); // Pass model
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

          <div style={{ marginBottom: "1rem", textAlign: "center" }}>
            <label htmlFor="modelChoice" style={{ marginRight: "0.5rem" }}>
              Choose Model:
            </label>
            <select
              id="modelChoice"
              value={modelChoice}
              onChange={(e) => setModelChoice(e.target.value)}
            >
              <option value="Model 1: trpakov/vit-face-expression">Model 1: trpakov/vit-face-expression</option>
              <option value="Model 2: orriaga-model">Model 2: orriaga-model</option>
            </select>          
          </div>

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
