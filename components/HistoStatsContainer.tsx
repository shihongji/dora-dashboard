"use client";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import PlayerStats from "@components/PlayerStats";
import { useEffect } from "react";

interface HistoStatsContainerProps {
  playerId: string | null;
  teamHome: boolean;
}
const HistoStatsContainer: React.FC<HistoStatsContainerProps> = ({playerId, teamHome}) => {

  useEffect(() => {
    // You could optionally log or perform a side effect here if needed
  }, [playerId]);

  return (
    <div className="">
      <Tabs>
        <TabList>
          <Tab>上一场</Tab>
          <Tab>5场</Tab>
          <Tab>上赛季</Tab>
        </TabList>
        <TabPanel>
          <PlayerStats playerId={playerId} statsPeriod="lastGame" teamHome={teamHome}/>
        </TabPanel>
        <TabPanel>
          <PlayerStats playerId={playerId} statsPeriod="last5Games" teamHome={teamHome}/>
        </TabPanel>
        <TabPanel>
          <PlayerStats playerId={playerId} statsPeriod="lastSeason" teamHome={teamHome}/>
        </TabPanel>
        </Tabs>
    </div>
  );
};

export default HistoStatsContainer;