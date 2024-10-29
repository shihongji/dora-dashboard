import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import playerMapData from '@data/players_info/playerMap.json';
interface Player {
  name: string;
  team: string;
  position: string;
}

export async function GET() {
  const avatarsDirectory = path.join(process.cwd(), 'public', 'images', 'players');
  const playerMap: Record<string, Player> = playerMapData;

  try {
    // Read all files in the avatars directory
    const files = await fs.readdir(avatarsDirectory);

// Filter files that start with a number, have a .jpg extension, and exist in playerMap
const jpgFiles = files.filter(file => {
  const match = file.match(/^(\d+).*\.jpg$/i);
  if (!match) return false;

  const playerId = match[1];
  return playerMap.hasOwnProperty(playerId); // Check if playerId exists in playerMap
});

    if (jpgFiles.length === 0) {
      return NextResponse.json({ error: 'No player images found' }, { status: 404 });
    }

    // Shuffle the array and pick 10 random files
    const shuffledFiles = jpgFiles.sort(() => 0.5 - Math.random());
    const selectedFiles = shuffledFiles.slice(0, 10);

    // Construct player objects by extracting ID from filenames and looking up in playerMap
    const playerObjects = selectedFiles
      .map(file => {
        const match = file.match(/^(\d+).*\.jpg$/);
        if (!match) return null;

        const playerId = match[1];
        const playerData: Player = playerMap[playerId];
        return playerData ? { ID: playerId, ...playerData } : null;
      })
      .filter(player => player !== null);

      return NextResponse.json({ players: playerObjects });
  } catch (error) {
    console.error('Error reading player images:', error);
    return NextResponse.json({ error: 'Failed to load player images' }, { status: 500 });
  }
}