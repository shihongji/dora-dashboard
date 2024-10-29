import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

interface Player {
    id: string;
    name: string;
    team: string;
    number: string;
    [key: string]: object | string;
    };
export async function GET(
  req: NextRequest,
  { params }: { params: { selectedGame: string } }
) {
  const { selectedGame } = params;
  const home = req.nextUrl.searchParams.get('home') === 'true';
  const period = req.nextUrl.searchParams.get('period');
  const playerId = req.nextUrl.searchParams.get('playerId');
  let fileName: string;
  if (home) {
    if (selectedGame === '1013') {
      // liaoning
      fileName = '1013_Liaoning_updated.json'
    } else {
      // tianjin
      fileName = '0406_Tianjin_updated.json'
    }
  } else {
    if (selectedGame === '1013') {
      // zhejiang
      fileName = '1013_Zhejiang_updated.json'
    } else {
      // guangdong
      fileName = '0406_Guangdong_updated.json'
    }
  }
  // Read the player data from the JSON file
  const playerData = await fs.readFile(path.join(process.cwd(), 'data', fileName), 'utf-8');
  const players = JSON.parse(playerData);
  const filteredPlayers = players.filter((player: Player) => player.id === playerId);
  const statsData = filteredPlayers.map((player: Player) => ({
    ID: player.id,
    name: player.name,
    team: player.team,
    number: player.number,
    stats: period ? player[period] : null,
  }));

  try {

    // Return the image with the appropriate headers
    return NextResponse.json({ players: statsData });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Player avatar not found' }, { status: 404 });
  }
}