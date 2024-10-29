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

  return (
    <div className="overflow-x-auto">
      <Table className="text-center table-fixed">
        <Table.Head>
          <Table.HeadCell>时间</Table.HeadCell>
          <Table.HeadCell>得分</Table.HeadCell>
          <Table.HeadCell>前板</Table.HeadCell>
          <Table.HeadCell>后板</Table.HeadCell>
          <Table.HeadCell>篮板</Table.HeadCell>
          <Table.HeadCell>助攻</Table.HeadCell>
          <Table.HeadCell>抢断</Table.HeadCell>
          <Table.HeadCell>盖帽</Table.HeadCell>
          <Table.HeadCell>犯规</Table.HeadCell>
          <Table.HeadCell>失误</Table.HeadCell>
          <Table.HeadCell>投篮<br></br>命中</Table.HeadCell>
          <Table.HeadCell>投篮<br></br>出手</Table.HeadCell>
          <Table.HeadCell>三分<br></br>命中</Table.HeadCell>
          <Table.HeadCell>三分<br></br>出手</Table.HeadCell>
          <Table.HeadCell>罚球<br></br>命中</Table.HeadCell>
          <Table.HeadCell>罚球<br></br>出手</Table.HeadCell>
          <Table.HeadCell>投篮%</Table.HeadCell>
          <Table.HeadCell>三分%</Table.HeadCell>
          <Table.HeadCell>罚球%</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>
              {player.stats.playTime}
            </Table.Cell>
            <Table.Cell>{player.stats.points}</Table.Cell>
            <Table.Cell>{player.stats.offensiveRebounds}</Table.Cell>
            <Table.Cell>{player.stats.defensiveRebounds}</Table.Cell>
            <Table.Cell>{player.stats.totalRebounds}</Table.Cell>
            <Table.Cell>{player.stats.assists}</Table.Cell>
            <Table.Cell>{player.stats.steals}</Table.Cell>
            <Table.Cell>{player.stats.blocks}</Table.Cell>
            <Table.Cell>{player.stats.fouls}</Table.Cell>
            <Table.Cell>{player.stats.turnovers}</Table.Cell>
            <Table.Cell>{player.stats.fieldGoalsMade}</Table.Cell>
            <Table.Cell>{player.stats.fieldGoalsAttempted}</Table.Cell>
            <Table.Cell>{player.stats.threePointersMade}</Table.Cell>
            <Table.Cell>{player.stats.threePointersAttempted}</Table.Cell>
            <Table.Cell>{player.stats.freeThrowsMade}</Table.Cell>
            <Table.Cell>{player.stats.freeThrowsAttempted}</Table.Cell>
            <Table.Cell>{player.stats.fieldGoalPercentage}</Table.Cell>
            <Table.Cell>{player.stats.threePointPercentage}</Table.Cell>
            <Table.Cell>{player.stats.freeThrowPercentage}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default PlayerStats;
