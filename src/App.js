import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArtistDetails from './pages/ArtistDetails';
import Home from './pages/Home';   

function App() { 

  /*
  return (
    <div className="App">
      <AlbumDetails />
      <SongBar />
      <SongBar />
      <SongBar />
      <SongBar />
      <SongBar />
      <SongBar />
      <SongBar />
      <SongBar />
    </div>
  );
  */

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/artist/:artistId" element={<ArtistDetails />} />  
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; 

 
