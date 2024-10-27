import * as fs from 'fs/promises';
import * as path from 'path';

// Paths
const imagesDir = path.join(__dirname, '../public/images/players');
const jsonFilePath = path.join(__dirname, '../data/players_info/2022_player_2.json');

interface Player {
  ID: string;
  球员: string;
}

// Main function to rename image files
async function renameImages() {
  try {
    // Read and parse the JSON file
    const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
    const players: Player[] = JSON.parse(jsonData);

    // Create a map of player names to IDs
    const playerMap = new Map<string, string>();
    players.forEach((player) => {
      playerMap.set(player.球员, player.ID);
    });

    // Get all files in the images directory
    const files = await fs.readdir(imagesDir);

    // Loop through each file and rename it based on the player map
    for (const file of files) {
      const filePath = path.join(imagesDir, file);
      const playerName = file.replace('.jpg', '');
      // Check, if the filePath starts with number, then skip
        if (!isNaN(parseInt(playerName[0]))) {
            continue;
        }

      // Check if the player name exists in the map
      const playerId = playerMap.get(playerName);
      if (playerId) {
        const newFilePath = path.join(imagesDir, `${playerId}.jpg`);
        await fs.rename(filePath, newFilePath);
        console.log(`Renamed: ${file} -> ${playerId}.jpg`);
      } else {
        console.warn(`No ID found for player: ${playerName}, skipping.`);
      }
    }

    console.log('Image renaming complete.');
  } catch (error) {
    console.error('Error renaming images:', error);
  }
}

// Run the script
renameImages();