"use client"; // Add this to ensure it's treated as a client component
import React from "react";
import { Label, Checkbox } from "flowbite-react";

interface HistoryDataProps {
  historicalData: { index: number; nameEn: string; nameCn: string; display: boolean }[];
  onCheckboxChange: (index: number) => void;
}
const HistoryData: React.FC<HistoryDataProps> = ({ historicalData, onCheckboxChange }) => {



  return (
    <div className="my-2 block">
      <Label htmlFor="checkbox" value="选择历史数据的维度：" className="text-base"/>
      <div className="grid grid-cols-5 gap-4 my-2" id="checkbox">
        {historicalData.map((item) => (
          <div key={item.index} className="flex items-center gap-2">
            <Checkbox
              id={item.nameEn}
              checked={item.display}
              onChange={() => onCheckboxChange(item.index)}
            />
            <Label htmlFor={item.nameEn}>{item.nameCn}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryData;
