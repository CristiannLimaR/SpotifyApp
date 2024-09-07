import React, { useState, useRef, useEffect } from "react";

export const MusicPlayer = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (song.preview_url) {
      if (audioRef.current) {
        audioRef.current.src = song.preview_url;
        audioRef.current.load();
      }
      setIsPlaying(false);
    }

    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [song]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (event) => {
    const newTime = parseFloat(event.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(30, audioRef.current.currentTime + 10); 
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      {song.preview_url ? null : (
        <h1 className="text-center text-gray-500 mb-4">Esta canción no tiene vista previa</h1>
      )}
      <div className="flex flex-col items-center">
        <img
          src={song.album.images[0].url}
          alt={`${song.name} - ${song.artists[0].name}`}
          className="w-48 h-48 rounded-lg mb-4"
        />
        <h2 className="text-xl font-semibold text-center mb-2">{song.name}</h2>
        <p className="text-gray-400 text-sm text-center mb-4">{song.artists[0].name}</p>
        {song.preview_url && (
          <div className="flex items-center justify-center mb-4">
            <button
              className="p-3 rounded-full bg-gray-800 hover:bg-gray-700"
              onClick={handleRewind}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M14 6L6 12L14 18V6Z" fill="currentColor" />
              </svg>
            </button>
            <button
              className="p-3 mx-4 rounded-full bg-gray-800 hover:bg-gray-700"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M6 19H8V5H6V19ZM16 5H14V19H16V5Z" fill="currentColor" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M5 3.5V20.5L20 12L5 3.5Z" fill="currentColor" />
                </svg>
              )}
            </button>
            <button
              className="p-3 rounded-full bg-gray-800 hover:bg-gray-700"
              onClick={handleForward}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M10 6L18 12L10 18V6Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        )}
        {song.preview_url && (
          <>
            <input
              type="range"
              min="0"
              max={30}
              value={currentTime}
              onChange={handleTimeChange}
              className="w-full bg-gray-700 accent-green-500"
              style={{ background: `linear-gradient(to right, #1db954 ${((currentTime / 30) * 100)}%, #333 ${((currentTime / 30) * 100)}%)` }}
            />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>{formatTime(currentTime)}</span>
            </div>
          </>
        )}
        <audio
          ref={audioRef}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};
