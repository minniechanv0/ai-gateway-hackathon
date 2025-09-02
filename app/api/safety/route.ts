import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { text } = await req.json();
  
  return NextResponse.json({
    flags: {
      confidentiality: "OK",
      bias: "OK",
      factual: "⚠️",
      dangerousAdvice: "OK"
    },
    explanation: "Test response",
    safeAnswer: "Safe test answer"
  });
}
