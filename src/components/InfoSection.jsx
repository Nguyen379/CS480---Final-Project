import { Info, Brain, Shield, Zap } from "lucide-react"

const InfoSection = () => {
  const styles = {
    section: {
      marginBottom: '4rem',
      width: '100%',
      maxWidth: '48rem',
      marginInline: 'auto',
    },
    heading: {
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBottom: '1.5rem',
      color: '#262626',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '1.5rem',
    },
    paragraph: {
      color: '#404040',
      marginBottom: '1.5rem',
      lineHeight: '1.75',
    },
    grid: {
      display: 'grid',
      gap: '1.5rem',
      marginTop: '2rem',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    },
    feature: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    iconCircle: {
      backgroundColor: '#f5f5f5',
      padding: '1rem',
      borderRadius: '9999px',
      marginBottom: '1rem',
    },
    featureTitle: {
      fontWeight: 500,
      color: '#262626',
      marginBottom: '0.5rem',
    },
    featureText: {
      fontSize: '0.875rem',
      color: '#525252',
    },
    sectionDivider: {
      marginTop: '2rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid #e5e5e5',
    },
    appTitle: {
      fontWeight: 500,
      color: '#262626',
      marginBottom: '0.75rem',
    },
    ul: {
      paddingLeft: '1.25rem',
      color: '#404040',
    },
    li: {
      marginBottom: '0.5rem',
    },
  }

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>
        <Info style={{ height: '1.5rem', width: '1.5rem' }} />
        About Feelosophy
      </h2>

      <div style={styles.card}>
        <p style={styles.paragraph}>
          Feelosophy uses computer vision and machine learning algorithms to detect and analyze human
          emotions in real-time. Our project can identify primary emotions like happiness, sadness, anger,
          surprise, fear, etc. 
        </p>

        <div style={styles.grid}>
          <div style={styles.feature}>
            <div style={styles.iconCircle}>
              <Brain style={{ height: '1.5rem', width: '1.5rem', color: '#404040' }} />
            </div>
            <h3 style={styles.featureTitle}> Artificial Intelligence and Machine Learning</h3>
            <p style={styles.featureText}>
              Powered by neural networks trained on more than 28000 facial expressions from FER 2013 dataset and tested on around 7000 faces.
            </p>
          </div>

          <div style={styles.feature}>
            <div style={styles.iconCircle}>
              <Shield style={{ height: '1.5rem', width: '1.5rem', color: '#404040' }} />
            </div>
            <h3 style={styles.featureTitle}>Privacy-Focused</h3>
            <p style={styles.featureText}>
              All processing happens locally in the browser and no images are stored or sent to other databases.
            </p>
          </div>

          <div style={styles.feature}>
            <div style={styles.iconCircle}>
              <Zap style={{ height: '1.5rem', width: '1.5rem', color: '#404040' }} />
            </div>
            <h3 style={styles.featureTitle}>Real-Time Analysis</h3>
            <p style={styles.featureText}>
              Get immediate emotion detection results.
            </p>
          </div>
        </div>

        <div style={styles.sectionDivider}>
          <h3 style={styles.appTitle}>Potential Applications</h3>
          <ul style={styles.ul}>
            <li style={styles.li}>User experience research and testing</li>
            <li style={styles.li}>Mental health monitoring and support</li>
            <li style={styles.li}>Educational tools for emotional intelligence</li>
            <li style={styles.li}>Customer satisfaction analysis</li>
            <li style={styles.li}>Interactive entertainment and gaming</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default InfoSection
