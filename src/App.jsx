import React, { useState } from "react";
import MusicPlayerSlider from "./MusicPlayer";

const client_id = "716e766f967943628d65c637bb48ddcb";
const client_secret = "3247752507f442dfbe4297ec182bcb2c";

export const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);

  async function getToken() {
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

  async function searchSongs(access_token, query) {
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

  const handleSearch = async () => {
    const tokenResponse = await getToken();
    const results = await searchSongs(tokenResponse.access_token, searchQuery);
    setSongs(results); 
  };

  return (
    <div>
      <h1>Buscador de Música por Artista</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar por artista..."
      />
      <button onClick={handleSearch}>Buscar</button>

      <div>
        <h2>Resultados</h2>
        <ul>
          {songs.map((song) => (
            <li key={song.id}>
              <p>
                {song.name} - {song.artists[0].name}
              </p>
              {song.preview_url ? (
                <audio controls>
                  <source src={song.preview_url} type="audio/mpeg" />
                  Tu navegador no soporta el elemento de audio.
                </audio>
              ) : (
                <p>No hay preview disponible para esta canción.</p>
              )}
            </li>
          ))}
        </ul>
      </div>
      <MusicPlayerSlider></MusicPlayerSlider>
    </div>
    
  );
};

export default App;
