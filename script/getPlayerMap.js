"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import required modules
var fs = require("fs");
var path = require("path");
// Paths to the JSON files
var jsonFiles = ['../data/players_info/2024_player_2.json'];
// Function to read and parse JSON files
var readJsonFile = function (filePath) {
    var data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};
// Main function to process the files and construct the hashmap
var constructPlayerMap = function () {
    var playerMap = {};
    jsonFiles.forEach(function (file) {
        var playersArray = readJsonFile(file);
        playersArray.forEach(function (player) {
            playerMap[player.ID] = {
                name: player.球员,
                team: player.效力球队,
                position: player.位置,
            };
        });
    });
    return playerMap;
};
// Save the hashmap to a JSON file
var saveMapToFile = function (map, outputPath) {
    fs.writeFileSync(outputPath, JSON.stringify(map, null, 2), 'utf8');
};
// Construct the player map and save it to a file
var playerMap = constructPlayerMap();
saveMapToFile(playerMap, path.join(__dirname, 'playerMap.json'));
console.log('Player map has been successfully created and saved to playerMap.json');
