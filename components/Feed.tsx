'use client';
import React, { useState, useEffect } from 'react';
import { GameInsight } from '@data/GenData';
// Define the structure of each advice

interface FeedProps {
  gameInsightArray: GameInsight[];
  onItemClick: (id: string) => void;
}

const Feed: React.FC<FeedProps> = ({ gameInsightArray, onItemClick }) => {
  const [adviceList, setAdviceList] = useState<GameInsight[]>([]);

  useEffect(() => {
    setAdviceList(gameInsightArray);
  }, [gameInsightArray]);

  const handleItemClick = (id: string) => {
    onItemClick(id);
  }

  return (
    <div className="bg-slate-100 p-4 mt-4 h-96 overflow-y-auto rounded-lg shadow-md">
      {/* <h2>Feed</h2> */}
      <div className="mt-2">
        {adviceList.length === 0 ? (
          <p className="text-zinc-400 text-xl">Loading...</p>
        ) : (
          <ul className="list-none">
            {adviceList.map((advice, index) => (
              <li key={index}
                onClick={() => handleItemClick(advice.id)}
               className="mb-2 p-2 rounded-lg cursor-pointer hover:text-zinc-400 transition duration-300 text-lg">
                <span className="text-cp-blue font-semibold">第 {advice.quarter} 节 {advice.time_left_in_quarter}</span> - 
                <span className="text-cp-orange font-bold ml-2">{advice.event_type}</span> - 
                <span className="ml-2">{advice.event_description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Feed;