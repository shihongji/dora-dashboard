import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { GameInfo } from "@/types";

export async function GET(
  req: NextRequest,
  { params }: { params: { selectedGame: string } }
) {
  const { selectedGame } = params;
  console.log(selectedGame);
  const vidTime = req.nextUrl.searchParams.get("vidTime");
  const lookupTime = Number(vidTime);
  if (!vidTime) {
    return NextResponse.json(
      { error: "vidTime parameter is required" },
      { status: 400 }
    );
  }

  const fileName = "gameInfo.json";

  // Read and parse the player data from the JSON file
  const infoData = await fs.readFile(
    path.join(process.cwd(), "data", fileName),
    "utf-8"
  );
  const parsedData: GameInfo[] = JSON.parse(infoData);
  const targetInfos = parsedData.filter(
    (info) => info.game_time <= lookupTime + 2160
  );

  return NextResponse.json(targetInfos);

  // Return an error if no data matches the vidTime
}
