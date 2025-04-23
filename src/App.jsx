"use client"

import { useState, useRef, useEffect } from "react"
import Header from "./components/Header"
import CameraSection from "./components/CameraSection"
import ResultsPanel from "./components/ResultsPanel"
import InfoSection from "./components/InfoSection"
import Footer from "./components/Footer"
import BackgroundAnimation from "./components/BackgroundAnimation"
import "./App.css"

function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [detectionResult, setDetectionResult] = useState(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsCameraOpen(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Could not access camera. Please check permissions.")
    }
  }

  const handleCloseCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
      setIsCameraOpen(false)
    }
  }

  const detectEmotion = () => {
    // Mock emotion detection
    const emotions = ["Happy", "Sad", "Angry", "Surprised", "Neutral", "Fearful", "Disgusted"]
    const confidences = Array(7)
      .fill()
      .map(() => Math.random().toFixed(2))

    // Sort by confidence
    const results = emotions
      .map((emotion, index) => ({
        emotion,
        confidence: confidences[index],
      }))
      .sort((a, b) => b.confidence - a.confidence)

    setDetectionResult({
      primaryEmotion: results[0].emotion,
      confidence: results[0].confidence * 100,
      allResults: results,
    })
  }

  // Clean up camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  return (
    <div className="app">
      <BackgroundAnimation />
      <div className="content">
        <Header />
        <main>
          <CameraSection
            isCameraOpen={isCameraOpen}
            videoRef={videoRef}
            onOpenCamera={handleOpenCamera}
            onCloseCamera={handleCloseCamera}
            onDetectEmotion={detectEmotion}
          />
          <ResultsPanel result={detectionResult} />
          <InfoSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
