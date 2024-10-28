"use client";
import React, { useEffect, useState } from "react";
import StatBar from "./StatBar";

interface RealTimeStatsContainerProps {
  playerId: number | null;
}

interface Stat {
  label: string;
  label_zh: string;
  max: number;
  value: number;
  img: string;
}

const RealTimeStatsContainer: React.FC<RealTimeStatsContainerProps> = ({
  playerId,
}) => {
  const [stats, setStats] = useState<Stat[]>([]);
  useEffect(() => {
    // Fetch data from the API
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/realtime-player-stats`);
        const data = await response.json();
        setStats(data.stats);
      } catch (error) {
        console.error("Failed to fetch player stats:", error);
      }
    };

    fetchStats();
  }, [playerId]); // Re-fetch if the playerId changes

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
              alt={stat.label}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div className="flex flex-col flex-grow">
              <div className="flex justify-between my-auto text-gray-600 text-xl">
                <span className="">{stat.label_zh}</span>
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
