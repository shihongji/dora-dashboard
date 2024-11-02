import { GameInfo } from '@/types';
import { createContext, useContext, ReactNode, useState } from 'react';

interface GameInfoContextType {
    gameInfos: GameInfo[];
    setGameInfos: (gameInfos: GameInfo[]) => void;
}

const GameInfoContext = createContext<GameInfoContextType | undefined>(undefined);

export const GameInfoProvider = ({ children }: { children: ReactNode }) => {
    const [gameInfos, setGameInfos] = useState<GameInfo[]>([{
        "id": "lrhmn8s07c",
        "game_id": "zbrwuymsf39",
        "home_team": {
          "team_id": "ln020",
          "team_name": "辽宁本钢",
          "score": 74
        },
        "away_team": {
          "team_id": "tj002",
          "team_name": "天津先行者",
          "score": 59
        },
        "video_time": 0,
        "quarter": 4,
        "time_left_in_quarter": "12:00",
        "action_type": "建议",
        "action": "16号田雨，积极拼抢篮板球！",
        "coach_for": "辽宁本钢",
        "reason": "16号田雨篮板能力一般（实时状态24，历史数据3.6个），需要提醒他加强篮板球的拼抢。"
    }]);

    return (
        <GameInfoContext.Provider value={{ gameInfos, setGameInfos }}>
            {children}
        </GameInfoContext.Provider>
    );
}

export const useGameInfos = () => {
    const context = useContext(GameInfoContext);
    if (!context) throw new Error('useGameInfos must be used within a GameInfoProvider');
    return context;
}