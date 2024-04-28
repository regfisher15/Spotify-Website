import React from 'react';
import './SongBar.css';

const SongBar = () => {
    return (
        <div className='bar'>
            <img src="/images/documentary.jpg" alt='Song'/>
            <div className='song-title'>
                <h2>I love Spotify!</h2>
                <p>Jesus</p>
            </div>
            <div className='song-album'>Spotify Album is amazing bruh</div>
            <div className='play-count'>120</div>
            <div className='time'>4:44</div>
        </div>
    );
};

export default SongBar;