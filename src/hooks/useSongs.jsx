import { useState, useEffect } from "react";
import { getToken, searchSongs, fetchPopularSongs } from "../services/spotifyService";

export const useSongs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);

  const fetchSongs = async (query) => {
      const tokenResponse = await getToken();
      const accessToken = tokenResponse.access_token;

      let tracks;
      if (query) {
        tracks = await searchSongs(accessToken, query);
      } else {
        tracks = await fetchPopularSongs(accessToken);
      }
      setSongs(tracks);
    
  };

  useEffect(() => {
    fetchSongs(""); 
  }, []);

  return { searchQuery, setSearchQuery, songs, fetchSongs};
};
