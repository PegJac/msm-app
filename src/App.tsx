import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Thumbnails } from './components/Thumbnails';
import { Contact } from './components/Contact';
import { Admin } from './components/Admin';
import { Footer } from './components/Footer';
import { PageNotFound } from './components/PageNotFound';

import './App.css';
import './styles/landingPage.scss'
import './styles/genrePicker.scss'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genre/:id" element={<Thumbnails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div >
  );
}

export default App;
