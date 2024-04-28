import AlbumCard from './components/AlbumCard';
import ArtistPic from './components/ArtistPic';
import SongBar from './components/SongBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome user!</h1>
      
      <div className="minutes-genre">
        <p>Minutes Listened</p>
        <p>Top Genre</p>
      </div>

      <h2>Your Top Songs</h2>
      <SongBar />
      

      <h2>Your Top Artists</h2>
      <ArtistPic />

    </div>
  );
}

export default App;
