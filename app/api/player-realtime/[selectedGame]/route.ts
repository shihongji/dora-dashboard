import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

interface PlayerStats {
  体能: [number, number];
  手感: [number, number];
  三分投射: [number, number];
  终结能力: [number, number];
  突破能力: [number, number];
  移动防守: [number, number];
  篮下防守: [number, number];
  战术执行: [number, number];
  组织串联: [number, number];
  篮板能力: [number, number];
}

interface RealTimeData {
  [playerId: string]: PlayerStats;
}

interface VideoData {
  video_time: number;
  rt: RealTimeData;
}
export async function GET(
  req: NextRequest,
  { params }: { params: { selectedGame: string } }
) {
  const { selectedGame } = params;
  const playerId = req.nextUrl.searchParams.get("playerId");
  const vidTime = req.nextUrl.searchParams.get("vidTime");
  if (!vidTime) {
    return NextResponse.json(
      { error: "vidTime parameter is required" },
      { status: 400 }
    );
  }

let fileName: string;
fileName = `${selectedGame}_rt.json`;

  // Read and parse the player data from the JSON file
  const playerData = await fs.readFile(
    path.join(process.cwd(), "data", fileName),
    "utf-8"
  );
  const parsedData: VideoData[] = JSON.parse(playerData);

  // Find the entry with the specified video_time
  const filteredEntry = parsedData.find(
    (entry) => entry.video_time === Number(vidTime)
  );

  // If entry exists, filter by playerId if provided
  if (filteredEntry) {
    const result = playerId
      ? {
          video_time: filteredEntry.video_time,
          rt: { [playerId]: filteredEntry.rt[playerId] },
        }
      : filteredEntry;

    // Return an error if playerId is not found within rt
    if (playerId && !filteredEntry.rt[playerId]) {
      return NextResponse.json(
        { error: "Player not found for specified playerId" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  }

  // Return an error if no data matches the vidTime
  return NextResponse.json(
    { error: "No data found for the specified vidTime" },
    { status: 404 }
  );
}
