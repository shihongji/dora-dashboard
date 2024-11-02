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
          "team_name": "",
          "score": 74
        },
        "away_team": {
          "team_id": "tj002",
          "team_name": "",
          "score": 59
        },
        "video_time": 0,
        "quarter": 4,
        "time_left_in_quarter": "12:00",
        "action_type": "",
        "action": "",
        "coach_for": "",
        "reason": "1"
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