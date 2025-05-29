import { NextRequest, NextResponse } from 'next/server'

type RouteParams = {
  params: Promise<{
    width: string
    height: string
  }>
}

export async function GET(
  request: NextRequest,
  props: RouteParams
) {
  const params = await props.params
  const { width, height } = params
  const w = parseInt(width) || 200
  const h = parseInt(height) || 200
  
  // SVG placeholder with gradient background
  const svg = `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#e0e0e0;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#f5f5f5;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="url(#grad)" />
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="14" fill="#999" text-anchor="middle" dy=".3em">
        ${w} × ${h}
      </text>
    </svg>
  `
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000',
    },
  })
} 