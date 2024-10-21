'use client';

import Pad from "@/components/Pad";
import Player from "@/components/Player";
import Feed from "@/components/Feed";
import { useState } from "react";

export default function Home() {
  const [currentSeconds, setCurrentSeconds] = useState(0);

  const handleTimeUpdate = (seconds: number) => {
    setCurrentSeconds(seconds);
  }

  return (
    <div className="p-8 h-screen">
      <p>Current time: {currentSeconds}</p>
      {/* Row 1: Pad and Player horizontally */}
      <div className="flex space-x-4 h-4/6">
        <Pad />
        <Player onTimeUpdate={handleTimeUpdate}/>
      </div>

      {/* Row 2: Feed below */}
      <div className="h-2/6">
        <Feed />
      </div>
    </div>
  );
}
