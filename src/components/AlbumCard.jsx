import React from 'react';
import './AlbumCard.css';

const AlbumCard = ({album}) => {
    return (
        <div className='card'>
            <div className='album-pic'>
                <img src={album.images[0].url} alt='Album'/>
            </div>
            <div className='names'>
                <h2>{ album.name }</h2>
                <p>{ album.artists[0].name }</p>
            </div>
        </div>
    );
};

export default AlbumCard;