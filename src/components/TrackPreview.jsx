import React from 'react';
import './TrackPreview.css';

const TrackPreview = ({recTrack}) => {
    return (
        <div className='track-preview'>
            <img src={recTrack.album.images[0].url} alt='Song'/>
            <div className='track-artist'>
                <p id="track-name">{recTrack.name}</p>
                <p id="artist">{recTrack.artists[0].name}</p>
            </div>
        </div>
    );
};

export default TrackPreview;