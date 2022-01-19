import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Thumbnails } from './components/Thumbnails';
import { Contact } from './components/Contact';
import { Admin } from './components/admin/Admin';
import { PageNotFound } from './components/PageNotFound';

import './App.css';
import './styles/landingPage.scss'
import { AddTitle } from './components/admin/AddTitle';
import { LandingPage } from './components/LandingPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/genre/science" element={<Thumbnails genre='science' />} />
          <Route path="/genre/history" element={<Thumbnails genre='history' />} />
          <Route path="/genre/culture" element={<Thumbnails genre='culture' />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/add" element={<AddTitle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}


export default App;
