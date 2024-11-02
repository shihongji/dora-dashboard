import React from "react";
import { GameInfo } from "@types";
import { useGameInfos } from "@/context/GameInfoContext";
import { useTranslation } from "next-i18next";

const Events = () => {
  const { t } = useTranslation("common");
  const { gameInfos } = useGameInfos();
  const adviceList = gameInfos
    .filter((info: Partial<GameInfo>) => info.action_type)
    .map((info: Partial<GameInfo>) => ({
      quarter: info.quarter,
      time_left_in_quarter: info.time_left_in_quarter,
      event_type: info.action_type,
      event_description: info.action,
      event_for: info.coach_for,
      reason: info.reason
    }));
    adviceList.reverse();
  return (
    <div className="overflow-y-auto h-80">
      {adviceList.length === 0 ? (
        <p className="text-zinc-400 text-xl">{t("loading")}</p>
      ) : (
        <ul className="list-none ">
          {adviceList.map((advice, index) => (
            <li
              key={index}
              className="mb-2 p-2 rounded-lg cursor-pointer hover:text-zinc-400 transition duration-300 text-lg"
            >
              <div>
              <span className="text-cp-blue font-semibold">
                {advice.quarter} - {advice.time_left_in_quarter} 
              </span>{" "}
              -
                <span
                className={`font-bold ml-2 ${
                  advice.event_for === "天津先行者"
                  ? "text-red-400"
                  : advice.event_for === "广东华南虎"
                  ? "text-green-400"
                  : advice.event_for === "浙江稠州金租"
                  ? "text-violet-900"
                  : advice.event_for === "辽宁本钢"
                  ? "text-green-700"
                  : "text-cp-orange"
                }`}
                >
                {advice.event_for}
                </span>
              <span className="text-cp-orange font-bold ml-2">
                {advice.event_type}
              </span>{" "}
              </div>
              <div>
              <span className="ml-2">{advice.event_description}{advice.reason}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Events;
