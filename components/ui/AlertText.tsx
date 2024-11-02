import { GameInfo } from "@types";
import { useTranslation } from 'next-i18next';


interface AlertTextProps {
  gameInsight: Partial<GameInfo> | null;
}

// components/StyledText.tsx
const AlertText: React.FC<AlertTextProps> = ({ gameInsight }) => {
  const { t } = useTranslation("common");

  return (
    <div className="mt-4 p-4">
      <h3 className="text-4xl font-semibold text-cp-orange text-center mb-4">
      {gameInsight ? gameInsight.action_type : t('pinned')}
      </h3>
      <div className="flex items-center justify-between text-xl my-4">
        <span className="text-gray-700 font-medium">{gameInsight ? gameInsight.action : t('pinnedDescription')}</span>
      </div>
        <p className="text-gray-600 text-base">{gameInsight ? gameInsight.reason : ""}
          <span>{gameInsight ? `( ${gameInsight.quarter} - ${gameInsight.time_left_in_quarter} )` : " "}</span>
        </p>
    </div>
  );
};

export default AlertText;
