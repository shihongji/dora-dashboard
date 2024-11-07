import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

interface Player {
  id: string;
  name: string;
  team: string;
  number: string;
  imgUrl: string;
}
export async function GET(
  req: NextRequest,
  { params }: { params: { selectedGame: string } }
) {
  const { selectedGame } = params;
  const home = req.nextUrl.searchParams.get('home') === 'true';
  let fileName: string;

  switch (selectedGame) {
    case '1013':
      fileName = home ? '1013_Liaoning_updated.json' : '1013_Zhejiang_updated.json';
      break;
    default:
      fileName = home ? '0406_Tianjin_updated.json' : '0406_Guangdong_updated.json';
      break;
  }
  // Read the player data from the JSON file
  const playerData = await fs.readFile(path.join(process.cwd(), 'data', fileName), 'utf-8');
  const players = JSON.parse(playerData);
  const originalImageUrl = `https://image.cbaleague.com/playerheader/${selectedGame === '1013' ? 2024 : 2023}/`;
  const avatars = players.map((player: Player) => ({
    id: player.id,
    name: player.name,
    team: player.team,
    number: player.number,
    imgUrl: `/api/image-proxy?url=${originalImageUrl}${player.id}.jpg`,
  }));

  try {

    // Return the image with the appropriate headers
    return NextResponse.json({ players: avatars });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Player avatar not found' }, { status: 404 });
  }
}