'use client';
import React from "react";

interface StatBarProps {
  value: number; // Value between 0 and 100
  max: number; // Maximum value
}

const StatBar: React.FC<StatBarProps> = ({ value, max }) => {
    return (
        <div className="h-4 bg-gray-300 rounded-full overflow-hidden mt-1"
        style={{ width: `${max}%` }}>
        <div
          className="h-full bg-emerald-400"
          style={{
            width: `${value}%`,
            backgroundSize: `100% 100%`,
            backgroundPosition: `${(max - value)/max}% 0`,
          }}
        ></div>
      </div>
    );
  };

export default StatBar;