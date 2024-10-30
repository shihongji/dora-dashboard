import { NextRequest, NextResponse } from 'next/server';
import liaoningData from '../../../../data/1013_Liaoning_updated.json';
import tianjinData from '../../../../data/0406_Tianjin_updated.json';
import zhejiangData from '../../../../data/1013_Zhejiang_updated.json';
import guangdongData from '../../../../data/0406_Guangdong_updated.json';

interface Player {
  id: string;
  name: string;
  team: string;
  number: string | number;
  [key: string]: object | string | number;
}

// Explicitly assert the type for each JSON import
const liaoningPlayers = liaoningData as Player[];
const tianjinPlayers = tianjinData as Player[];
const zhejiangPlayers = zhejiangData as Player[];
const guangdongPlayers = guangdongData as Player[];

export async function GET(
  req: NextRequest,
  { params }: { params: { selectedGame: string } }
) {
  const { selectedGame } = params;
  const home = req.nextUrl.searchParams.get('home') === 'true';
  const period = req.nextUrl.searchParams.get('period');
  const playerId = req.nextUrl.searchParams.get('playerId');

  // Select players based on selectedGame and home status
  const players = home
    ? selectedGame === '1013' ? liaoningPlayers : tianjinPlayers
    : selectedGame === '1013' ? zhejiangPlayers : guangdongPlayers;

  // Filter and map player data
  const filteredPlayers = players.filter((player) => player.id === playerId);
  const statsData = filteredPlayers.map((player) => ({
    ID: player.id,
    name: player.name,
    team: player.team,
    number: String(player.number),
    stats: period ? player[period] : null,
  }));

  try {
    return NextResponse.json({ players: statsData });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Player data not found' }, { status: 404 });
  }
}