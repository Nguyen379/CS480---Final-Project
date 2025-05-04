"use client";

import { useRef, useState, useEffect } from "react";
import { Camera, X, Scan } from "lucide-react";

const CameraSection = ({ onDetectEmotion }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Open camera when requested
  const openCamera = async () => {
    try {
      console.log("Requesting camera...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });

      console.log("Camera access granted, setting up video element");
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // Wait for video to be loaded and then play it
        videoRef.current.addEventListener("loadedmetadata", () => {
          console.log("Video metadata loaded");
          videoRef.current
            .play()
            .then(() => {
              console.log("Video playback started");
              setIsCameraOpen(true);
            })
            .catch((error) => {
              console.error("Error playing video:", error);
            });
        });
      } else {
        console.error("Video element not found");
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please check your permissions.");
    }
  };

  // Close camera
  const closeCamera = () => {
    console.log("Closing camera");
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        console.log("Stopping track:", track.kind);
        track.stop();
      });
      streamRef.current = null;

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      setIsCameraOpen(false);
    }
  };

  // Capture current frame and convert to base64
  const captureFrame = () => {
    if (!videoRef.current) return null;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    // Set canvas dimensions to match video dimensions
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    // Draw the current video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to base64 image
    return canvas.toDataURL("image/jpeg", 0.9);
  };

  // Handle emotion detection
  const handleDetect = async () => {
    try {
      setIsProcessing(true);
      const imageBase64 = captureFrame();

      if (!imageBase64) {
        throw new Error("Failed to capture image");
      }

      await onDetectEmotion(imageBase64);
    } catch (error) {
      console.error("Error during emotion detection:", error);
      alert("Error detecting emotion. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Clean up camera resources when component unmounts
  useEffect(() => {
    console.log("Setting up cleanup effect");
    return () => {
      console.log("Component unmounting, cleaning up camera");
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  // Debug for camera state
  useEffect(() => {
    console.log("Camera state changed:", isCameraOpen);
  }, [isCameraOpen]);

  const styles = {
    section: {
      marginBottom: "2.5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    videoContainer: {
      position: "relative",
      width: "100%",
      maxWidth: "42rem",
      aspectRatio: "4/3",
      backgroundColor: "#f5f5f5",
      borderRadius: "0.5rem",
      overflow: "hidden",
      marginBottom: "1rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    video: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: isCameraOpen ? "block" : "none", // Explicitly show/hide based on state
    },
    canvas: {
      display: "none",
    },
    closeButton: {
      position: "absolute",
      top: "1rem",
      right: "1rem",
      backgroundColor: "rgba(38,38,38,0.7)",
      color: "#fff",
      padding: "0.5rem",
      borderRadius: "9999px",
      border: "none",
      cursor: "pointer",
      zIndex: 10,
    },
    placeholder: {
      color: "#737373",
      flexDirection: "column",
      alignItems: "center",
      display: isCameraOpen ? "none" : "flex", // Show only when camera is closed
    },
    buttonRow: {
      display: "flex",
      gap: "1rem",
    },
    openButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      backgroundColor: "#262626",
      color: "#fff",
      padding: "0.75rem 1.5rem",
      borderRadius: "0.5rem",
      border: "none",
      cursor: "pointer",
    },
    detectButton: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      backgroundColor: isProcessing ? "#737373" : "#404040",
      color: "#fff",
      padding: "0.75rem 1.5rem",
      borderRadius: "0.5rem",
      border: "none",
      cursor: isProcessing ? "not-allowed" : "pointer",
      opacity: isProcessing ? 0.7 : 1,
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.videoContainer}>
        {/* Always render the video element but control visibility with CSS */}
        <video ref={videoRef} autoPlay playsInline style={styles.video} muted />

        {/* Placeholder shown when camera is not open */}
        <div style={styles.placeholder}>
          <Camera
            style={{ height: "3rem", width: "3rem", marginBottom: "0.5rem" }}
          />
          <p>Camera feed will appear here</p>
        </div>

        {/* Show close button when camera is open */}
        {isCameraOpen && (
          <button
            onClick={closeCamera}
            style={styles.closeButton}
            aria-label="Close camera"
          >
            <X style={{ height: "1.25rem", width: "1.25rem" }} />
          </button>
        )}
      </div>

      {/* Hidden canvas for processing video frames */}
      <canvas ref={canvasRef} style={styles.canvas}></canvas>

      {/* Button to open camera or detect emotion */}
      <div style={styles.buttonRow}>
        {!isCameraOpen ? (
          <button onClick={openCamera} style={styles.openButton}>
            <Camera style={{ height: "1.25rem", width: "1.25rem" }} />
            Open Camera
          </button>
        ) : (
          <button
            onClick={handleDetect}
            style={styles.detectButton}
            disabled={isProcessing}
          >
            <Scan style={{ height: "1.25rem", width: "1.25rem" }} />
            {isProcessing ? "Processing..." : "Detect Emotion"}
          </button>
        )}
      </div>
    </section>
  );
};

export default CameraSection;
