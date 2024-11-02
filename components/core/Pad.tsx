"use client"; // Add this to ensure it's treated as a client component
import AlertText from "@/components/ui/AlertText";
import ScoreBoard from "@/components/ui/ScoreBoard";
import { useEffect } from "react";
import { useVideoTime } from "@/context/VideoTimeContext";
import { useGameInfos } from "@/context/GameInfoContext";

const Pad = () => {
  // Set initial state with fallback/default values
  const { currentSecond } = useVideoTime();
  const { gameInfos, setGameInfos } = useGameInfos();

  useEffect(() => {
    const selectedGame = localStorage.getItem("selectedGame");
    const fetchGameInfo = async () => {
      try {
        const response = await fetch(
          `/api/game-info/${selectedGame}?vidTime=${currentSecond}`,
          { next: { revalidate: 0 } }
        );
        const data = await response.json();
        setGameInfos(data);
      } catch (error) {
        console.error("Failed to fetch game info:", error);
      }
    };
    if ((gameInfos.length > 0 && currentSecond  < gameInfos[gameInfos.length - 1].video_time)) {
      // backwards in time, fetch new data
      fetchGameInfo();
    } else if (currentSecond % 10 === 0) {
      // every 10 seconds, fetch new data
      fetchGameInfo();
    }
  }, [currentSecond]);

  return (
    <div className="bg-slate-100 h-full rounded-lg shadow-md">
      <ScoreBoard
      team1={gameInfos[gameInfos.length - 1]?.home_team?.team_name || "Team A"}
      team2={gameInfos[gameInfos.length - 1]?.away_team?.team_name || "Team B"}
      score1={gameInfos[gameInfos.length - 1]?.home_team?.score || 0}
      score2={gameInfos[gameInfos.length - 1]?.away_team?.score || 0}
      quarter={gameInfos[gameInfos.length - 1]?.quarter?.toString() || ""}
      timeRemaining={gameInfos[gameInfos.length - 1]?.time_left_in_quarter || "12:00"}
      />
      <div className="flex-1 bg-gray-100 p-4 flex items-center justify-center">
      <div className="flex items-center justify-center h-full">
        <AlertText gameInsight={gameInfos.slice().reverse().find(info => info.action_type === "换人" || info.action_type === "暂停") || null} />
      </div>
      </div>
    </div>
  );
};

export default Pad;
