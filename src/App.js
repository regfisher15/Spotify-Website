//import React, { useState, useEffect } from 'react';

import AlbumCard from './components/AlbumCard';
import ArtistPic from './components/ArtistPic';
import SongCard from  './components/SongCard';
//import SongBar from './components/SongBar';
//import AlbumDetails from './components/AlbumDetails';
import './App.css';   

import './api.js';
import { getProfile } from './api.js';

//get profile data
const accessToken = localStorage.getItem('access_token');
const profileData = await getProfile(accessToken);

function App() { 

  /*return (
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
  );*/
  
  return (
    <div className="App">
      <h1>Welcome {profileData.display_name}!</h1> 
      
      <div className="minutes-genre">
        <div className="minutes">
          <h3>Minutes Listened</h3>
          <p>100,000</p>
        </div>
        <div className="genre">
          <h3>Top Genre</h3>
          <p>Hip Hop</p>
        </div>
      
      </div>

      <h2>Your Top Songs</h2>

      <div className="top-songs">
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
        <SongCard />
      </div>

      <h2>Your Top Artists</h2>
      <div className="scrollable-row">
        <ArtistPic />
        <ArtistPic />
        <ArtistPic />
        <ArtistPic />
        <ArtistPic />
        <ArtistPic />
        <ArtistPic />
        <ArtistPic />
        <ArtistPic />
        <ArtistPic />
        <ArtistPic />
      </div>

      <h2>Recommended Playlist</h2>
      <div className="recommended-playlist">
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
        <AlbumCard />
      </div>

    </div> 
  ); 
}

export default App; 

 
