import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArtistDetails from './pages/ArtistDetails';
import AlbumDetails from './pages/AlbumDetails';
import Home from './pages/Home';   

function App() { 

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/artist/:artistId" element={<ArtistDetails />} />  
          <Route path="/album/:albumId" element={<AlbumDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; 

 
