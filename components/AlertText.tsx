import { GameInsight } from "@/data/GenData";
import { useEffect, useState } from "react";

interface AlertTextProps {
  gameInsight: GameInsight | null;
}

// components/StyledText.tsx
const AlertText: React.FC<AlertTextProps> = ({ gameInsight }) => {
  const [currentInsight, setCurrentInsight] = useState({
    event_type: gameInsight?.event_type || "暂无置顶事件",
    event_description: gameInsight?.event_description || "点击下方事件置顶",
  })

  useEffect(() => {
    if (gameInsight) {
      setCurrentInsight(gameInsight);
    }
  });

  return (
    <div className="mt-4 p-4">
      <h3 className="text-4xl font-semibold text-cp-orange text-center mb-4">
      {currentInsight.event_type}
      </h3>
      <div className="flex items-center justify-between text-2xl my-4">
        <span className="text-gray-700 font-medium">{currentInsight.event_description}</span>
      </div>
    </div>
  );
};

export default AlertText;
