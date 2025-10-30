import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AttendanceForm from './pages/AttendanceForm';
import AttendanceDashboard from './pages/AttendanceDashboard';
import EmployeeList from './pages/EmployeeList';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<AttendanceForm />} />
            <Route path="/dashboard" element={<AttendanceDashboard />} />
            <Route path="/employees" element={<EmployeeList />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;