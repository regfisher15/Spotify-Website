import React, { useState, useEffect } from 'react';

//import AlbumCard from './components/AlbumCard';
import ArtistPic from './components/ArtistPic';
import SongCard from  './components/SongCard';
//import SongBar from './components/SongBar';
//import AlbumDetails from './components/AlbumDetails';
import TrackPreview from './components/TrackPreview';
import './App.css';   
import { authorizeUser, getProfile, getTopTracks, getTopArtists, getTopGenre, getRecommendedTracks } from './api.js';


//get profile data
const accessToken = localStorage.getItem('access_token');
const profileData = await getProfile(accessToken);

//get top genre
const topGenre = await getTopGenre(accessToken);

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

  //get top tracks for user
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      const tracks = await getTopTracks(accessToken);
      setTopTracks(tracks);
      console.log(tracks);
    };

    fetchTopTracks();
  }, []);


  //get top artists for user
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const fetchTopArtists = async () => {
      const artists = await getTopArtists(accessToken);
      setTopArtists(artists);
      //console.log(artists);
    }

    fetchTopArtists();
  }, []);

  //get recommended tracks for user
  const [recommendedTracks, setRecommendedTracks] = useState([]);

  useEffect(() => {
    const fetchRecommendedTracks = async () => {
      const recTracks = await getRecommendedTracks(accessToken);
      setRecommendedTracks(recTracks);
      console.log(recTracks);
    }

    fetchRecommendedTracks();
  }, []);
  
  return (
    <div className="entire-background">
        <div className="App">
          <button id="logout" onClick={handleLogout}>Logout</button>

          <h1>Welcome {profileData.display_name}!</h1> 
          
          <div className="artist-genre">
            <div className="top-artist">
              <h3>Top Artist</h3>
              <p>{topArtists[0]?.name}</p>
            </div>
            <div className="genre">
              <h3>Top Genre</h3>
              <p>{topGenre}</p>
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
            {topArtists.map((artist, index) => (
              <ArtistPic key={index} artist={artist}/>
            ))}  
          </div>


          <h2>Recommended Tracks</h2>
          <div className="recommended-tracks">
            {recommendedTracks.map((recTrack, index) => (
              <TrackPreview key={index} recTrack={recTrack} trackId={index}/>
            ))}
          </div> 

        </div> 
    </div>
  ); 
}

export default App; 

 
