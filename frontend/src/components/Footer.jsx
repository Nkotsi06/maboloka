import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.copyright}>
          &copy; {currentYear} Employee Attendance Tracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#343a40',
    color: '#ffffff',
    padding: '1.5rem 0',
    marginTop: 'auto',
    borderTop: '3px solid #3bf4f7',
    textAlign: 'center'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  },
  copyright: {
    margin: 0,
    color: '#adb5bd',
    fontSize: '0.9rem',
    fontWeight: '500'
  }
};

export default Footer;