"use client";

import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useVideoTime } from "@/context/VideoTimeContext";



const VideoPlayer = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { setCurrentSecond } = useVideoTime();
  const [videoUrl, setVideoUrl] = useState('ot.mp4');

  const handleProgress = ({ playedSeconds }: { playedSeconds: number }) => {
    // trim the decimal points 
    playedSeconds = Math.round(playedSeconds); 
    setCurrentSecond(playedSeconds);
  }


  // Ensure the player only renders on the client side
  useEffect(() => {
    const videoUrl = localStorage.getItem('videoUrl');
    if (videoUrl) {
      setVideoUrl(videoUrl);
    }
    setIsMounted(true);
  }, []);

  return (
    <div className="flex-1 bg-slate-100">
      {isMounted ? (
        <div className="rounded-lg shadow-md overflow-auto">
        <ReactPlayer
          url={videoUrl}
          controls={true}
          width={"100%"}
          height={"500px"}
          onProgress={handleProgress}
          volume={0.2}
        />
        </div>
      ) : (
        <p>Loading player...</p> // Optional: a fallback or loader while the player mounts
      )}
    </div>
  );
};

export default VideoPlayer;
