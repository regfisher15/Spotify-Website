import React, { useState, useEffect } from 'react';

import AlbumCard from './components/AlbumCard';
import ArtistPic from './components/ArtistPic';
import SongCard from  './components/SongCard';
//import SongBar from './components/SongBar';
//import AlbumDetails from './components/AlbumDetails';
import './App.css';   
import { authorizeUser, getProfile, getTopTracks } from './api.js';


//get profile data
const accessToken = localStorage.getItem('access_token');
const profileData = await getProfile(accessToken);

//do authorization step again if they logout
const handleLogout = () => {
  //localStorage.clear();
  authorizeUser();
}

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

  //get top ten tracks for user
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      const tracks = await getTopTracks(accessToken);
      setTopTracks(tracks);
      console.log(tracks);
    };

    fetchTopTracks();
  }, [accessToken]);
  
  return (
    <div className="entire-background">
        <div className="App">
          <button id="logout" onClick={handleLogout}>Logout</button>

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
            {topTracks.map((track, index) => (
              <SongCard key={index} track={track} index={index + 1} />
            ))}
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
    </div>
  ); 
}

export default App; 

 
