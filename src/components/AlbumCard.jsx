import React from 'react';
import './AlbumCard.css';

const AlbumCard = ({album}) => {
    return (
        <div className='card'>
            <img src={album.images[0].url} alt='Album'/>
            <div className='names'>
                <h2>{ album.name }</h2>
                <p>{ album.artists[0].name }</p>
            </div>
        </div>
    );
};

export default AlbumCard;