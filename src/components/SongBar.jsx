import React from 'react';
import './SongBar.css';

const SongBar = ({ trackId, track, artist}) => {
    return (
        <div className='bar'>
            <div className="number">
                <p>{trackId + 1}</p>
            </div>
            <div className='song-title'>
                <h2>{track.name}</h2>
                <p>{artist}</p>
            </div>
            <div className='time'>
                <p>4:44</p>
            </div>
        </div>
    );
};

export default SongBar;