"use client";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import PlayerStats from "@components/PlayerStats";

interface HistoStatsContainerProps {
  playerId: string | null;
}
const HistoStatsContainer: React.FC<HistoStatsContainerProps> = ({playerId}) => {
  return (
    <div className="bg-gray-200 mt-2">
      <Tabs>
        <TabList>
          <Tab>上一场</Tab>
          <Tab>5场</Tab>
          <Tab>上赛季</Tab>
        </TabList>
        <TabPanel>
          <PlayerStats playerId={playerId}/>
        </TabPanel>
        <TabPanel>
          <PlayerStats playerId={playerId}/>
        </TabPanel>
        <TabPanel>
          <PlayerStats playerId={playerId}/>
        </TabPanel>
        </Tabs>
    </div>
  );
};

export default HistoStatsContainer;