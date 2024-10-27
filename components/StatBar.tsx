'use client';
import React from "react";

interface StatBarProps {
  value: number; // Value between 0 and 100
}

const StatBar: React.FC<StatBarProps> = ({ value }) => {
    return (
        <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden mt-1">
        <div
          className="h-full bg-emerald-400"
          style={{
            width: `${value}%`,
            backgroundSize: `100% 100%`,
            backgroundPosition: `${100 - value}% 0`,
          }}
        ></div>
      </div>
    );
  };

export default StatBar;