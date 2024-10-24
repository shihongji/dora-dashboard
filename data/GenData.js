"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var generateRandomId = function () {
    return Math.random().toString(36).substring(2);
};
// Define the structure of the score increment
var scoreIncrements = [1, 2, 3]; // Possible score increments
// Function to generate random GameInfo
var generateRandomGameInfo = function () {
    var totalGameTime = 48 * 60; // 48 minutes in seconds
    var quarterDuration = 12 * 60; // Each quarter is 12 minutes (720 seconds)
    var homeScore = 74;
    var awayScore = 59;
    var currentTime = 36 * 60; // Start of the game (in seconds)
    var gameInfoArray = [];
    while (currentTime <= totalGameTime) {
        // Determine the quarter based on the current time
        var quarter = Math.floor(currentTime / quarterDuration) + 1;
        // Randomly increment team scores (can be home, away, or both)
        var scored = Math.random();
        if (scored > 0.85) {
            homeScore += scoreIncrements[Math.floor(Math.random() * scoreIncrements.length)];
        }
        else if (scored < 0.15) {
            awayScore += scoreIncrements[Math.floor(Math.random() * scoreIncrements.length)];
        }
        // Calculate remaining time in the current quarter
        var timeLeftInQuarter = quarterDuration - (currentTime % quarterDuration);
        var minutesLeft = Math.floor(timeLeftInQuarter / 60);
        var secondsLeft = timeLeftInQuarter % 60;
        // Create a game info entry at this point in time
        gameInfoArray.push({
            id: generateRandomId(),
            game_id: generateRandomId(),
            home_team: {
                team_id: 'ln020',
                team_name: "辽宁本钢",
                score: homeScore,
            },
            away_team: {
                team_id: 'tj002',
                team_name: "天津先行者",
                score: awayScore,
            },
            // only reserve the date part
            game_date: new Date().toISOString().split('T')[0],
            venue: "辽宁体育馆",
            status: "In Progress",
            game_time: currentTime,
            quarter: quarter,
            time_left_in_quarter: "".concat(minutesLeft, ":").concat(secondsLeft.toString().padStart(2, '0')),
            possession: Math.random() > 0.5 ? "home" : "away",
        });
        // Increment game time by random intervals (simulating game flow)
        currentTime += Math.floor(Math.random() * 10); // Increment time by 0 - 10 seconds
    }
    // Return the final state of the game at the end of the loop
    return gameInfoArray; // Final game state
};
// Example of using the function
var randomGameInfo = generateRandomGameInfo();
console.log(randomGameInfo.length);
// write to a file
fs.writeFileSync('data/gameInfo.json', JSON.stringify(randomGameInfo, null, 2));
