// app/settings/page.tsx
"use client"; // Add this to ensure it's treated as a client component
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Label, Button, Select, TextInput } from "flowbite-react";

const Settings: React.FC = () => {
  const router = useRouter();
  const [selectGame, setSelectGame] = useState("0406");
  const [bannerText, setBannerText] = useState(
    "引援 ，伤病预警， 细节的球员特点「训练大模块」demo 阶段未展现，依赖后续大规模训练算法调优。"
  );

  const handleSubmit = () => {
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
    <div className="p-4 h-2/6 w-2/5 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="mb-4 block">
        <div className="mb-2 block">
          <Label className="text-base" htmlFor="games" value="Choose a Game" />
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
        <div className="my-2 block">
          <Label
            className="text-base"
            htmlFor="banner"
            value="Set banner text"
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
      <div className="flex items-start gap-4 flex-wrap">
        <Button size="md" onClick={handleSubmit} className="w-1/4 bg-cp-blue">
          Save
        </Button>
        <Button
          color="gray"
          size="md"
          onClick={() => router.push("/")}
          className="w-1/4"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Settings;
