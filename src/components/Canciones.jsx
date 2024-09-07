import React from "react";

export const Canciones = ({ songs, setSelectedSong }) => {
  return (
    <ul className="divide-y divide-gray-700">
      {songs.map((song) => (
        <li
          key={song.id}
          className="flex items-center gap-x-4 py-3 cursor-pointer hover:bg-gray-700"
          onClick={() => setSelectedSong(song)}
        >
          <img className="h-12 w-12 rounded-full bg-gray-700" src={song.album.images[0].url} alt={song.name} />
          <div className="flex-1">
            <p className="text-sm font-semibold">{song.name}</p>
            <p className="text-sm text-gray-400">{song.artists[0].name}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
