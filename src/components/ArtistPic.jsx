import React from 'react';
import './ArtistPic.css';

const ArtistPic = () => {
    return (
        <div className='artist'>
            <div className='pic'>
                <img src="/images/documentary.jpg" alt='Artist'/> 
                <p>Artist Name</p>
            </div>
        </div>
    );
};

export default ArtistPic;