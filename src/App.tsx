import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { Thumbnails } from './components/Thumbnails';
import { Contact } from './components/Contact';
import { Admin } from './components/admin/Admin';
import { Footer } from './components/Footer';
import { PageNotFound } from './components/PageNotFound';

import './App.css';
import './styles/landingPage.scss'
import './styles/genrePicker.scss'
import { AddTitle } from './components/admin/AddTitle';
import { collection, getFirestore } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firebaseApp } from './firebase';

function App() {

  const [snapshot, loading, error] = useCollectionData(collection(getFirestore(firebaseApp), "titles"),
    { idField: "id" })


  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genre/:id" element={<Thumbnails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/add" element={<AddTitle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <a href="/admin">Admin</a>
        <Footer />
      </BrowserRouter>
    </div >
  );
}

export default App;
