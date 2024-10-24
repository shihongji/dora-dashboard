"use client";

import Pad from "@/components/Pad";
import Player from "@/components/Player";
import Feed from "@/components/Feed";
import { useState } from "react";
import { GameInfo } from "@/data/GenData";
import gameInfoArrayFile from "@/data/gameinfo.json";

export default function Home() {
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [gameInfo, setGameInfo] = useState<Partial<GameInfo>>({});
  // read from the data file
  let gameInfoArray: Partial<GameInfo>[] = gameInfoArrayFile
  // Update the game info to the current time
  const updateGameInfo = (seconds: number): void => {
    if (!gameInfoArray || gameInfoArray.length === 0) return;
    gameInfoArray.sort((a, b) => a.game_time! - b.game_time!);
    let closestGameInfo = gameInfoArray[0];
    for (let i = 1; i < gameInfoArray.length; i++) {
      if (gameInfoArray[i].game_time! <= seconds) {
        closestGameInfo = gameInfoArray[i];
      } else {
        break;
      }
    }
    setGameInfo(closestGameInfo);
    return;
  };

  const handleTimeUpdate = (seconds: number) => {
    setCurrentSeconds(seconds + 3 * 12 * 60);
    updateGameInfo(seconds + 3 * 12 * 60);
  };

  return (
    <div className="p-8 h-screen">
      <p>Current time: {currentSeconds}</p>
      {/* Row 1: Pad and Player horizontally */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <Pad gameInfo={gameInfo} />
        </div>
        <div className="flex-1">
          <Player onTimeUpdate={handleTimeUpdate} />
        </div>
      </div>

      {/* Row 2: Feed below */}
      <div className="">
        <Feed />
      </div>
    </div>
  );
}
