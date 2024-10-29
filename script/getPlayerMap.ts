// import required modules
import * as fs from 'fs';
import * as path from 'path';

// Define the type for a player object
interface Player {
  name: string;
  team: string;
  position: string;
}

// Paths to the JSON files
const jsonFiles = ['../data/players_info/2024_player_2.json'];

// Function to read and parse JSON files
const readJsonFile = (filePath: string): any[] => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Main function to process the files and construct the hashmap
const constructPlayerMap = () => {
  const playerMap: Record<string, Player> = {};

  jsonFiles.forEach((file) => {
    const playersArray = readJsonFile(file);

    playersArray.forEach((player) => {
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
const saveMapToFile = (map: Record<string, Player>, outputPath: string) => {
  fs.writeFileSync(outputPath, JSON.stringify(map, null, 2), 'utf8');
};

// Construct the player map and save it to a file
const playerMap = constructPlayerMap();
saveMapToFile(playerMap, path.join(__dirname, 'playerMap.json'));

console.log('Player map has been successfully created and saved to playerMap.json');