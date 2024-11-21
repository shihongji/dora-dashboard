"use client";
import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { useTranslation } from "next-i18next";
import { Player, PlayerStats, metricLabels } from "@types";

interface PlayerHistoryStatsProps {
  playerId: string | null;
  teamHome: boolean;
  statsPeriod: "lastGame" | "last5Games" | "lastSeason";
  selectedTab: number;
}

const PlayerHistoryStats: React.FC<PlayerHistoryStatsProps> = ({
  playerId,
  statsPeriod,
  teamHome,
  selectedTab,
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
    if (!playerId || selectedTab !== 2) {
      return;
    }
    const selectedGame = localStorage.getItem("selectedGame"); // '1013' or '0406'
    const requestUrl = teamHome
      ? `/api/player-history/${selectedGame}?home=true&period=${statsPeriod}&playerId=${playerId}`
      : `/api/player-history/${selectedGame}?home=false&period=${statsPeriod}&playerId=${playerId}`;

    const fetchPlayerStats = async () => {
      try {
        const response = await fetch(requestUrl);
        const data = await response.json();
        setPlayer(data.players[0]);
      } catch (error) {
        console.error("Failed to fetch player images:", error);
      }
    };

    fetchPlayerStats();
  }, [playerId, statsPeriod, teamHome]);

  if (!player)
    return <div className="text-center text-gray-500">{t("loading")}</div>;

  return (
    <div className="overflow-x-auto">
      <Table className="text-center  text-base">
        <Table.Head className="text-sm">
          {selectedMetrics.map((metric) => (
            <Table.HeadCell
              key={metric}
              className="whitespace-normal break-words"
            >
              {i18n.language === "en"
                ? metricLabels[metric].en
                : metricLabels[metric].cn}
            </Table.HeadCell>
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

export default PlayerHistoryStats;
