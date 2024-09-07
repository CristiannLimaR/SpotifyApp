import React, { useState, useRef, useEffect } from "react";

export const MusicPlayer = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener("loadedmetadata", handleLoadedMetadata);
      }
    };
  }, [song]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (event) => {
    const newTime = parseFloat(event.target.value);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
  };

  const handleRewind = () => {
    audioRef.current.currentTime -= 10;
  };

  const handleForward = () => {
    audioRef.current.currentTime += 10;
  };

  return (
    <>
    {song.preview_url ? null : <h1 className="flex justify-center">Esta Cancion no tiene vista previa</h1>}
    <div className="bg-gray-100 p-4 flex justify-center items-center h-screen">
      
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <img
          src={song.album.images[0].url}
          alt={`${song.name} - ${song.artists[0].name}`}
          className="w-64 h-64 mx-auto rounded-lg mb-4 shadow-lg"
        />
        <h2 className="text-xl font-semibold text-center">{song.name}</h2>
        <p className="text-gray-600 text-sm text-center">{song.artists[0].name}</p>
        <div className="mt-6 flex items-center justify-between">
          <button
            className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
            onClick={handleRewind}
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-600"
            >
              <path
                d="M14 6L6 12L14 18V6Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button
            className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-600"
              >
                <path
                  d="M6 19H8V5H6V19ZM16 5H14V19H16V5Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-600"
              >
                <path
                  d="M5 3.5V20.5L20 12L5 3.5Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
          <button
            className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
            onClick={handleForward}
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-600"
            >
              <path
                d="M10 6L18 12L10 18V6Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <div className="mt-6">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleTimeChange}
            className="w-full"
            style={{ background: `linear-gradient(to right, #38b2ac ${((currentTime / duration) * 100)}%, #e2e8f0 ${((currentTime / duration) * 100)}%)` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <audio
          ref={audioRef}
          src={song.preview_url}
          style={{ display: "none" }}
        />
      </div>
    </div>
    </>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
};


