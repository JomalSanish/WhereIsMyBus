import React from 'react';
import './MainPage.css';

function MainPage() {
  return (
    <div className="main-container">
      <header className="header">
        <img src="menu.png" alt="Menu" className="menu-icon" />
        <h1 className="title">WHERE IS MY BUS</h1>
      </header>

      <div className="search-container">
        <h2 className="section-title">Search Bus</h2>
        <div className="search-box">
          <div className="input-group">
            <img src="start.png" alt="Start Location" className="location-icon" />
            <input type="text" placeholder="Enter Starting Location (A)" className="input-field" />
          </div>
          <button className="swap-button">
            <img src="swap.png" alt="Swap" />
          </button>
          <div className="input-group">
            <img src="loc.png" alt="Destination" className="location-icon" />
            <input type="text" placeholder="Enter Destination (B)" className="input-field" />
          </div>
          <button className="search-button">Search</button>
        </div>
      </div>

      <div className="history-container">
        <h2 className="section-title">Search History</h2>
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
