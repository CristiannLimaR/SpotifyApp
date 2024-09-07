import React, { useEffect, useState } from "react";
import { useSongs } from "../hooks/useSongs";
import {MusicPlayer} from "./MusicPlayer";

export const App = () => {
  const { searchQuery, setSearchQuery, songs, fetchSongs} = useSongs();
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    fetchSongs(); 
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/3 bg-gray-200 p-4 overflow-y-auto">
        <h1 className="text-xl font-semibold mb-4">Buscador de Música</h1>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar por artista..."
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <button 
          onClick={() => fetchSongs(searchQuery)}
          className="mb-4 p-2 bg-blue-500 text-white rounded"
        >
          Buscar
        </button>
        <h2 className="text-lg font-semibold mb-2">Resultados</h2>
        <ul role="list" className="divide-y divide-gray-100">
          {songs.map((song) => (
            <li key={song.id} className="flex justify-between gap-x-6 py-5" onClick={() => setSelectedSong(song)}>
            <div className="flex min-w-0 gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={song.album.images[0].url} alt={song.name}/>
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{song.name}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{song.artists[0].name}</p>
            </div>
          </li>
            
          ))}
        </ul>
      </div>

      <div className="flex-1 bg-white p-4">
        {selectedSong ? <MusicPlayer song={selectedSong}/> :<h1>Seleccione una cancion para reproducirla</h1> }
      </div>
    </div>
  );
};

              






