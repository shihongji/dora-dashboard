"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This helper is used to map the Id, name, image of players
var fs = require("fs");
var path = require("path");
// Function to read and parse JSON files
var readJsonFile = function (filePath) {
    var data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
};
var imagesDir = path.join(__dirname, '../public/images/players');
var palyerMap = readJsonFile(path.join(__dirname, '../data/playerMap.json'));
var mapSize = Object.keys(palyerMap).length;
console.log("The player map contains ".concat(mapSize, " entries."));
var images = fs.readdirSync(imagesDir);
var digitOnlyFilenames = images.filter(function (image) { return /^\d+$/.test(path.parse(image).name); });
var digitOnlyCount = digitOnlyFilenames.length;
console.log("There are ".concat(digitOnlyCount, " images with filenames containing only digits."));
var imageCount = images.length;
console.log("There are ".concat(imageCount, " images in the directory.")); // 242
var liaoningPlayers = readJsonFile(path.join(__dirname, '../data/1013_Zhejiang.json'));
console.log("There are ".concat(liaoningPlayers.length, " players in the Liaoning team."));
var count = 0;
liaoningPlayers.forEach(function (player) {
    var flag = false;
    var lookupName = player.name;
    Object.entries(palyerMap).forEach(function (_a) {
        var id = _a[0], data = _a[1];
        if (data.name === lookupName) {
            flag = true;
            player.id = id;
            if (digitOnlyFilenames.includes("".concat(id, ".jpg"))) {
                count++;
            }
            else {
                console.log("Image not found for player: ".concat(lookupName, ", ID: ").concat(id));
            }
        }
    });
    if (!flag) {
        console.log("Player not found in player map: ".concat(lookupName));
    }
});
// Write the updated Liaoning players back to the JSON file
var updatedFilePath = path.join(__dirname, '../data/1013_Zhejiang_updated.json');
fs.writeFileSync(updatedFilePath, JSON.stringify(liaoningPlayers, null, 2), 'utf8');
console.log("Updated Liaoning players have been written to ".concat(updatedFilePath));
