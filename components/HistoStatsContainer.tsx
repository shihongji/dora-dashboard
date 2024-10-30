"use client";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import PlayerHistoryStats from "@/components/PlayerHistoryStats";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";

interface HistoStatsContainerProps {
  playerId: string | null;
  teamHome: boolean;
}
const HistoStatsContainer: React.FC<HistoStatsContainerProps> = ({playerId, teamHome}) => {
  const { t } = useTranslation("common");
  useEffect(() => {
    // You could optionally log or perform a side effect here if needed
  }, [playerId]);

  return (
    <div className="">
      <Tabs>
        <TabList>
          <Tab>{ t('lastGame') }</Tab>
          <Tab>{ t('last5Games') }</Tab>
          <Tab>{ t('lastSeason') }</Tab>
        </TabList>
        <TabPanel>
          <PlayerHistoryStats playerId={playerId} statsPeriod="lastGame" teamHome={teamHome}/>
        </TabPanel>
        <TabPanel>
          <PlayerHistoryStats playerId={playerId} statsPeriod="last5Games" teamHome={teamHome}/>
        </TabPanel>
        <TabPanel>
          <PlayerHistoryStats playerId={playerId} statsPeriod="lastSeason" teamHome={teamHome}/>
        </TabPanel>
        </Tabs>
    </div>
  );
};

export default HistoStatsContainer;