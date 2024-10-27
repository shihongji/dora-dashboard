"use client";

import Pad from "@components/Pad";
import Player from "@components/Player";
import Feed from "@components/Feed";
import { useState } from "react";
import { GameInfo, GameInsight } from "@data/GenData";
import gameInfoArrayFile from "@data/gameInfo.json";
import gameInsightArrayFile from "@data/gameInsights.json";
import Header from "@components/Header";
import BannerContainer from "@components/Banner";

/**
 * The `Home` component serves as the main page for the dashboard application.
 * It manages the state and updates for game information and insights, and 
 * renders the header, banner, pad, player, and feed components.
 *
 * State:
 * - `currentSeconds`: Tracks the current time in seconds.
 * - `pinnedInsight`: Stores the currently pinned game insight.
 * - `gameInfo`: Stores partial game information.
 * - `gameInsights`: Stores an array of game insights.
 *
 * Functions:
 * - `handleItemClick`: Handles the event when an item is clicked in the feed, 
 *   setting the pinned insight based on the clicked item's ID.
 * - `updateGameInfo`: Updates the game information based on the current time.
 * - `updateGameInsights`: Updates the game insights based on the current time.
 * - `handleTimeUpdate`: Handles the time update by adjusting the current seconds 
 *   and updating game information and insights.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
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

  
  /**
   * Handles the time update by adjusting the current seconds and updating game information and insights.
   *
   * @param {number} seconds - The current time in seconds.
   */
  const handleTimeUpdate = (seconds: number) => {
    setCurrentSeconds(seconds + 3 * 12 * 60);
    updateGameInfo(seconds + 3 * 12 * 60);
    updateGameInsights(seconds);
  };

  return (
    <div>
      <Header />
      <BannerContainer pinText="引援 ，伤病预警， 细节的球员特点「训练大模块」demo 阶段未展现，依赖后续大规模训练算法调优。" />
    <div className="p-4 h-screen">
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
    </div>
  );
}
