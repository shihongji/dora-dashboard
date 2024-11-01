import React from "react";
import { GameInfo } from "@types";
import { useGameInfos } from "@/context/GameInfoContext";
import { useTranslation } from "next-i18next";

const Events = () => {
  const { t } = useTranslation("common");
  const { gameInfos } = useGameInfos();
  const adviceList = gameInfos
    .filter((info: Partial<GameInfo>) => info.event_type)
    .map((info: Partial<GameInfo>) => ({
      quarter: info.quarter,
      time_left_in_quarter: info.time_left_in_quarter,
      event_type: info.event_type,
      event_description: info.event_description,
    }));
    adviceList.reverse();
  return (
    <div className="overflow-y-auto h-80">
      {adviceList.length === 0 ? (
        <p className="text-zinc-400 text-xl">{t("loading")}</p>
      ) : (
        <ul className="list-none">
          {adviceList.map((advice, index) => (
            <li
              key={index}
              className="mb-2 p-2 rounded-lg cursor-pointer hover:text-zinc-400 transition duration-300 text-lg"
            >
              <span className="text-cp-blue font-semibold">
                第 {advice.quarter} 节 {advice.time_left_in_quarter}
              </span>{" "}
              -
              <span className="text-cp-orange font-bold ml-2">
                {advice.event_type}
              </span>{" "}
              -<span className="ml-2">{advice.event_description}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Events;
