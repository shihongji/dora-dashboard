import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { PlayerHistory } from "@types";

export async function GET(
  req: NextRequest,
  { params }: { params: { selectedGame: string } }
) {
  const { selectedGame } = params;
  const home = req.nextUrl.searchParams.get("home") === "true";
  const period = req.nextUrl.searchParams.get("period") as
    | "lastGame"
    | "last5Games"
    | "lastSeason";
  const playerId = req.nextUrl.searchParams.get("playerId");
  let fileName: string;
  switch (selectedGame) {
    case "1013":
      fileName = home ? "1013_Liaoning_updated.json" : "1013_Zhejiang_updated.json";
      break;
    case "0406":
      fileName = home ? "0406_Tianjin_updated.json" : "0406_Guangdong_updated.json";
      break;
    default:
      throw new Error("Invalid game selection");
  }
  // Read the player data from the JSON file
  const playerData = await fs.readFile(
    path.join(process.cwd(), "data", fileName),
    "utf-8"
  );
  const players = JSON.parse(playerData);
  const filteredPlayers = players.filter(
    (player: PlayerHistory) => player.id === playerId
  );
  const statsData = filteredPlayers.map((player: PlayerHistory) => ({
    id: player.id,
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
    return NextResponse.json(
      { error: "Player avatar not found" },
      { status: 404 }
    );
  }
}
