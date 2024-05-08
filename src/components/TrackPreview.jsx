import React from 'react';
import './TrackPreview.css';

const TrackPreview = () => {
    return (
        <div className='track-preview'>
            <img src="images/documentary.jpg" alt='Song'/>
            <div className='track-artist'>
                <p id="track-name">Track Name</p>
                <p id="artist">artist</p>
            </div>
        </div>
    );
};

export default TrackPreview;