import React, { useState } from 'react';
import './MainPage.css';

function MainPage() {
  // State for the input fields
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  
  // State to handle sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to handle swapping of text
  const handleSwap = () => {
    setStartLocation(destination);
    setDestination(startLocation);
  };

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="main-container">
     {/* Sidebar */}
<div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
  {/* Header Section */}
  <div className="sidebar-header">
    <img src="logo.png" alt="Logo" className="sidebar-logo" /> {/* Replace with your logo image path */}
    <h1 className="sidebar-title">WHERE IS MY BUS</h1>
    <button className="close-button" onClick={toggleSidebar}>❮</button>
  </div>

  {/* Version Information */}
  <p className="version-info">Version 1.0.0</p>

  {/* Menu List */}
  <ul className="sidebar-menu">
    <li>
      <img src="info.png" alt="Help" className="menu-icon" /> {/* Replace with your icon path */}
      <a href="#">Help</a>
    </li>
    <li>
      <img src="cont.png" alt="Contact Us" className="menu-icon" /> {/* Replace with your icon path */}
      <a href="#">Contact Us</a>
    </li>
    <li>
      <img src="update.png" alt="Update Apk" className="menu-icon" /> {/* Replace with your icon path */}
      <a href="#">Update Apk</a>
    </li>
    <li>
      <img src="sett.png" alt="Settings" className="menu-icon" /> {/* Replace with your icon path */}
      <a href="#">Settings</a>
    </li>
    <li>
      <img src="rate.png" alt="Rate App" className="menu-icon" /> {/* Replace with your icon path */}
      <a href="#">Rate App</a>
    </li>
    <li>
      <img src="about.png" alt="About Us" className="menu-icon" /> {/* Replace with your icon path */}
      <a href="#">About Us</a>
    </li>
  </ul>
</div>

      {/* Main Content */}
      <header className="header">
        <img src="menu.png" alt="Menu" className="menu-icon" onClick={toggleSidebar} />
        <h1 className="title">WHERE IS MY BUS</h1>
      </header>

      <div className="search-container">
        <h4 className="section-title">Search Bus</h4>
        <div className="search-box">
          <div className="input-group">
            <img src="start.png" alt="Start Location" className="location-icon" />
            <input 
              type="text" 
              placeholder="Enter Starting Location" 
              className="input-field" 
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
            />
          </div>
          <button className="swap-button" onClick={handleSwap}>
            <img src="swap.png" alt="Swap" />
          </button>
          <div className="input-group">
            <img src="loc.png" alt="Destination" className="location-icon" />
            <input 
              type="text" 
              placeholder="Enter Destination" 
              className="input-field" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <button className="search-button">Search</button>
        </div>
      </div>

      <div className="history-container">
        <h4 className="section-title">Search History</h4>
        <div className="history-box">
          <div className="history-item">1123 Vytila - Thodupuza (FP)</div>
          <div className="history-item">2235 Thripunithara - Muvattupuzha (Ordinary)</div>
          <div className="history-item">6352 Kakanaad - Muvattupuzha (SF)</div>
          <div className="history-item">2004 MITS - Thodupuza (Special Service)</div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
