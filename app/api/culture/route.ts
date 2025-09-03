import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const googleKey = process.env.GOOGLE_API_KEY;
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${googleKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Analyze culture. Return JSON only: {"badExample":"what not to say","goodExample":"better way","keyPoints":["point1","point2","point3"]}
            
            Text: ${text}`
          }]
        }]
      })
    });
    
    const data = await response.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const clean = aiText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    try {
      return NextResponse.json(JSON.parse(clean));
    } catch {
      return NextResponse.json({
        badExample: "Avoid this",
        goodExample: "Say this instead",
        keyPoints: ["Be respectful", "Be inclusive", "Be clear"]
      });
    }
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
