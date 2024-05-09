import React from 'react';
import './TrackPreview.css';
import { FaPlay } from "react-icons/fa";

const TrackPreview = ({recTrack}) => {
    return (
        <div className='track-preview'>
            <div className="image-container">
                <FaPlay className="play-icon"/>
                <img src={recTrack.album.images[0].url} alt='Song'/>
            </div>
            <div className='track-artist'>
                <p id="track-name">{recTrack.name}</p>
                <p id="artist">{recTrack.artists[0].name}</p>
            </div>
        </div>
    );
};

export default TrackPreview;