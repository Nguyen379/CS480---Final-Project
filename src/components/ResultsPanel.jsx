"use client"

import { useState, useEffect } from "react"
import { BarChart, SmilePlus } from "lucide-react"

const ResultsPanel = ({ result }) => {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (result) {
      setAnimate(true)
      const timer = setTimeout(() => setAnimate(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [result])

  const styles = {
    section: {
      marginBottom: '3rem',
      width: '100%',
      maxWidth: '42rem',
      marginInline: 'auto',
    },
    heading: {
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBottom: '1rem',
      color: '#262626',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '1.5rem',
      transform: animate ? 'scale(1.05)' : 'scale(1)',
      transition: 'transform 0.5s ease',
    },
    primaryBox: {
      marginBottom: '1.5rem',
      textAlign: 'center',
    },
    primaryTitle: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#404040',
    },
    primaryEmotion: {
      fontSize: '1.875rem',
      fontWeight: 700,
      marginTop: '0.5rem',
      color: '#171717',
    },
    confidenceText: {
      marginTop: '0.25rem',
      color: '#737373',
    },
    subheading: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.75rem',
    },
    subheadingText: {
      fontWeight: 500,
      color: '#404040',
    },
    emotionBarWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '0.25rem',
    },
    emotionLabel: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#404040',
    },
    confidenceLabel: {
      fontSize: '0.875rem',
      color: '#737373',
    },
    barBackground: {
      width: '100%',
      backgroundColor: '#e5e5e5',
      borderRadius: '9999px',
      height: '0.5rem',
    },
    barForeground: (width) => ({
      width: `${width}%`,
      backgroundColor: '#404040',
      height: '0.5rem',
      borderRadius: '9999px',
      transition: 'width 1s ease-out',
    }),
    placeholder: {
      padding: '2rem 0',
      textAlign: 'center',
      color: '#737373',
    },
    iconPlaceholder: {
      height: '3rem',
      width: '3rem',
      opacity: 0.5,
      margin: '0 auto 0.75rem auto',
    },
  }

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>
        <SmilePlus style={{ height: '1.5rem', width: '1.5rem' }} />
        How are you feeling today?
      </h2>

      <div style={styles.card}>
        {result ? (
          <div>
            <div style={styles.primaryBox}>
              <h3 style={styles.primaryTitle}>Primary Emotion Detected</h3>
              <p style={styles.primaryEmotion}>{result.primaryEmotion}</p>
              <p style={styles.confidenceText}>Confidence: {result.confidence.toFixed(1)}%</p>
            </div>

            <div>
              <div style={styles.subheading}>
                <BarChart style={{ height: '1.25rem', width: '1.25rem', color: '#404040' }} />
                <h4 style={styles.subheadingText}>All Detected Emotions</h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {result.allResults.map((item, index) => (
                  <div key={index}>
                    <div style={styles.emotionBarWrapper}>
                      <span style={styles.emotionLabel}>{item.emotion}</span>
                      <span style={styles.confidenceLabel}>{(item.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div style={styles.barBackground}>
                      <div style={styles.barForeground(item.confidence * 100)}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.placeholder}>
            <SmilePlus style={styles.iconPlaceholder} />
            <p>Open the camera and click "Detect Emotion" to analyze.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ResultsPanel
