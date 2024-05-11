import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

const ArtistDetails = () => {
    const { artistId } = useParams();
    const [theArtist, setTheArtist] = useState(artistId);

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

    return (
        <div className='artist'>
            {theArtist && <h1>{theArtist.name}</h1>}
        </div>
    );
};

export default ArtistDetails;
