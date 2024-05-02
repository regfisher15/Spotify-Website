import AlbumCard from './components/AlbumCard';
import ArtistPic from './components/ArtistPic';
import SongCard from  './components/SongCard';
import './App.css';  

//import './api.js';
//import { authorizeUser } from './api.js'; 

//Get profile data
async function getProfile(accessToken) {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  const data = await response.json();
  return data;
}

//use access token from local storage to log the data
const accessToken = localStorage.getItem('access_token');
try {
  const profileData = await getProfile(accessToken);
  console.log(profileData); // Output the profile data to the console
  // Do something else with the profile data, like updating component state
} catch (error) {
  console.error('Error fetching user profile:', error.message);
}


function App() { 
  
  return (

    <div className="App">
      <h1>Welcome user!</h1>
      <button>Authorize</button>
      
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

 
