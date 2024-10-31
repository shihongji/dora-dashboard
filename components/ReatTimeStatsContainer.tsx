"use client";
import React, { useEffect, useState } from "react";
import StatBar from "@components/StatBar";
import { AdvancedMetric } from "@/types";

interface RealTimeStatsContainerProps {
  playerId: string | null;
  currentSeconds: number;
  selectedTab: number;
}
// Desired labels, mappings, and icons
const statsMap = [
  { labelEn: "Stamina", labelCn: "体能", img: "/icons/Stamina.png" },
  { labelEn: "Shooting Form", labelCn: "手感", img: "/icons/ShootingForm.png" },
  {
    labelEn: "Three-Point Shooting Ability",
    labelCn: "三分投射",
    img: "/icons/ThreePointAbility.png",
  },
  {
    labelEn: "Finishing Ability",
    labelCn: "终结能力",
    img: "/icons/FinishingAbility.png",
  },
  {
    labelEn: "Dribbling and Driving Ability",
    labelCn: "突破能力",
    img: "/icons/DribblingAbility.png",
  },
  {
    labelEn: "Lateral Defense Ability",
    labelCn: "移动防守",
    img: "/icons/undefined.png",
  },
  {
    labelEn: "Rim Protection Efficiency",
    labelCn: "篮下防守",
    img: "/icons/RimProtection.png",
  },
  {
    labelEn: "Tactical Execution Ability",
    labelCn: "战术执行",
    img: "/icons/TaciticalAbiligy.png",
  },
  {
    labelEn: "Playmaking Ability",
    labelCn: "组织串联",
    img: "/icons/undefined.png",
  },
  {
    labelEn: "Rebounding Ability",
    labelCn: "篮板能力",
    img: "/icons/ReboundingAbility.png",
  },
];

const RealTimeStatsContainer: React.FC<RealTimeStatsContainerProps> = ({
  playerId,
  currentSeconds,
  selectedTab
}) => {
  const [stats, setStats] = useState<AdvancedMetric[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(-1);
  const [lastPlayerId, setLastPlayerId] = useState<string | null>(null);
  useEffect(() => {
    const adjustedSeconds = currentSeconds - (currentSeconds % 60);
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
          const [value, max] = playerStats[stat.labelCn] || [0, 0]; // Default to [0, 0] if stat not found
          return {
            labelEn: stat.labelEn,
            labelCn: stat.labelCn,
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
      currentSeconds - lastUpdateTime >= 60 ||
      currentSeconds - lastUpdateTime < 0 ||
      playerId !== lastPlayerId
    ) {
      fetchStats();
      setLastPlayerId(playerId);
      setLastUpdateTime(adjustedSeconds);
    }
  }, [playerId, currentSeconds]);

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
              <div className="flex justify-between my-auto text-gray-600 text-xl">
                <span className="">{stat.labelCn}</span>
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
