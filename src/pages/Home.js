import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ArtistPic from '../components/ArtistPic';
import SongCard from  '../components/SongCard';
import TrackPreview from '../components/TrackPreview';

import './Home.css';
import '../api.js';
import { authorizeUser, getProfile, getTopTracks, getTopArtists, getTopGenre, getRecommendedTracks } from '../api.js';


//get profile data
const accessToken = localStorage.getItem('access_token');
const profileData = await getProfile(accessToken);

//get top genre
const topGenre = await getTopGenre(accessToken);

//do authorization step again if they logout
const handleLogout = () => {
  localStorage.clear();
  authorizeUser();
}



function Home() { 

  const [time_period, setTimePeriod] = useState("medium_term");

  const handleTimePeriodChange = (newTimePeriod) => {
      setTimePeriod(newTimePeriod);
  };

  console.log(time_period);

  //get top tracks for user
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      const tracks = await getTopTracks(accessToken, time_period);
      setTopTracks(tracks);
      //console.log(tracks);
    };

    fetchTopTracks();
  }, [time_period]);


  //get top artists for user
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const fetchTopArtists = async () => {
      const artists = await getTopArtists(accessToken, time_period);
      setTopArtists(artists);
      //console.log(artists);
    }

    fetchTopArtists();
  }, [time_period]);

  //get recommended tracks for user
  const [recommendedTracks, setRecommendedTracks] = useState([]);

  useEffect(() => {
    const fetchRecommendedTracks = async () => {
      const recTracks = await getRecommendedTracks(accessToken);
      setRecommendedTracks(recTracks);
    }

    fetchRecommendedTracks();
  }, []);

  //console.log(recommendedTracks);
  
  return (
    <div className="entire-background">
      
        <div className="App">
          <button id="logout" onClick={handleLogout}>Logout</button>
          <h1>Welcome {profileData.display_name}!</h1> 

          <div className="time-period">
              <button
                    id="short-term"
                    className={time_period === "short_term" ? "active" : ""}
                    onClick={() => handleTimePeriodChange("short_term")}
                >
                    Past 4 Weeks
                </button>
                <button
                    id="medium-term"
                    className={time_period === "medium_term" ? "active" : ""}
                    onClick={() => handleTimePeriodChange("medium_term")}
                >
                    Past 6 Months
                </button>
                <button
                    id="long-term"
                    className={time_period === "long_term" ? "active" : ""}
                    onClick={() => handleTimePeriodChange("long_term")}
                >
                    1 year +
                </button>
          </div>
                
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
              <Link key={index} to={`/artist/${artist.id}`}>
                <ArtistPic artist={artist} />
              </Link>
            
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

export default Home; 

 
