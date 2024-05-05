import React from 'react';
import './AlbumDetails.css';

const AlbumDetails = () => {
    return (
        <div className='details'>
            <div className="left">
                <img src="/images/documentary.jpg" alt='Pic'/> 
            </div>
            <div className="right">
                <div className="title-year">
                    <div className="album-title">Thriller</div>
                    <div className="album-year">1979</div>
                </div>
                <div className="artist-info">
                    <img src="/images/documentary.jpg" alt='Pic'/> 
                    <div className="artist-name">Michael Jackson</div>
                </div>
                <div className="songs-length">
                    <div className="songs">10 songs</div>
                    <p>,</p>
                    <div className="lenth">Length</div>
                </div>
            </div>
        </div>
    );
};

export default AlbumDetails;