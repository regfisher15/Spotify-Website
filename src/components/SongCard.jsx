import React from 'react';
import './SongCard.css';

const timeDuration = (durationInMilliseconds) => {
    const durationInSeconds = Math.floor(durationInMilliseconds / 1000);
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`; // Ensure seconds are always two digits
};

const SongCard = ({track, index}) => {
    // Format the index with leading zeroes
    const formattedIndex = String(index).padStart(2, '0');

    return (
        <div className='song-card'>
            <h3>{formattedIndex}</h3>
            <img src={track.album.images[0].url} alt='Song'/>
            <div className='song-content'>
                <h1>{track.name}</h1>
                <p>{track.artists[0].name}</p>
                <p>{timeDuration(track.duration_ms)}</p>
            </div>
        </div>
    );
};

export default SongCard;