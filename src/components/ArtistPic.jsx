import { useState } from 'react';
import React from 'react';
import './ArtistPic.css';

const ArtistPic = ({artist}) => {
    
    //handle selected artist info if clicked
    const [selectedArtist, setSelectedArtist] = useState(null);

    const handleArtistClick = (artist) => {
        setSelectedArtist(artist);
    }

    return (
        <div className='artist'>
            <div className='pic'>
                <img src={artist.images[0].url} onClick={() => handleArtistClick(artist)} alt='Artist'/> 
            </div>
            <div className="artist-name">
                <p>{artist.name}</p>
            </div>
        </div>
    );
};

export default ArtistPic;