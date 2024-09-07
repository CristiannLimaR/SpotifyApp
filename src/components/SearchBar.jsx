import React from "react";

export const SearchBar = ({ searchQuery, setSearchQuery, fetchSongs }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar por artista..."
        className="w-full p-2 border border-gray-600 bg-gray-900 text-white rounded focus:outline-none"
      />
      <button
        onClick={() => fetchSongs(searchQuery)}
        className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-400"
      >
        Buscar
      </button>
    </div>
  );
};
