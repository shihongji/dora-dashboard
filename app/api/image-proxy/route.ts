// app/api/image-proxy/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return NextResponse.json({ error: 'Missing image URL' }, { status: 400 });
  }

  try {
    // Validate the image URL to ensure it points to the allowed domain
    const allowedHostnames = ['image.cbaleague.com'];
    const urlObj = new URL(imageUrl);

    if (!allowedHostnames.includes(urlObj.hostname)) {
      return NextResponse.json({ error: 'Invalid image host' }, { status: 400 });
    }

    // Fetch the image from the remote server
    const response = await fetch(imageUrl);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
    }

    // Get the image data
    const contentType = response.headers.get('Content-Type') || 'image/jpeg';
    const imageBuffer = await response.arrayBuffer();

    // Return the image data with appropriate headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Set cache headers as appropriate
        'Cache-Control': 'public, max-age=86400', // Cache for 1 day
      },
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json({ error: 'Error fetching image' }, { status: 500 });
  }
}