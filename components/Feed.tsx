'use client';
import React, { useState, useEffect } from 'react';
import { GameInsight } from '@data/GenData';
import { Tabs } from "flowbite-react";
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
    <div className="bg-slate-100 p-2 mt-4  rounded-lg shadow-md">
    <Tabs aria-label="Default tabs" variant="default">
    <Tabs.Item active title="Events">
      {/* <h2>Feed</h2> */}
      <div className="overflow-y-auto h-80">
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
    </Tabs.Item>
    <Tabs.Item title="Stats">
      <div className='h-80'></div>
      </Tabs.Item>
    <Tabs.Item title="Tab 3">
      <div className='h-80'></div>
      </Tabs.Item>
    <Tabs.Item title="Tab 4">
      <div className='h-80'></div>
      </Tabs.Item>
    </Tabs>
    </div>
  );
};

export default Feed;