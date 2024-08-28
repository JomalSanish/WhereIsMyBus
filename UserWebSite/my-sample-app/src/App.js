import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure you're using react-router-dom for navigation
import './App.css';
import MainPage from './MainPage';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timer to navigate to a new page after 2 seconds
    const timer = setTimeout(() => {
      navigate('/Mainpage'); // Replace '/newpage' with the actual route you want to navigate to
    }, 2000);

    // Clean up the timer if the component is unmounted before the timer completes
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container">
      <img src="logo.png" alt="Logo" className="icon" />
      <h1 className="titleF">WHERE IS MY BUS</h1>
    </div>
  );
}

export default App;
