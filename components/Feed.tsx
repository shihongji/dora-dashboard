"use client";
import React, { useState, useEffect } from "react";
import { GameInsight } from "@data/GenData";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import '@components/tabs.css';
import PlayerAvatars from "@/components/PlayerAvatars";
import HistoStatsContainer from "@/components/HistoStatsContainer";
// Define the structure of each advice

interface FeedProps {
  gameInsightArray: GameInsight[];
  onItemClick: (id: string) => void;
}

const Feed: React.FC<FeedProps> = ({ gameInsightArray, onItemClick }) => {
  const [adviceList, setAdviceList] = useState<GameInsight[]>([]);
  const [playerId, setPlayerId] = useState<number | null>(null);

  useEffect(() => {
    setAdviceList(gameInsightArray);
  }, [gameInsightArray]);

  const handleItemClick = (id: string) => {
    onItemClick(id);
  };

  const handlePlayerClick = (id: number) => {
    setPlayerId(id);
  };

  return (
    <div className="bg-slate-100 p-2 mt-4  rounded-lg shadow-md">
      <Tabs forceRenderTabPanel defaultIndex={0}>
        <TabList>
          <Tab>战术建议</Tab>
          <Tab>实时数据</Tab>
          <Tab>历史数据</Tab>
        </TabList>
        <TabPanel>{showEvents(adviceList, handleItemClick)}</TabPanel>
        {/* real-time data */}
        <TabPanel>
          <Tabs forceRenderTabPanel defaultIndex={0}>
            <TabList>
              <Tab>Home</Tab>
              <Tab>Away</Tab>
            </TabList>
          </Tabs>
        </TabPanel>
        {/* historical data */}
        <TabPanel>
          <Tabs forceRenderTabPanel defaultIndex={0}>
            <TabList>
              <Tab>Home</Tab>
              <Tab>Away</Tab>
            </TabList>
            <TabPanel>
              <PlayerAvatars onAvatarClick={handlePlayerClick}/>
              <HistoStatsContainer playerId={playerId} />
              </TabPanel>
            <TabPanel>
              <PlayerAvatars onAvatarClick={handlePlayerClick}/>
              <HistoStatsContainer playerId={playerId} />
              </TabPanel>
          </Tabs>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Feed;

function showEvents(
  adviceList: GameInsight[],
  handleItemClick: (id: string) => void
) {
  return (
    <div className="overflow-y-auto h-80">
      {adviceList.length === 0 ? (
        <p className="text-zinc-400 text-xl">Loading...</p>
      ) : (
        <ul className="list-none">
          {adviceList.map((advice, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(advice.id)}
              className="mb-2 p-2 rounded-lg cursor-pointer hover:text-zinc-400 transition duration-300 text-lg"
            >
              <span className="text-cp-blue font-semibold">
                第 {advice.quarter} 节 {advice.time_left_in_quarter}
              </span>{" "}
              -
              <span className="text-cp-orange font-bold ml-2">
                {advice.event_type}
              </span>{" "}
              -<span className="ml-2">{advice.event_description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
