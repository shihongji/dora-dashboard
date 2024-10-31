"use client";
import React, { useState, useEffect } from "react";
import { GameInsight } from "@types";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "@components/tabs.css";
import PlayerAvatars from "@/components/PlayerAvatars";
import HistoStatsContainer from "@/components/HistoStatsContainer";
import RealTimeStatsContainer from "@components/ReatTimeStatsContainer";
import Events from "@components/Events";
import { useTranslation } from "next-i18next";
// Define the structure of each advice

interface FeedProps {
  currentSeconds: number;
  gameInsightArray: GameInsight[];
  onItemClick: (id: string) => void;
}

const Feed: React.FC<FeedProps> = ({ gameInsightArray, onItemClick, currentSeconds }) => {
  const { t } = useTranslation("common");
  const [adviceList, setAdviceList] = useState<GameInsight[]>([]);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  useEffect(() => {
    setAdviceList(gameInsightArray);
  }, [gameInsightArray]);

  const handleItemClick = (id: string) => {
    onItemClick(id);
  };

  const handlePlayerClick = (id: string) => {
    setPlayerId(id);
  };

  return (
    <div className="bg-slate-100 p-2 mt-4  rounded-lg shadow-md">
      <Tabs forceRenderTabPanel defaultIndex={0} onSelect={(index) => setSelectedTab(index)}>
        <TabList >
          <Tab>{ t('tactics') }</Tab>
          <Tab>{ t('realTime') }</Tab>
          <Tab>{ t('history') }</Tab>
        </TabList>
        <TabPanel><Events adviceList={adviceList} handleItemClick={handleItemClick} /></TabPanel>
        {/* real-time data */}
        <TabPanel>
          <Tabs forceRenderTabPanel defaultIndex={0}>
            <TabList>
              <Tab>{ t('homeTeam') }</Tab>
              <Tab>{ t('awayTeam') }</Tab>
            </TabList>
            <TabPanel>
              <PlayerAvatars onAvatarClick={handlePlayerClick} teamHome={true} dataType="real-time"/>
              <RealTimeStatsContainer playerId={playerId} currentSeconds={currentSeconds} selectedTab={selectedTab}/>
            </TabPanel>
            <TabPanel>
              <PlayerAvatars onAvatarClick={handlePlayerClick} teamHome={false} dataType="real-time"/>
              <RealTimeStatsContainer playerId={playerId} currentSeconds={currentSeconds} selectedTab={selectedTab}/>
            </TabPanel>
          </Tabs>
        </TabPanel>
        {/* historical data */}
        <TabPanel>
          <Tabs forceRenderTabPanel defaultIndex={0}>
            <TabList>
              <Tab>{ t('homeTeam') }</Tab>
              <Tab>{ t('awayTeam') }</Tab>
            </TabList>
            <TabPanel>
              <PlayerAvatars onAvatarClick={handlePlayerClick} teamHome={true} dataType="historical"/>
              <HistoStatsContainer playerId={playerId} teamHome={true} selectedTab={selectedTab}/>
            </TabPanel>
            <TabPanel>
              <PlayerAvatars onAvatarClick={handlePlayerClick} teamHome={false} dataType="historical"/>
              <HistoStatsContainer playerId={playerId} teamHome={false} selectedTab={selectedTab}/>
            </TabPanel>
          </Tabs>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Feed;