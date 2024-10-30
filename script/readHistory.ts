// import required modules
import * as fs from 'fs';
import * as path from 'path';

// Define the type for a player object
interface GameStats {
  playTime: string;              // 上场时间 - Play Time
  points: string;                // 得分 - Points
  offensiveRebounds: string;     // 前板 - Offensive Rebounds
  defensiveRebounds: string;     // 后板 - Defensive Rebounds
  totalRebounds: string;         // 篮板 - Total Rebounds
  assists: string;               // 助攻 - Assists
  steals: string;                // 抢断 - Steals
  blocks: string;                // 盖帽 - Blocks
  fouls: string;                 // 犯规 - Fouls
  turnovers: string;             // 失误 - Turnovers
  fieldGoalsMade: string;        // 投篮命中 - Field Goals Made
  fieldGoalsAttempted: string;   // 投篮出手 - Field Goals Attempted
  fieldGoalPercentage: string;   // 投篮% - Field Goal Percentage
  threePointersMade: string;     // 三分命中 - Three-Pointers Made
  threePointersAttempted: string; // 三分出手 - Three-Pointers Attempted
  threePointPercentage: string;  // 三分% - Three-Point Percentage
  freeThrowsMade: string;        // 罚球命中 - Free Throws Made
  freeThrowsAttempted: string;   // 罚球出手 - Free Throws Attempted
  freeThrowPercentage: string;   // 罚球% - Free Throw Percentage
}

interface PlayerStats {
    name: string;
    number: number;
    team: string;
    lastGame: GameStats;
    last5Games: GameStats;
    lastSeason: GameStats;
}

// Paths to the JSON files
const historyFile = 'data/players_info/1013_history.json';
const playerMapFile = 'data/playerMap.json';

// Function to read and parse JSON files
const readJsonFile = (filePath: string): any[] => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Helper function to safely extract stats or provide default values
const getGameStats = (stats: any): GameStats => ({
    playTime: stats?.["时间"] || "",
    points: stats?.["得分"] || "0",
    offensiveRebounds: stats?.["前板"] || "0",
    defensiveRebounds: stats?.["后板"] || "0",
    totalRebounds: stats?.["篮板"] || "0",
    assists: stats?.["助攻"] || "0",
    steals: stats?.["抢断"] || "0",
    blocks: stats?.["盖帽"] || "0",
    fouls: stats?.["犯规"] || "0",
    turnovers: stats?.["失误"] || "0",
    fieldGoalsMade: stats?.["投篮命中"] || "0",
    fieldGoalsAttempted: stats?.["投篮出手"] || "0",
    fieldGoalPercentage: stats?.["投篮%"] || "0.0%",
    threePointersMade: stats?.["三分命中"] || "0",
    threePointersAttempted: stats?.["三分出手"] || "0",
    threePointPercentage: stats?.["三分%"] || "0.0%",
    freeThrowsMade: stats?.["罚球命中"] || "0",
    freeThrowsAttempted: stats?.["罚球出手"] || "0",
    freeThrowPercentage: stats?.["罚球%"] || "0.0%",
  });
const playerMap = readJsonFile(playerMapFile);
const historyData = readJsonFile(historyFile);
const team1: PlayerStats[] = [];
const team2: PlayerStats[] = [];

let count = 0;
let team1Count = 0;
Object.entries(historyData).forEach(([playerKey, stats]) => {
    count++;
    const playerName = playerKey.split('#')[2];
    const teamName = playerKey.split('#')[0];
    const playerNumber = playerKey.split('#')[1];

    const playerStats: PlayerStats = {
        name: playerName,
        number: parseInt(playerNumber),
        team: teamName,
        lastGame: getGameStats(stats["last_game"]),
        last5Games: getGameStats(stats["last5_game"]),
        lastSeason: getGameStats(stats["last_season"]),
    }


    if (teamName === '辽宁本钢') {
        team1.push(playerStats);
        team1Count++;
    } else {
        team2.push(playerStats);
    }
});
console.log(`Total players: ${count}`);
console.log(`Team 1 players: ${team1Count}`); 
const saveToFile = (players: PlayerStats[], outputPath: string) => {
    try {
        const filePath = path.join(__dirname, outputPath);
        const jsonData = JSON.stringify(players, null, 2);
        fs.writeFileSync(filePath, jsonData, 'utf8');
        console.log(`Player stats have been successfully saved to ${outputPath}`);
    } catch (error) {
        console.error('Error saving player stats:', error);
    }
};

saveToFile(team1, '1013_Liaoning.json');
saveToFile(team2, '1013_Zhejiang.json');
