import React from 'react';
import './AlbumCard.css';

const AlbumCard = () => {
    return (
        <div className='card'>
            <img src="/images/documentary.jpg" alt='Album'/> 
            <div className='names'>
                <h2>Album Name</h2>
                <p>Arist Name</p>
            </div>
        </div>
    );
};

export default AlbumCard;