"use client";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import PlayerHistoryStats from "@/components/PlayerHistoryStats";
import { useTranslation } from "next-i18next";

interface HistoStatsContainerProps {
  playerId: string | null;
  teamHome: boolean;
  selectedTab: number;
}
const HistoStatsContainer: React.FC<HistoStatsContainerProps> = ({playerId, teamHome, selectedTab}) => {
  const { t } = useTranslation("common");

  return (
    <div className="">
      <Tabs>
        <TabList>
          <Tab>{ t('lastGame') }</Tab>
          <Tab>{ t('last5Games') }</Tab>
          <Tab>{ t('lastSeason') }</Tab>
        </TabList>
        <TabPanel>
          <PlayerHistoryStats playerId={playerId} statsPeriod="lastGame" teamHome={teamHome} selectedTab={selectedTab}/>
        </TabPanel>
        <TabPanel>
          <PlayerHistoryStats playerId={playerId} statsPeriod="last5Games" teamHome={teamHome} selectedTab={selectedTab}/>
        </TabPanel>
        <TabPanel>
          <PlayerHistoryStats playerId={playerId} statsPeriod="lastSeason" teamHome={teamHome} selectedTab={selectedTab}/>
        </TabPanel>
        </Tabs>
    </div>
  );
};

export default HistoStatsContainer;