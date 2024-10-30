"use client"; // Add this to ensure it's treated as a client component
import React from "react";
import { Label, Checkbox } from "flowbite-react";
import { useTranslation } from "next-i18next";

interface HistoryDataProps {
  historicalData: { index: number; nameEn: string; nameCn: string; display: boolean }[];
  onCheckboxChange: (index: number) => void;
}
const HistoryData: React.FC<HistoryDataProps> = ({ historicalData, onCheckboxChange }) => {
  const { t, i18n } = useTranslation("common");

  return (
    <div className="my-2 block">
      <Label htmlFor="checkbox" value={t('settings.setHistoryMetrics')} className="text-base"/>
      <div className={`grid gap-4 my-2 ${i18n.language === 'en' ? 'grid-cols-3' : 'grid-cols-5'}`} id="checkbox">
        {historicalData.map((item) => (
          <div key={item.index} className="flex items-center gap-2">
            <Checkbox
              id={item.nameEn}
              checked={item.display}
              onChange={() => onCheckboxChange(item.index)}
            />
            <Label htmlFor={item.nameEn}>{i18n.language === 'en' ? item.nameEn : item.nameCn}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryData;
