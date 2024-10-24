"use client"; // Add this to ensure it's treated as a client component
import AlertText from "@/components/AlertText";
import ScoreBoard from "@/components/ScoreBoard";
import { useEffect, useState } from "react";
import { GameInfo, GameInsight } from "@/data/GenData";

interface PadProps {
  gameInfo: Partial<GameInfo>;
  gameInsight: GameInsight | null;
}

const Pad: React.FC<PadProps> = ({ gameInfo, gameInsight }) => {
  // Set initial state with fallback/default values
  const [gameState, setGameState] = useState({
    team1: gameInfo?.home_team?.team_name || "Team A",
    team2: gameInfo?.away_team?.team_name || "Team B",
    score1: gameInfo?.home_team?.score || 0,
    score2: gameInfo?.away_team?.score || 0,
    quarter: gameInfo?.quarter || 1,
    timeRemaining: gameInfo?.time_left_in_quarter || "12:00",
  });

  // Update state when gameInfo changes
  useEffect(() => {
    if (gameInfo) {
      setGameState({
        team1: gameInfo?.home_team?.team_name || "Team A",
        team2: gameInfo?.away_team?.team_name || "Team B",
        score1: gameInfo?.home_team?.score || 0,
        score2: gameInfo?.away_team?.score || 0,
        quarter: gameInfo?.quarter || 1,
        timeRemaining: gameInfo?.time_left_in_quarter || "12:00",
      });
    }
  }, [gameInfo]); // This ensures that the state updates whenever gameInfo changes

  return (
    <>
      <div className="bg-slate-100 h-full rounded-lg shadow-md">
        <ScoreBoard
          team1={gameState.team1}
          team2={gameState.team2}
          score1={gameState.score1}
          score2={gameState.score2}
          quarter={gameState.quarter.toString()}
          timeRemaining={gameState.timeRemaining}
        />
        <div className="flex-1 bg-gray-100 p-4 flex items-center justify-center">
          <div className="flex items-center justify-center h-full">
            <AlertText gameInsight={gameInsight} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pad;
