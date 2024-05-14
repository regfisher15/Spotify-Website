import './index.css';  

//security code for OAuth 2.0 authorization flow
const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

const codeVerifier  = generateRandomString(64);

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
}

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

const getCodeChallenge = async () => {
  const hashed = await sha256(codeVerifier);
  return base64encode(hashed);
}

//declare variables for api calls
const clientId = 'c584f1fbe1fe46e3ab8c424ca34b2504';
const redirectUri = 'http://localhost:3000';

const scope = 'user-read-private user-read-email user-top-read';
const authUrl = new URL("https://accounts.spotify.com/authorize");


//function to authorize user for user data
export const authorizeUser = async () => {
  const codeChallenge = await getCodeChallenge();

  window.localStorage.setItem('code_verifier', codeVerifier);

  const params =  {
    response_type: 'code',
    client_id: clientId,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirectUri,
  }

  authUrl.search = new URLSearchParams(params).toString();
  window.location.href = authUrl.toString();
};

//get access_token and refresh_token after authorization
const getToken = async (code) => {
  let codeVerifier = localStorage.getItem('code_verifier');

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
      scope: 'offline_access',
    }),
  }

  const response = await fetch("https://accounts.spotify.com/api/token", payload);
  const data = await response.json();
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
  localStorage.setItem('expires_in', data.expires_in)

  console.log('Access Token:', data.access_token);
  console.log('Refresh Token:', data.refresh_token);
  console.log('Expires in:', data.expires_in);
}

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
if (code) {
  getToken(code);
}

//authorize user again if token is undefined
let accessToken = localStorage.getItem('access_token');
if (accessToken === "undefined" || !accessToken) {
  authorizeUser(); // Call the function, don't invoke it immediately
} 

//function to refreshh the access token after expiration 
const getRefreshToken = async () => {
  // refresh token that has been previously stored
  const refreshToken = localStorage.getItem('refresh_token');
  const url = "https://accounts.spotify.com/api/token";

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId
    }),
  }
  const body = await fetch(url, payload);
  const response = await body.json(); // Added '=' sign here

  localStorage.setItem('access_token', response.access_token);
  localStorage.setItem('refresh_token', response.refresh_token);
}

/*async function refreshAccessTokenIfNeeded() {
  const accessToken = localStorage.getItem('access_token');

  // Check if access token is expired
  if (!accessToken) {
    console.log('Access token expired: Refreshing token...');
    await getRefreshToken();
  }
}*/


//GET PROFILE DATA ***************************************************************************************

//function to get profile profile data
export async function getProfile(accessToken) {

  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  // Check if the response status is 401
  if (response.status === 401) {
    console.log("Access token expired: Refreshing token...");
    
    //refresh the token
    await getRefreshToken();
  }
  
  // Proceed with parsing the response if it's not a 401 error
  const data = await response.json();
  return data;
} 


//log the profile data
const profileData = await getProfile(accessToken);
console.log(profileData); // Output the profile data to the console


/* GET USER"S TOP 10 SONGS ********************************************************************************* */
export async function getTopTracks(accessToken, timeRange, limit = 50) {
  const url = `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });
  const data = await response.json();
  return data.items; // Return an array of top tracks
}

/* GET USER'S TOP ARTISTS ************************************************************************************/
export async function getTopArtists(accessToken, timeRange = 'long_term', limit = 20) {
  const url = `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=${limit}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });
  const data = await response.json();
  return data.items; // Return an array of top artists
}


/*GET TOP GENRE ********************************************************************************************** */
export const getTopGenre = async (accessToken) => {
  const topArtists = await getTopArtists(accessToken);
  
  // Count occurrences of each genre
  const genreCounts = {};
  topArtists.forEach(artist => {
    artist.genres.forEach(genre => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  });

  // Find the genre with the highest count
  let topGenre = null;
  let maxCount = 0;
  Object.entries(genreCounts).forEach(([genre, count]) => {
    if (count > maxCount) {
      topGenre = genre;
      maxCount = count;
    }
  });

  return topGenre;
};


/*GET RECOMMENDED TRACKS **************************************************/
export async function getRecommendedTracks(accessToken, topGenre) {
  const url = `https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=${encodeURIComponent(topGenre)}&seed_tracks=0c6xIDDpzE81m2q797ordA&limit=20`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });
  const data = await response.json();
  return data.tracks; // Return an array of recommended tracks
}

