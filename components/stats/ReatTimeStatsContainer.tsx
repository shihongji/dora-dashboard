"use client";
import React, { useEffect, useState } from "react";
import StatBar from "@/components/stats/StatBar";
import { AdvancedMetric, statsMap } from "@/types";
import { useTranslation } from "next-i18next";
import { useVideoTime } from "@/context/VideoTimeContext";

interface RealTimeStatsContainerProps {
  playerId: string | null;
  selectedTab: number;
}

const RealTimeStatsContainer: React.FC<RealTimeStatsContainerProps> = ({
  playerId,
  selectedTab,
}) => {
  const [stats, setStats] = useState<AdvancedMetric[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(-1);
  const [lastPlayerId, setLastPlayerId] = useState<string | null>(null);
  const { i18n } = useTranslation("common");
  const { currentSecond } = useVideoTime();
  useEffect(() => {
    const adjustedSeconds = currentSecond - (currentSecond % 60);
    if (playerId === null || selectedTab !== 1) return;
    const selectedGame = localStorage.getItem("selectedGame");
    const fetchStats = async () => {
      try {
        // Append a timestamp query parameter to avoid caching
        const response = await fetch(
          `/api/player-realtime/${selectedGame}?vidTime=${adjustedSeconds}&playerId=${playerId}`,
          { next: { revalidate: 0 } }
        );
        const data = await response.json();
        const playerStats = data.rt[playerId];
        // Map to the desired structure
        const stats = statsMap.map((stat) => {
          let refinedCn = stat.labelCn;

          const [value, max] = playerStats[stat.labelCn] || [0, 0]; // Default to [0, 0] if stat not found
          if (stat.labelCn === "移动防守") {
            refinedCn = "外线防守";
          } else if (stat.labelCn === "篮下防守") {
            refinedCn = "内线防守";
          }
          return {
            labelEn: stat.labelEn,
            labelCn: refinedCn,
            max,
            value: value,
            img: stat.img,
          };
        });
        setStats(stats);
      } catch (error) {
        console.error("Failed to fetch player stats:", error);
      }
    };

    if (
      lastUpdateTime == -1 ||
      currentSecond - lastUpdateTime >= 60 ||
      currentSecond - lastUpdateTime < 0 ||
      playerId !== lastPlayerId
    ) {
      fetchStats();
      setLastPlayerId(playerId);
      setLastUpdateTime(adjustedSeconds);
    }
  }, [playerId, currentSecond]);

  return (
    <div className="bg-gray-200 mt-2 p-4 rounded-lg">
      <div className="grid grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center p-2 bg-white rounded-md shadow"
          >
            <img
              src={stat.img}
              alt={stat.labelEn}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="flex flex-col flex-grow">
              <div className="flex justify-between my-auto text-gray-600 text-lg">
                <span className="">
                  {i18n.language === "en" ? stat.labelEn : stat.labelCn}
                </span>
                <div>
                  <span className="mr-1 font-bold">{stat.value}</span>/
                  <span className="ml-1">{stat.max}</span>
                </div>
              </div>
              <StatBar value={stat.value} max={stat.max} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealTimeStatsContainer;
