import React, { useEffect, useState } from "react";
import { useSongs } from "../hooks/useSongs";
import { Canciones } from "./Canciones";
import { MusicPlayer } from "./MusicPlayer";
import { SearchBar } from "./searchBar";

export const App = () => {
  const { searchQuery, setSearchQuery, songs, fetchSongs } = useSongs();
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-black text-white">
      <div className="w-1/4 bg-gray-900 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Reproductor de Spotify</h1>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} fetchSongs={fetchSongs} />
        <h2 className="text-lg font-semibold mb-2">Resultados</h2>
        <Canciones songs={songs} setSelectedSong={setSelectedSong} />
      </div>

      <div className="flex-1 bg-gray-800 p-4">
        {selectedSong ? <MusicPlayer song={selectedSong} /> : <h1 className="text-center mt-10 text-lg">Seleccione una canción para reproducirla</h1>}
      </div>
    </div>
  );
};
