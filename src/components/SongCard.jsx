import React from 'react';
import './SongCard.css';

const SongCard = () => {
    return (
        <div className='song-card'>
            <img src="/images/documentary.jpg" alt='Song'/>
            <div className='song-content'>
                <h1>Spotify Is Amazing And I Really Love It again</h1>
                <h2>I love Spotify!</h2>
                <p>200 Plays</p>
                <p>4:44</p>
            </div>
        </div>
    );
};

export default SongCard;