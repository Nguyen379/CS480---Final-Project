

const Header = () => {
  const styles = {
    header: {
      padding: '1.5rem 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    title: {
      fontSize: '1.875rem', // text-3xl
      fontWeight: 'bold',
      color: '#262626', // neutral-800
      margin: 0,
    },
  }

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.title}>FEELOSOPHY</h1>
      </div>
    </header>
  )
}

export default Header
