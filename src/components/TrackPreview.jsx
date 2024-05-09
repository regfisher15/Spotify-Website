import { useState } from 'react';
import React from 'react';
import './TrackPreview.css';
import { FaPlay, FaPause } from "react-icons/fa";

const TrackPreview = ({recTrack}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        const audioPlayer = document.getElementById('audioPlayer');
        const audioSource = document.getElementById('audioSource');
        
        if (recTrack.preview_url) {
            if (!isPlaying) {
                audioSource.src = recTrack.preview_url;
                audioPlayer.load();
                audioPlayer.play();
                setIsPlaying(true);
            } else {
                audioPlayer.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <div className='track-preview'>
            <audio id="audioPlayer" controls style={{ display: 'none' }}>
                <source id="audioSource" src="" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            <div className="image-container">
                {recTrack.preview_url && (
                    <>
                        {isPlaying ? (
                            <FaPause className="play-icon" onClick={handlePlayPause} />
                        ) : (
                            <FaPlay className="play-icon" onClick={handlePlayPause} />
                        )}
                    </>
                )} 
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