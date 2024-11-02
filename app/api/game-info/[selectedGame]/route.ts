import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import { GameInfo } from "@/types";

export async function GET(
  req: NextRequest,
  { params }: { params: { selectedGame: string } }
) {
  const { selectedGame } = params;
  const vidTime = req.nextUrl.searchParams.get("vidTime");
  const lookupTime = Number(vidTime);
  if (!vidTime) {
    return NextResponse.json(
      { error: "vidTime parameter is required" },
      { status: 400 }
    );
  }

  const fileName = selectedGame === "1013" ? "1013_events.json" : "0406_events.json";

  // Read and parse the player data from the JSON file
  const infoData = await fs.readFile(
    path.join(process.cwd(), "data", fileName),
    "utf-8"
  );
  const parsedData: GameInfo[] = JSON.parse(infoData);
  const targetInfos = parsedData.filter(
    (info) => info.video_time <= lookupTime
  );

  return NextResponse.json(targetInfos);

  // Return an error if no data matches the vidTime
}
