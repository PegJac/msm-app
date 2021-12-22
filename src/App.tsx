import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GenrePicker } from './components/GenrePicker'
import { LandingPage } from './components/LandingPage';
import { Thumbnails } from './components/Thumbnails';

import './App.css';
import './styles/landingPage.scss'
import './styles/genrePicker.scss'

function App() {
  return (
    <div className="App">
      <h1>APP</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <LandingPage />
              <GenrePicker />
            </>}
          />
          <Route path="/genre/:id" element={<Thumbnails />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
