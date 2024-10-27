import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(
  req: NextRequest,
  { params }: { params: { playerId: string } }
) {
  const { playerId } = params;
  const avatarsDirectory = path.join(process.cwd(), 'public', 'images', 'players');

  try {
    // Construct the path to the player's avatar
    const filePath = path.join(avatarsDirectory, `${playerId}.jpg`);

    // Check if the file exists
    const file = await fs.readFile(filePath);

    // Return the image with the appropriate headers
    return new NextResponse(file, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Player avatar not found' }, { status: 404 });
  }
}