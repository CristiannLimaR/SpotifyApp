// src/services/spotifyService.js

const client_id = "716e766f967943628d65c637bb48ddcb";
const client_secret = "3247752507f442dfbe4297ec182bcb2c";

export const getToken=async() =>{
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(client_id + ":" + client_secret),
    },
  });
  return await response.json();
}

export const searchSongs = async(access_token, query)=> {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + access_token,
      },
    }
  );
  const data = await response.json();
  return data.tracks.items;
}

export const fetchPopularSongs = async(access_token)=> {

  const response = await fetch(`https://api.spotify.com/v1/browse/featured-playlists`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const data = await response.json();

  const playlistId = data.playlists.items[0].id;
  const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  const playlistData = await playlistResponse.json();
  return playlistData.tracks.items.map(item => item.track);
}
