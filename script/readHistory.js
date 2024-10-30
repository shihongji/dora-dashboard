"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import required modules
var fs = require("fs");
var path = require("path");
// Paths to the JSON files
var historyFile = 'data/players_info/1013_history.json';
var playerMapFile = 'data/playerMap.json';
// Function to read and parse JSON files
var readJsonFile = function (filePath) {
    var data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};
// Helper function to safely extract stats or provide default values
var getGameStats = function (stats) { return ({
    playTime: (stats === null || stats === void 0 ? void 0 : stats["时间"]) || "",
    points: (stats === null || stats === void 0 ? void 0 : stats["得分"]) || "0",
    offensiveRebounds: (stats === null || stats === void 0 ? void 0 : stats["前板"]) || "0",
    defensiveRebounds: (stats === null || stats === void 0 ? void 0 : stats["后板"]) || "0",
    totalRebounds: (stats === null || stats === void 0 ? void 0 : stats["篮板"]) || "0",
    assists: (stats === null || stats === void 0 ? void 0 : stats["助攻"]) || "0",
    steals: (stats === null || stats === void 0 ? void 0 : stats["抢断"]) || "0",
    blocks: (stats === null || stats === void 0 ? void 0 : stats["盖帽"]) || "0",
    fouls: (stats === null || stats === void 0 ? void 0 : stats["犯规"]) || "0",
    turnovers: (stats === null || stats === void 0 ? void 0 : stats["失误"]) || "0",
    fieldGoalsMade: (stats === null || stats === void 0 ? void 0 : stats["投篮命中"]) || "0",
    fieldGoalsAttempted: (stats === null || stats === void 0 ? void 0 : stats["投篮出手"]) || "0",
    fieldGoalPercentage: (stats === null || stats === void 0 ? void 0 : stats["投篮%"]) || "0.0%",
    threePointersMade: (stats === null || stats === void 0 ? void 0 : stats["三分命中"]) || "0",
    threePointersAttempted: (stats === null || stats === void 0 ? void 0 : stats["三分出手"]) || "0",
    threePointPercentage: (stats === null || stats === void 0 ? void 0 : stats["三分%"]) || "0.0%",
    freeThrowsMade: (stats === null || stats === void 0 ? void 0 : stats["罚球命中"]) || "0",
    freeThrowsAttempted: (stats === null || stats === void 0 ? void 0 : stats["罚球出手"]) || "0",
    freeThrowPercentage: (stats === null || stats === void 0 ? void 0 : stats["罚球%"]) || "0.0%",
}); };
var playerMap = readJsonFile(playerMapFile);
var historyData = readJsonFile(historyFile);
var team1 = [];
var team2 = [];
var count = 0;
var team1Count = 0;
Object.entries(historyData).forEach(function (_a) {
    var playerKey = _a[0], stats = _a[1];
    count++;
    var playerName = playerKey.split('#')[2];
    var teamName = playerKey.split('#')[0];
    var playerNumber = playerKey.split('#')[1];
    var playerStats = {
        name: playerName,
        number: parseInt(playerNumber),
        team: teamName,
        lastGame: getGameStats(stats["last_game"]),
        last5Games: getGameStats(stats["last5_game"]),
        lastSeason: getGameStats(stats["last_season"]),
    };
    if (teamName === '辽宁本钢') {
        team1.push(playerStats);
        team1Count++;
    }
    else {
        team2.push(playerStats);
    }
});
console.log("Total players: ".concat(count));
console.log("Team 1 players: ".concat(team1Count));
var saveToFile = function (players, outputPath) {
    try {
        var filePath = path.join(__dirname, outputPath);
        var jsonData = JSON.stringify(players, null, 2);
        fs.writeFileSync(filePath, jsonData, 'utf8');
        console.log("Player stats have been successfully saved to ".concat(outputPath));
    }
    catch (error) {
        console.error('Error saving player stats:', error);
    }
};
saveToFile(team1, '1013_Liaoning.json');
saveToFile(team2, '1013_Zhejiang.json');
