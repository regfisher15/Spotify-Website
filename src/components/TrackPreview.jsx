import { useState } from 'react';
import React from 'react';
import './TrackPreview.css';
import { Link } from 'react-router-dom';
import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";

const TrackPreview = ({recTrack, trackId}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showSoundIcon, setShowSoundIcon] = useState(false);

    const handlePlayPause = () => {
        const audioPlayer = document.getElementById(`audioPlayer-${trackId}`);
        const audioSource = document.getElementById(`audioSource-${trackId}`);
        
        if (recTrack.preview_url) {
            if (!isPlaying) {

                // Pause all currently playing tracks
                document.querySelectorAll('audio').forEach(player => {
                    if (player !== audioPlayer) {
                        player.pause();
                        player.dataset.playing = "false";  
                        setIsPlaying(false);  
                    }
                });

                //play the track
                audioSource.src = recTrack.preview_url;
                audioPlayer.load();
                audioPlayer.play();
                setIsPlaying(true);
                setShowSoundIcon(true);
                audioPlayer.dataset.playing = "true";
            } else {
                //pause the track
                audioPlayer.pause();
                setIsPlaying(false);
                setShowSoundIcon(false);
                audioPlayer.dataset.playing = "false";
            }
        }
    };

    
    const handleAudioEnded = () => {
        setIsPlaying(false); // Update isPlaying state when audio playback ends
        setShowSoundIcon(false); // Hide sound icon when audio playback ends
        console.log("The track has ended");
    };

    return (
        <div className='track-preview'>
            <audio id={`audioPlayer-${trackId}`} controls style={{ display: 'none' }} onEnded={handleAudioEnded}>
                <source id={`audioSource-${trackId}`} src={recTrack.preview_url} type="audio/mpeg" />
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
                <Link to={`/artist/${recTrack.artists[0].id}`}>
                    <p id="artist">{recTrack.artists[0].name}</p>
                </Link>

                {showSoundIcon && <FaVolumeUp className="sound" />}
            </div>
        </div>
    );
};

export default TrackPreview;