import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Attendance Form' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/employees', label: 'Employees' }
  ];

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <h2 style={styles.logoText}>ATTENDANCE TRACKER</h2>
        </div>
        <ul style={styles.navList}>
          {navItems.map(item => (
            <li key={item.path} style={styles.navItem}>
              <Link
                to={item.path}
                style={{
                  ...styles.navLink,
                  ...(location.pathname === item.path ? styles.navLinkActive : {})
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#343a40',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    display: 'flex',
    alignItems: 'center'
  },
  logoText: {
    color: '#3bf4f7',
    margin: 0,
    fontSize: '1.5rem'
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: '2rem'
  },
  navItem: {
    margin: 0
  },
  navLink: {
    color: '#ffffff',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease'
  },
  navLinkActive: {
    backgroundColor: '#3bf4f7',
    color: '#343a40'
  }
};

export default Navbar;