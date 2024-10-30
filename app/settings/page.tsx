// app/settings/page.tsx
"use client"; // Add this to ensure it's treated as a client component
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Label, Button, Select, TextInput } from "flowbite-react";
import HistoryData from "@/components/HistoryDataChecker";
import Header from "@/components/Header";

const Settings: React.FC = () => {
  const router = useRouter();
  const [selectGame, setSelectGame] = useState("0406");
  const [bannerText, setBannerText] = useState(
    "引援 ，伤病预警， 细节的球员特点「训练大模块」demo 阶段未展现，依赖后续大规模训练算法调优。"
  );
  const initialData = [
    { index: 0, nameEn: "playTime", nameCn: "时间", display: true },
    { index: 1, nameEn: "points", nameCn: "得分", display: true },
    { index: 2, nameEn: "offensiveRebounds", nameCn: "前板", display: true },
    { index: 3, nameEn: "defensiveRebounds", nameCn: "后板", display: true },
    { index: 4, nameEn: "totalRebounds", nameCn: "篮板", display: true },
    { index: 5, nameEn: "assists", nameCn: "助攻", display: true },
    { index: 6, nameEn: "steals", nameCn: "抢断", display: true },
    { index: 7, nameEn: "blocks", nameCn: "盖帽", display: true },
    { index: 8, nameEn: "fouls", nameCn: "犯规", display: true },
    { index: 9, nameEn: "turnovers", nameCn: "失误", display: true },
    { index: 10, nameEn: "fieldGoalsMade", nameCn: "投篮命中", display: true },
    {
      index: 11,
      nameEn: "fieldGoalsAttempted",
      nameCn: "投篮出手",
      display: true,
    },
    {
      index: 12,
      nameEn: "fieldGoalPercentage",
      nameCn: "投篮%",
      display: true,
    },
    {
      index: 13,
      nameEn: "threePointersMade",
      nameCn: "三分命中",
      display: true,
    },
    {
      index: 14,
      nameEn: "threePointersAttempted",
      nameCn: "三分出手",
      display: true,
    },
    {
      index: 15,
      nameEn: "threePointPercentage",
      nameCn: "三分%",
      display: true,
    },
    { index: 16, nameEn: "freeThrowsMade", nameCn: "罚球命中", display: true },
    {
      index: 17,
      nameEn: "freeThrowsAttempted",
      nameCn: "罚球出手",
      display: true,
    },
    {
      index: 18,
      nameEn: "freeThrowPercentage",
      nameCn: "罚球%",
      display: true,
    },
  ];

  const [historicalData, setHistoricalData] = useState(initialData);

  useEffect(() => {
    const storedData = localStorage.getItem("historicalData");
    if (storedData) {
      setHistoricalData(JSON.parse(storedData));
    }
  }, []);
  const handleCheckboxChange = (index: number) => {
    const updatedData = historicalData.map((item) =>
      item.index === index ? { ...item, display: !item.display } : item
    );
    setHistoricalData(updatedData);
  };
  const handleSubmit = () => {
        // Save historical data display settings
        localStorage.setItem("historicalData", JSON.stringify(historicalData));
    if (selectGame === "0406") {
      localStorage.setItem(
        "videoUrl",
        "https://www.youtube.com/watch?v=Eld1sfrUftQ"
      );
    }
    if (selectGame === "1013") {
      localStorage.setItem(
        "videoUrl",
        "https://www.youtube.com/watch?v=WLkcspZCAwE"
      );
    }
    localStorage.setItem("selectGame", selectGame);
    localStorage.setItem("bannerText", bannerText);

    // Navigate back to the main page
    router.push("/");
  };

  return (
    <div>
    <Header />
    <div className="mt-4 p-4 h-2/6 w-2/5 mx-auto">
      <h1 className="text-2xl font-bold mb-4">设置</h1>
      <hr className="my-4 border-t-2 border-gray-300" />
      <div className="mb-4 block">
        <div className="mb-2 block">
          <Label className="text-base" htmlFor="games" value="选择比赛：" />
        </div>
        <Select
          className="text-base"
          id="games"
          required
          value={selectGame}
          onChange={(e) => setSelectGame(e.target.value)}
        >
          <option value={"0406"}>
            2024年04月06日#常规赛第52轮#天津先行者 广东华南虎#加时赛
          </option>
          <option value={"1013"}>
            2024年10月13日#常规赛第1轮#辽宁本钢 浙江稠州金租#第三节
          </option>
        </Select>
      <hr className="my-4 border-t-2 border-gray-300" />
        <div className="my-2 block">
          <Label
            className="text-base"
            htmlFor="banner"
            value="设置置顶提示："
          />
        </div>
        <TextInput
          id="banner"
          className="text-base"
          placeholder="输入新的置顶提示："
          value={bannerText}
          onChange={(e) => setBannerText(e.target.value)}
        />
      </div>
      <hr className="my-4 border-t-2 border-gray-300" />
      {/* Pass historicalData and handleCheckboxChange as props */}
      <HistoryData 
        historicalData={historicalData} 
        onCheckboxChange={handleCheckboxChange} 
      />
      <hr className="my-4 border-t-2 border-gray-300" />
      <div className="flex items-start gap-4 flex-wrap mt-8 ">
        <Button size="md" onClick={handleSubmit} className="w-1/4 bg-cp-blue text-xl font-bold">
        保存
        </Button>
        <Button
          color="gray"
          size="md"
          onClick={() => router.push("/")}
          className="w-1/4 text-xl"
        >
        取消
        </Button>
      </div>
    </div>
    </div>
  );
};

export default Settings;
