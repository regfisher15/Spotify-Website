import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TrackPreview from '../components/TrackPreview';
import AlbumCard from '../components/AlbumCard';
import './ArtistDetails.css';

const accessToken = localStorage.getItem('access_token');

//function to get artist profile object based on artist id
async function fetchArtistDetails(id) {
    const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch artist details. Status: ${response.status}`);
    }

    const artistData = await response.json();
    return artistData;
}

//function to get artist top tracks based on artist id
async function fetchArtistTopTracks(id) {
    const response = await fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch artist top tracks. Status: ${response.status}`);
    }

    const artistTopTracks = await response.json();
    return artistTopTracks;
}

//function to get artist top tracks based on artist id
async function fetchArtistAlbums(id) {
    const response = await fetch(`https://api.spotify.com/v1/artists/${id}/albums`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch artist albums. Status: ${response.status}`);
    }

    const artistAlbums = await response.json();
    return artistAlbums;
}

const ArtistDetails = () => {
    const { artistId } = useParams();
    const [theArtist, setTheArtist] = useState({});

    useEffect(() => {
        console.log(artistId);
        const fetchArtist = async () => {
            try {
                const artistDetails = await fetchArtistDetails(artistId);
                setTheArtist(artistDetails);
            } catch (error) {
                console.error('Error fetching artist details:', error.message);
            }
        };

        fetchArtist();
    }, [artistId]);

    const [theArtistTopTracks, setTheArtistTopTracks] = useState({});

    useEffect(() => {
        console.log(artistId);
        const fetchArtistTracks = async () => {
            try {
                const artistTracks = await fetchArtistTopTracks(artistId);
                setTheArtistTopTracks(artistTracks);
            } catch (error) {
                console.error('Error fetching artist top tracks:', error.message);
            }
        };

        fetchArtistTracks();
    }, [artistId]);

    const [theArtistAlbums, setTheArtistAlbums] = useState([]);

    useEffect(() => {

        const fetchAlbums = async () => {
            try {
                const artistAlbums = await fetchArtistAlbums(artistId);
                const albumsOnly = artistAlbums.items.filter(album => album.album_type === 'album');
                setTheArtistAlbums(albumsOnly);
            } catch (error) {
                console.error('Error fetching artist albums:', error.message);
            }
        };

        fetchAlbums();
    }, [artistId]);

    return (
        <div className="entire-background">
            <div className='ArtistDetails'>
                <div className='pic-name'>
                    {theArtist.images && theArtist.images.length > 0 && theArtist.images[0] && (
                        <img src={theArtist.images[0].url} alt="Artist" />
                    )}
                    {theArtist.name && (
                        <h1>{theArtist.name}</h1>
                    )}
                </div>

                <h2>Top Songs</h2>
                <div className='top-tracks'>
                    {theArtistTopTracks && theArtistTopTracks.tracks && (
                        theArtistTopTracks.tracks.map((recTrack, index) => (
                            <TrackPreview key={index} recTrack={recTrack} trackId={index}/>
                        ))
                    )}
                </div>

                <h2>Albums</h2>
                <div className='top-albums'>
                    {theArtistAlbums && (
                        theArtistAlbums.map((album, index) => (
                            <AlbumCard key={index} album={album} trackId={index}/>
                        ))
                    )}
                </div>

                <div className='related-artists'>

                </div>
            </div>
        </div>            
    );
};

export default ArtistDetails;
