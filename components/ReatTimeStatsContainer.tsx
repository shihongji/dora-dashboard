"use client";
import React from "react";
import StatBar from "./StatBar";

interface RealTimeStatsContainerProps {
  playerId: number | null;
}

const RealTimeStatsContainer: React.FC<RealTimeStatsContainerProps> = ({ playerId }) => {
  // Sample data for each metric
  const stats = [
    { label: "Stamina", label_zh: "体能", value: 85, img: "/icons/Stamina.png" },
    { label: "Shooting Form",label_zh: "手感", value: 28, img: "/icons/ShootingForm.png" },
    { label: "Three-Point Shooting Ability",label_zh: "三分投射", value: 50, img: "/icons/ThreePointAbility.png" },
    { label: "Finishing Ability",label_zh: "终结能力", value: 12, img: "/icons/FinishingAbility.png" },
    { label: "Dribbling and Driving Ability",label_zh: "突破能力", value: 75, img: "/icons/DribblingAbility.png" },
    { label: "Lateral Defense Ability",label_zh: "移动防守", value: 88, img: "https://via.placeholder.com/40" },
    { label: "Rim Protection Efficiency",label_zh: "篮下防守", value: 63, img: "/icons/RimProtection.png" },
    { label: "Tactical Execution Ability",label_zh: "战术执行", value: 99, img: "/icons/TaciticalAbiligy.png" },
    { label: "Playmaking Ability",label_zh: "组织串联", value: 61, img: "https://via.placeholder.com/40" },
    { label: "Rebounding Ability",label_zh: "篮板能力", value: 86, img: "/icons/ReboundingAbility.png" },
  ];

  return (
    <div className="bg-gray-200 mt-2 p-4 rounded-lg">
      <div className="grid grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center p-2 bg-white rounded-md shadow">
            <img src={stat.img} alt={stat.label} className="w-10 h-10 rounded-full mr-4" />
            <div className="flex flex-col flex-grow">
                <div className="flex justify-between my-auto text-gray-600 text-xl">
              <span className="">{stat.label_zh}</span>
              <span className="">{stat.value}</span>
              </div>
                <StatBar value={stat.value} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealTimeStatsContainer;