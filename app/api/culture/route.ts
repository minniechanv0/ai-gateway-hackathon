import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { text } = await req.json();
  
  return NextResponse.json({
    badExample: "Don't say this",
    goodExample: "Say this instead",
    keyPoints: [
      "Be respectful",
      "Use inclusive language",
      "Consider context"
    ]
  });
}
