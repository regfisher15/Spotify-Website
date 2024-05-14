import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SongBar from '../components/SongBar';
import './AlbumDetails.css';

const accessToken = localStorage.getItem('access_token');

//function to get album details using album id
async function fetchAlbumDetails(id) {
    const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch album details. Status: ${response.status}`);
    }

    const albumData = await response.json();
    return albumData;
}

const AlbumDetails = () => {
    const { albumId } = useParams();
    const [theAlbum, setTheAlbum] = useState([]);


    useEffect(() => {
        const fetchAlbum = async () => {
            //get album details
            try {
                const albumDetails = await fetchAlbumDetails(albumId);
                setTheAlbum(albumDetails);
            } catch (error) {
                console.error('Error fetching artist details:', error.message);
            }
        };

        fetchAlbum();
    }, [albumId]);

    console.log(theAlbum);

    return (
        <div className="background">
            <div className='album-details'>
                {theAlbum && theAlbum.images && (
                    <div className="left">
                        <img src={theAlbum.images[0].url} alt="Album" />
                    </div>
                )}

                {theAlbum && (
                    <div className="right">
                        <div className="title">
                            <div className="album-title">{ theAlbum.name }</div>
                        </div>
                        <div className="artist-info">
                            {theAlbum.artists && theAlbum.artists.length > 0 && (
                                <div className="artist-name">{ theAlbum.artists[0].name }</div>
                            )}
                        </div>
                        <div className="type-year">
                            {theAlbum.type && theAlbum.type.toUpperCase()} * {theAlbum.release_date && theAlbum.release_date.split('-')[0]}
                        </div>
                        <div className="songs-length">
                            <div className="songs">{ theAlbum.total_tracks } songs</div>
                            <p>,</p>
                            <div className="lenth">Length</div>
                        </div>
                    </div>
                )}
            </div>
            
            <div className="album-songs">
            {theAlbum.tracks && theAlbum.tracks.items && theAlbum.tracks.items.length > 0 && (
                theAlbum.tracks.items.map((track, index) => (
                    <SongBar key={index} track={track} trackId={index} artist={theAlbum.artists[0].name}/>
                ))
            )}
            </div>
        </div>
    );
};

export default AlbumDetails;