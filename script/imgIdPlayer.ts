// This helper is used to map the Id, name, image of players
import * as fs from 'fs';
import * as path from 'path';
// Function to read and parse JSON files
const readJsonFile = (filePath: string): any[] => {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  };
const imagesDir = path.join(__dirname, '../public/images/players');
const palyerMap = readJsonFile(path.join(__dirname, '../data/playerMap.json'));
const mapSize = Object.keys(palyerMap).length;
console.log(`The player map contains ${mapSize} entries.`);
const images = fs.readdirSync(imagesDir);
const digitOnlyFilenames = images.filter(image => /^\d+$/.test(path.parse(image).name));
const digitOnlyCount = digitOnlyFilenames.length;
console.log(`There are ${digitOnlyCount} images with filenames containing only digits.`);
const imageCount = images.length;
console.log(`There are ${imageCount} images in the directory.`); // 242

const liaoningPlayers = readJsonFile(path.join(__dirname, '../data/1013_Zhejiang.json'));
console.log(`There are ${liaoningPlayers.length} players in the Liaoning team.`);

let count = 0;
liaoningPlayers.forEach(player => {
    let flag = false;
    const lookupName = player.name;
    Object.entries(palyerMap).forEach(([id, data]) => {
        if (data.name === lookupName) {
            flag = true;
            player.id = id;
            if (digitOnlyFilenames.includes(`${id}.jpg`)) {
                count++;
            } else {
                console.log(`Image not found for player: ${lookupName}, ID: ${id}`);
            }
        }
    });
    if (!flag) {
        console.log(`Player not found in player map: ${lookupName}`);
    }
});
// Write the updated Liaoning players back to the JSON file
const updatedFilePath = path.join(__dirname, '../data/1013_Zhejiang_updated.json');
fs.writeFileSync(updatedFilePath, JSON.stringify(liaoningPlayers, null, 2), 'utf8');
console.log(`Updated Liaoning players have been written to ${updatedFilePath}`);