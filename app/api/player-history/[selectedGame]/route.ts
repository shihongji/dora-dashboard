import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';


interface PlayerStats {
    playTime: string;
    points: string;
    offensiveRebounds: string;
    defensiveRebounds: string;
    totalRebounds: string;
    assists: string;
    steals: string;
    blocks: string;
    fouls: string;
    turnovers: string;
    fieldGoalsMade: string;
    fieldGoalsAttempted: string;
    fieldGoalPercentage: string;
    threePointersMade: string;
    threePointersAttempted: string;
    threePointPercentage: string;
    freeThrowsMade: string;
    freeThrowsAttempted: string;
    freeThrowPercentage: string;
  }
  
  interface Player {
    id: string;
    name: string;
    team: string;
    number: string;
    lastGame: PlayerStats;
    last5Games: PlayerStats;
    lastSeason: PlayerStats;
  }
export async function GET(
  req: NextRequest,
  { params }: { params: { selectedGame: string } }
) {
  const { selectedGame } = params;
  const home = req.nextUrl.searchParams.get('home') === 'true';
  const period = req.nextUrl.searchParams.get('period') as 'lastGame' | 'last5Games' | 'lastSeason';;
  const playerId = req.nextUrl.searchParams.get('playerId');
  let fileName: string;
  if (home) {
    fileName = selectedGame === '1013' ? '1013_Liaoning_updated.json' : '0406_Tianjin_updated.json';
  } else {
    fileName = selectedGame === '1013' ? '1013_Zhejiang_updated.json' : '0406_Guangdong_updated.json';
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
    stats: player[period],
  }));

  try {

    // Return the image with the appropriate headers
    return NextResponse.json({ players: statsData });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Player avatar not found' }, { status: 404 });
  }
}