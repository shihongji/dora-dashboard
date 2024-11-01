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
        "game_date": "2024-10-24",
        "venue": "辽宁体育馆",
        "status": "In Progress",
        "game_time": 2160,
        "quarter": 4,
        "time_left_in_quarter": "12:00",
        "possession": "home",
        "event_type": "3-pointer",
        "event_description": "小楼昨夜又东风，故国不堪回首月明中。（李煜《虞美人》）"
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