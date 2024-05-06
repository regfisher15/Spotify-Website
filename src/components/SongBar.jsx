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
            <div className='time'>
                <p>4:44</p>
            </div>
        </div>
    );
};

export default SongBar;