import { GameInsight } from "@data/GenData";

interface AlertTextProps {
  gameInsight: GameInsight | null;
}

// components/StyledText.tsx
const AlertText: React.FC<AlertTextProps> = ({ gameInsight }) => {

  return (
    <div className="mt-4 p-4">
      <h3 className="text-4xl font-semibold text-cp-orange text-center mb-4">
      {gameInsight ? gameInsight.event_type : "No pinned event"}
      </h3>
      <div className="flex items-center justify-between text-2xl my-4">
        <span className="text-gray-700 font-medium">{gameInsight ? gameInsight.event_description : "Click the event below to pin it"}</span>
      </div>
    </div>
  );
};

export default AlertText;
