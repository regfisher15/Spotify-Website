import React from 'react';
import './SongCard.css';

const SongCard = ({track, index}) => {
    // Format the index with leading zeroes
    const formattedIndex = String(index).padStart(2, '0');

    return (
        <div className='song-card'>
            <h3>{formattedIndex}</h3>
            <img src={track.album.images[1].url} alt='Song'/>
            <div className='song-content'>
                <h1>{track.name}</h1>
                <p>{track.artists[0].name}</p>
                <p>4:44</p>
            </div>
        </div>
    );
};

export default SongCard;