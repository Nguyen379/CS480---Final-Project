"use client"

import { useRef, useState } from "react"
import { Camera, X, Scan } from "lucide-react"

const CameraSection = ({ onDetectEmotion }) => {
  const videoRef = useRef(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)

  // Open camera when component mounts
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setIsCameraOpen(true)
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  // Close camera when component unmounts
  // This is a cleanup function that stops the camera stream
  // and sets the video source to null

  const closeCamera = () => {
    const stream = videoRef.current?.srcObject
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setIsCameraOpen(false)
  }

  const styles = {
    section: {
      marginBottom: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    videoContainer: {
      position: 'relative',
      width: '100%',
      maxWidth: '42rem',
      aspectRatio: '16/9',
      backgroundColor: '#f5f5f5',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      marginBottom: '1rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    closeButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      backgroundColor: 'rgba(38,38,38,0.7)',
      color: '#fff',
      padding: '0.5rem',
      borderRadius: '9999px',
      border: 'none',
      cursor: 'pointer',
    },
    placeholder: {
      color: '#737373',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    buttonRow: {
      display: 'flex',
      gap: '1rem',
    },
    openButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: '#262626',
      color: '#fff',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
    },
    detectButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      backgroundColor: '#404040',
      color: '#fff',
      padding: '0.75rem 1.5rem',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
    },
  }

  
  return (
    <section style={styles.section}>
      <div style={styles.videoContainer}>
        {isCameraOpen ? (
          <>
            <video ref={videoRef} autoPlay playsInline style={styles.video} />
            <button onClick={closeCamera} style={styles.closeButton} aria-label="Close camera">
              <X style={{ height: '1.25rem', width: '1.25rem' }} />
            </button>
          </>
        ) : (
          <div style={styles.placeholder}>
            <Camera style={{ height: '3rem', width: '3rem', marginBottom: '0.5rem' }} />
            <p>Camera feed will appear here</p>
          </div>
        )}
      </div>


      {/* Open camera button or detect emotion button based on camera state */} 
      <div style={styles.buttonRow}>
        {!isCameraOpen ? (
          <button onClick={openCamera} style={styles.openButton}>
            <Camera style={{ height: '1.25rem', width: '1.25rem' }} />
            Open Camera
          </button>
        ) : (
          <button onClick={onDetectEmotion} style={styles.detectButton}>
            <Scan style={{ height: '1.25rem', width: '1.25rem' }} />
            Detect Emotion
          </button>
        )}
      </div>
    </section>
  )
}

export default CameraSection
