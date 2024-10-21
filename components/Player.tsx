"use client";

import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

interface PlayerProps {
  onTimeUpdate: (seconds: number) => void;
}

const Player: React.FC<PlayerProps> = ( {onTimeUpdate} ) => {
  const [isMounted, setIsMounted] = useState(false);
  const [palyedSeconds, setPalyedSeconds] = useState(0);

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    setPalyedSeconds(playedSeconds);
    onTimeUpdate(playedSeconds);
  }

  const formatTime = (seconds: number) => {
    return `current: ${seconds}`;
  };

  // Ensure the player only renders on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex-1 bg-gray-300 p-4">
      <h2>Player</h2>
      {isMounted ? (
        <ReactPlayer
          url="ot.mp4"
          controls={true}
          width={"100%"}
          height={"95%"}
          onProgress={handleProgress}
        />
      ) : (
        <p>Loading player...</p> // Optional: a fallback or loader while the player mounts
      )}
    </div>
  );
};

export default Player;
