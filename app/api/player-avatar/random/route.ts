import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  const avatarsDirectory = path.join(process.cwd(), 'public', 'images', 'players');

  try {
    // Read all files in the avatars directory
    const files = await fs.readdir(avatarsDirectory);

    // Filter files that start with a number and have a .jpg extension
    const jpgFiles = files.filter(file => /^\d.*\.jpg$/i.test(file));

    if (jpgFiles.length === 0) {
      return NextResponse.json({ error: 'No player images found' }, { status: 404 });
    }

    // Shuffle the array and pick 10 random files
    const shuffledFiles = jpgFiles.sort(() => 0.5 - Math.random());
    const selectedFiles = shuffledFiles.slice(0, 10);

    // Construct URLs for the selected files
    const imageUrls = selectedFiles.map(file => `/images/players/${file}`);

    return NextResponse.json({ imageUrls });
  } catch (error) {
    console.error('Error reading player images:', error);
    return NextResponse.json({ error: 'Failed to load player images' }, { status: 500 });
  }
}