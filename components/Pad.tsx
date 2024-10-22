"use client"; // Add this to ensure it's treated as a client component
import AlertText from "@/components/AlertText";
import ScoreBoard from "@/components/ScoreBoard";
import { useEffect, useState } from "react";
const Pad = ({ currentSeconds }: { currentSeconds: number }) => {
  const [gameState, setGameState] = useState({
    team1: "辽宁本钢",
    team2: "天津先行者",
    score1: 68,
    score2: 59,
    quarter: "4",
    timeRemaining: "05:20",
  });

  // Function to simulate updating time remaining and scores
  const updateGameState = () => {
    const minutes = Math.floor((720 - currentSeconds) / 60);  // Convert to minutes remaining
    const seconds = Math.floor((720 - currentSeconds) % 60);

    // Format the remaining time
    const formattedTime = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

    // Incrementation logic for score1 and score2 based on time range
    let updatedScore1 = 68;
    let updatedScore2 = 59;

    if (currentSeconds >= 60 && currentSeconds < 120) {
      updatedScore1 += 2; // After 1 minute, Team 1 scores 2 points
    } else if (currentSeconds >= 120 && currentSeconds < 240) {
      updatedScore1 += 4; // After 2-4 minutes, Team 1 scores another 2 points
      updatedScore2 += 3; // Team 2 scores 3 points
    } else if (currentSeconds >= 240 && currentSeconds < 360) {
      updatedScore1 += 6; // After 4-6 minutes, Team 1 scores 2 more points
      updatedScore2 += 6; // Team 2 scores another 3 points
    } else if (currentSeconds >= 360 && currentSeconds < 480) {
      updatedScore1 += 10; // After 6-8 minutes, Team 1 adds 4 points
      updatedScore2 += 9; // Team 2 adds 3 more points
    } else if (currentSeconds >= 480 && currentSeconds < 900) {
      updatedScore1 += 20; // Team 1 gradually adds up to 20 points
      updatedScore2 += 15; // Team 2 gradually adds up to 15 points
    }

    setGameState({
      ...gameState,
      score1: updatedScore1,
      score2: updatedScore2,
      timeRemaining: formattedTime,
    });
  };
  useEffect(() => {
    updateGameState();
  }, [currentSeconds]);
  return (
    <>
      <div className="bg-gray-300 h-full">
      <ScoreBoard
        team1={gameState.team1}
        team2={gameState.team2}
        score1={gameState.score1}
        score2={gameState.score2}
        quarter={gameState.quarter}
        timeRemaining={gameState.timeRemaining}
      />
        <div className="flex-1 bg-gray-200 p-4 flex items-center justify-center">
          <div className="flex items-center justify-center h-full">
            <AlertText />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pad;
