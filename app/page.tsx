"use client";

import Pad from "@components/Pad";
import Player from "@components/Player";
import Feed from "@components/Feed";
import { useState } from "react";
import { GameInfo, GameInsight } from "@data/GenData";
import gameInfoArrayFile from "@data/gameinfo.json";
import gameInsightArrayFile from "@data/gameInsights.json";

export default function Home() {
  const [, setCurrentSeconds] = useState(0);
  const [pinnedInsight, setPinnedInsight] = useState<GameInsight | null>(null);
  const [gameInfo, setGameInfo] = useState<Partial<GameInfo>>({});
  const [gameInsights, setGameInsights] = useState<GameInsight[]>([]);

  const handleItemClick = (id: string) => {
    setPinnedInsight(gameInsights.find((insight) => insight.id === id) || null);
  }

  // read from the data file
  const gameInfoArray: Partial<GameInfo>[] = gameInfoArrayFile;
  gameInfoArray.sort((a, b) => a.game_time! - b.game_time!);
  // Update the game info to the current time
  const updateGameInfo = (seconds: number): void => {
    if (!gameInfoArray || gameInfoArray.length === 0) return;
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

  gameInsightArrayFile.sort((a, b) => a.video_time! - b.video_time!);
  const updateGameInsights = (seconds: number): void => {
    // loop the array, append to the gameInsights
    let newInsights = gameInsights;
    const lastTimeExist = gameInsights[0] ? gameInsights[0].video_time! : 0;
    if (lastTimeExist >= seconds) {
      newInsights = [];
    }
    for (let i = 0; i < gameInsightArrayFile.length; i++) {
      if (gameInsightArrayFile[i].video_time! <= lastTimeExist) {
        continue;
      }
      if (gameInsightArrayFile[i].video_time! <= seconds) {
        newInsights = [gameInsightArrayFile[i], ...newInsights];
      } else {
        break;
      }
    }
    setGameInsights(newInsights);
    return;
  };

  const handleTimeUpdate = (seconds: number) => {
    setCurrentSeconds(seconds + 3 * 12 * 60);
    updateGameInfo(seconds + 3 * 12 * 60);
    updateGameInsights(seconds);
  };

  return (
    <div className="p-8 h-screen">
      {/* Row 1: Pad and Player horizontally */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <Pad gameInfo={gameInfo} gameInsight={pinnedInsight} />
        </div>
        <div className="flex-1">
          <Player onTimeUpdate={handleTimeUpdate} />
        </div>
      </div>

      {/* Row 2: Feed below */}
      <div className="">
        <Feed gameInsightArray={gameInsights} onItemClick={handleItemClick}/>
      </div>
    </div>
  );
}
