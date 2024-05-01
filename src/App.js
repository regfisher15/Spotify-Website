import AlbumCard from './components/AlbumCard';
import ArtistPic from './components/ArtistPic';
import SongCard from  './components/SongCard';
import './App.css';  




function App() { 
  return (

    <div className="App">
      <h1>Welcome user!</h1>
      
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


