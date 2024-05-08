import React from 'react';
import './ArtistPic.css';

const ArtistPic = ({artist}) => {
    return (
        <div className='artist'>
            <div className='pic'>
                <img src={artist.images[0].url} alt='Artist'/> 
                <p>{artist.name}</p>
            </div>
        </div>
    );
};

export default ArtistPic;