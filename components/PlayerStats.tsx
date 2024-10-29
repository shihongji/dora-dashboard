'use client';
import React from 'react';

interface PlayerStatsProps {
    playerId: string | null;
}   

const PlayerStats: React.FC<PlayerStatsProps> = ({playerId}) => {
  console.log(playerId);
  // Sample stats data for a player
  const playerStats = {
    threePoint: 5 ,
    rebounds: 12 ,
    twoPoint: 8 ,
    freeThrow: 6 ,
    steals: 3 ,
    blocks: 2 ,
    playTime: `32:15`,
    fouls: 4 ,
  };

  return (
    <div className="w-full p-4 border border-gray-300 rounded-lg">
      <div className="flex justify-around bg-gray-200 py-2 font-semibold text-xl text-gray-700">
        <div>三分</div>
        <div>篮板</div>
        <div>二分</div>
        <div>罚篮</div>
        <div>抢断</div>
        <div>盖帽</div>
        <div>出场时间</div>
        <div>犯规</div>
      </div>
      <div className="flex justify-around py-2 text-xl text-gray-800">
        <div>{playerStats.threePoint}</div>
        <div>{playerStats.rebounds}</div>
        <div>{playerStats.twoPoint}</div>
        <div>{playerStats.freeThrow}</div>
        <div>{playerStats.steals}</div>
        <div>{playerStats.blocks}</div>
        <div>{playerStats.playTime}</div>
        <div>{playerStats.fouls}</div>
      </div>
    </div>
  );
};

export default PlayerStats;