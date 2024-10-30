"use client";
import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";

interface PlayerStatsProps {
  playerId: string | null;
  teamHome: boolean;
  statsPeriod: "lastGame" | "last5Games" | "lastSeason";
}
interface PlayerStats {
  playTime: string;
  points: string;
  offensiveRebounds: string;
  defensiveRebounds: string;
  totalRebounds: string;
  assists: string;
  steals: string;
  blocks: string;
  fouls: string;
  turnovers: string;
  fieldGoalsMade: string;
  fieldGoalsAttempted: string;
  fieldGoalPercentage: string;
  threePointersMade: string;
  threePointersAttempted: string;
  threePointPercentage: string;
  freeThrowsMade: string;
  freeThrowsAttempted: string;
  freeThrowPercentage: string;
}

interface Player {
  ID: string;
  name: string;
  team: string;
  number: number;
  stats: PlayerStats;
}
const PlayerStats: React.FC<PlayerStatsProps> = ({
  playerId,
  statsPeriod,
  teamHome,
}) => {
  const [player, setPlayer] = useState<Player | null>(null);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  useEffect(() => {
    // Retrieve and filter selected metrics from localStorage
    const storedData = localStorage.getItem("historicalData");
    if (storedData) {
      const metrics = JSON.parse(storedData)
        .filter((metric: { display: boolean }) => metric.display)
        .map((metric: { nameEn: string }) => metric.nameEn);
      setSelectedMetrics(metrics);
    }
  }, []);

  useEffect(() => {
    if (!playerId) {
      return;
    }
    const selectedGame = localStorage.getItem("selectGame"); // '1013' or '0406'
    const requestUrl = teamHome
      ? `/api/player-history/${selectedGame}?home=true&period=${statsPeriod}&playerId=${playerId}`
      : `/api/player-history/${selectedGame}?home=false&period=${statsPeriod}&playerId=${playerId}`;

    const fetchPlayerStats = async () => {
      try {
        const response = await fetch(requestUrl);
        const data = await response.json();
        setPlayer(data.players[0]);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch player images:", error);
      }
    };

    fetchPlayerStats();
  }, [playerId, statsPeriod, teamHome]);

  if (!player)
    return (
      <div className="text-center text-gray-500">Loading player stats...</div>
    );

    const metricLabels: { [key: string]: string } = {
      playTime: "时间",
      points: "得分",
      offensiveRebounds: "前板",
      defensiveRebounds: "后板",
      totalRebounds: "篮板",
      assists: "助攻",
      steals: "抢断",
      blocks: "盖帽",
      fouls: "犯规",
      turnovers: "失误",
      fieldGoalsMade: "投篮命中",
      fieldGoalsAttempted: "投篮出手",
      fieldGoalPercentage: "投篮%",
      threePointersMade: "三分命中",
      threePointersAttempted: "三分出手",
      threePointPercentage: "三分%",
      freeThrowsMade: "罚球命中",
      freeThrowsAttempted: "罚球出手",
      freeThrowPercentage: "罚球%",
    };

    return (
      <div className="overflow-x-auto">
        <Table className="text-center table-fixed text-base">
          <Table.Head className="text-base">
            {selectedMetrics.map((metric) => (
              <Table.HeadCell key={metric}>{metricLabels[metric]}</Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              {selectedMetrics.map((metric) => (
                <Table.Cell key={metric} className="text-gray-800">
                  {player.stats[metric as keyof PlayerStats]}
                </Table.Cell>
              ))}
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
};

export default PlayerStats;
