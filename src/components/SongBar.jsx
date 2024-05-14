import { useState } from 'react';
import React from 'react';
import './SongBar.css';

import { FaPlay, FaPause, FaVolumeUp } from "react-icons/fa";

const timeDuration = (durationInMilliseconds) => {
    const durationInSeconds = Math.floor(durationInMilliseconds / 1000);
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`; // Ensure seconds are always two digits
};


const SongBar = ({ trackId, track, artist}) => {

    //handle the music playing functionality
    const [isPlaying, setIsPlaying] = useState(false);
    const [showSoundIcon, setShowSoundIcon] = useState(false);

    const handlePlayPause = () => {
        const audioPlayer = document.getElementById(`audioPlayer-${trackId}`);
        const audioSource = document.getElementById(`audioSource-${trackId}`);
        
        if (track.preview_url) {
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
                audioSource.src = track.preview_url;
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
        <>
            <audio id={`audioPlayer-${trackId}`} controls style={{ display: 'none' }} onEnded={handleAudioEnded}>
                <source id={`audioSource-${trackId}`} src={track.preview_url} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>

            <div className='bar'>
                <div className="number">
                    <p>{trackId + 1}</p>

                    {track.preview_url && (
                        <>
                        
                            {isPlaying ? (
                                <FaPause className="play-icon" onClick={handlePlayPause} />
                            ) : (
                                <FaPlay className="play-icon" onClick={handlePlayPause} />
                            )}
                            
                        </>
                    )} 
                </div>
                <div className='song-title'>
                    <h2>{track.name}</h2>
                    <p>{artist} {showSoundIcon && <FaVolumeUp className="sound" />}</p>
                </div>
                <div className='time'>
                    <p>{timeDuration(track.duration_ms)}</p>
                </div>
            </div>
        </>
    );
};

export default SongBar;