"use client";
import React, { useState} from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "@components/core/tabs.css";
import PlayerAvatars from "@/components/player/PlayerAvatars";
import HistoStatsContainer from "@/components/stats/HistoStatsContainer";
import RealTimeStatsContainer from "@/components/stats/ReatTimeStatsContainer";
import Events from "@/components/ui/Events";
import { useTranslation } from "next-i18next";
// Define the structure of each advice


const Feed = () => {
  const { t } = useTranslation("common");
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<number>(0);


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
        <TabPanel><Events /></TabPanel>
        {/* real-time data */}
        <TabPanel>
          <Tabs forceRenderTabPanel defaultIndex={0}>
            <TabList>
              <Tab>{ t('homeTeam') }</Tab>
              <Tab>{ t('awayTeam') }</Tab>
            </TabList>
            <TabPanel>
              <PlayerAvatars onAvatarClick={handlePlayerClick} teamHome={true} dataType="real-time"/>
              <RealTimeStatsContainer playerId={playerId} selectedTab={selectedTab}/>
            </TabPanel>
            <TabPanel>
              <PlayerAvatars onAvatarClick={handlePlayerClick} teamHome={false} dataType="real-time"/>
              <RealTimeStatsContainer playerId={playerId} selectedTab={selectedTab}/>
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