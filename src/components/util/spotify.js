import generateRandomString from "./randomString";

// ! Need to enter a spotify clientid in order for the api calls to work.
const clientApiKey = '' //Enter API Key here.

const url = 'https://accounts.spotify.com/authorize';
const clientId = '&client_id=' + encodeURIComponent(clientApiKey);
const redirectURI = '&redirect_uri=' + encodeURIComponent('http://localhost:3000');
const state = '&state=' + encodeURIComponent(generateRandomString(16));
const scope = '&scope=' + encodeURIComponent('playlist-modify-public')

let accessToken;b

const getToken = () => {
  if (accessToken) {
    return accessToken;
  }

  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expirationTimeMatch = window.location.href.match(/expires_in=([^&])/);

  if (accessTokenMatch && expirationTimeMatch) {
    accessToken = accessTokenMatch[1];
    return accessToken;
  } else {
    const requestUrl = url + '?response_type=token' + clientId + redirectURI + state + scope;
    window.location = requestUrl;
  }
}

const search = (term) => {
  const accessToken = Spotify.getToken();

  return fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then(response => {
    return response.json();
  }).then(jsonResponse => {
    // console.log(jsonResponse);
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }));
  })
}

const createPlaylist = async (name, trackUriList) => {
  if (!name || !trackUriList) {
    return;
  }
  const accessToken = Spotify.getToken();

  const userUriResponse = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  const userUri = await userUriResponse.json();
  const userId = userUri.id;

  const playlistCreateBody = {
    "name": name,
    "description": "Created by my spotify api app",
    "public": true
  }
  const playlistHeader = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`
  }
  const playlistCreateFetchOptions = {
    method: "POST",
    headers: playlistHeader,
    body: JSON.stringify(playlistCreateBody)
  }

  const createPlaylistResponseJson = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, playlistCreateFetchOptions)
    .then(response => response.json());
  const playlistId = createPlaylistResponseJson.id;

  const addSongsBody = {
    "uris": trackUriList,
  }
  const addSongOptions = {
    method: "POST",
    headers: playlistHeader,
    body: JSON.stringify(addSongsBody)
  }
  console.log("adding songs to playlist");
  const addSongs = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, addSongOptions)
  console.log("songs added")
}

const Spotify = {getToken, search, createPlaylist}

export default Spotify;