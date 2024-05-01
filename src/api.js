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

(async () => {
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
})();

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
