"use client";

import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

interface PlayerProps {
  onTimeUpdate: (seconds: number) => void;
}

const Player: React.FC<PlayerProps> = ( {onTimeUpdate} ) => {
  const [isMounted, setIsMounted] = useState(false);
  const [, setPalyedSeconds] = useState(0);

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    // trim the decimal points to 2
    playedSeconds = Math.round(playedSeconds * 100) / 100;
    setPalyedSeconds(playedSeconds);
    onTimeUpdate(playedSeconds);
  }


  // Ensure the player only renders on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex-1 bg-gray-300">
      {isMounted ? (
        <div className="rounded-lg shadow-md overflow-auto">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=ZUXj6HRJCYQ"
          controls={true}
          width={"100%"}
          height={"500px"}
          onProgress={handleProgress}
        />
        </div>
      ) : (
        <p>Loading player...</p> // Optional: a fallback or loader while the player mounts
      )}
    </div>
  );
};

export default Player;
