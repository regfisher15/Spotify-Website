import './App.css'; 

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

const clientId = 'c584f1fbe1fe46e3ab8c424ca34b2504';
const redirectUri = 'http://localhost:3000';

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize");


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

const accessToken = localStorage.getItem('access_token');

if (accessToken === "undefined") {
  authorizeUser(); // Call the function, don't invoke it immediately
} 


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
    }),
  }

  const response = await fetch("https://accounts.spotify.com/api/token", payload);
  const data = await response.json();
  localStorage.setItem('access_token', data.access_token);

  console.log('Access Token:', data.access_token);
}

const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
if (code) {
  getToken(code);
}

/*const getRefreshToken = async () => {
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
   const response = await body.json();

   localStorage.setItem('access_token', response.accessToken);
  // localStorage.setItem('refresh_token', response.refreshToken);
}

const handleError = async (error) => {
  if (error.status === 401 && error.message === 'The access token expired') {
    // Call the function to refresh the access token
    await getRefreshToken();
  } else {
    // Handle other errors as needed
    console.error('Error:', error);
  }
}; */



//GET PROFILE DATA **************************************************************

//Get profile data
export async function getProfile(accessToken) {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });

  const data = await response.json();
  return data; 
}

//use access token from local storage to log the data
try {
  const profileData = await getProfile(accessToken);
  console.log(profileData); // Output the profile data to the console
  // Do something else with the profile data, like updating component state
} catch (error) {
  console.error('Error fetching user profile:', error.message);
} 


/* GET USER"S TOP 10 SONGS *************************************************** */
if (accessToken) {
  fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch top tracks');
    }
    return response.json();
  })
  .then(data => {
    console.log('Top tracks:', data.items);
    // Do something with the top tracks data
  })
  .catch(error => {
    console.error('Error fetching top tracks:', error);
  });
} else {
  console.error('Access token not found');
}