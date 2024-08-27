import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import MainPage from './MainPage'; // Import the component for the new page

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/MainPage" element={<MainPage />} /> {/* Define the new route */}
    </Routes>
  </BrowserRouter>
);
