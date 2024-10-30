"use client";
import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { useTranslation } from "next-i18next";

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
  const { t, i18n } = useTranslation("common");
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
      <div className="text-center text-gray-500">{t('loading')}</div>
    );

    const metricLabels: { [key: string]: { en: string; cn: string } } = {
      playTime: { en: "Time", cn: "时间" },
      points: { en: "Points", cn: "得分" },
      offensiveRebounds: { en: "Offensive Rebounds", cn: "前板" },
      defensiveRebounds: { en: "Defensive Rebounds", cn: "后板" },
      totalRebounds: { en: "Total Rebounds", cn: "篮板" },
      assists: { en: "Assists", cn: "助攻" },
      steals: { en: "Steals", cn: "抢断" },
      blocks: { en: "Blocks", cn: "盖帽" },
      fouls: { en: "Fouls", cn: "犯规" },
      turnovers: { en: "Turnovers", cn: "失误" },
      fieldGoalsMade: { en: "Field Goals Made", cn: "投篮命中" },
      fieldGoalsAttempted: { en: "Field Goals Attempted", cn: "投篮出手" },
      fieldGoalPercentage: { en: "Field Goal Percentage", cn: "投篮%" },
      threePointersMade: { en: "Three Pointers Made", cn: "三分命中" },
      threePointersAttempted: { en: "Three Pointers Attempted", cn: "三分出手" },
      threePointPercentage: { en: "Three Point Percentage", cn: "三分%" },
      freeThrowsMade: { en: "Free Throws Made", cn: "罚球命中" },
      freeThrowsAttempted: { en: "Free Throws Attempted", cn: "罚球出手" },
      freeThrowPercentage: { en: "Free Throw Percentage", cn: "罚球%" },
    };

    return (
      <div className="overflow-x-auto">
        <Table className="text-center  text-base">
          <Table.Head className="text-sm">
            {selectedMetrics.map((metric) => (
              <Table.HeadCell key={metric} className="whitespace-normal break-words">{i18n.language === 'en' ? metricLabels[metric].en : metricLabels[metric].cn}</Table.HeadCell>
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
