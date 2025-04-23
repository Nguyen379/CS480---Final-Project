import { Github } from "lucide-react"
import { useState } from "react"

const Footer = () => {
  const [isHovered, setIsHovered] = useState(false)

  const styles = {
    footer: {
      padding: '1.5rem 0',
      textAlign: 'center',
      color: '#737373',
      fontSize: '0.875rem',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '.5rem',
    },
    githubLink: {
      display: 'inline-flex',
      marginBottom: '0.75rem',
      transition: 'transform 0.2s ease, color 0.2s ease',
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      color: isHovered ? '#404040' : '#737373',
      textDecoration: 'none',
    },
    disclaimer: {
      marginTop: '0.25rem',
    },
  }

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <a
          href="https://github.com/Nguyen379/CS480---Final-Project"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.githubLink}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="GitHub Repository"
        >
          <Github style={{ height: '3rem', width: '3rem' }} />
        </a>
        <p>Feelosophy</p>
      </div>
      <p style={styles.disclaimer}>Final Project by Ritika, Anna, Nguyen, and Harold.</p>
    </footer>
  )
}

export default Footer
