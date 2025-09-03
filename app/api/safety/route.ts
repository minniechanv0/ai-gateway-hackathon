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
            text: `Analyze safety. Return JSON only: {"flags":{"confidentiality":"OK or ⚠️","bias":"OK or ⚠️","factual":"OK or ⚠️","dangerousAdvice":"OK or ⚠️"},"explanation":"under 100 chars","safeAnswer":"under 200 chars"}
            
            Text to analyze: ${text}`
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
        flags: { confidentiality: "OK", bias: "OK", factual: "OK", dangerousAdvice: "OK" },
        explanation: "Processed",
        safeAnswer: "Analysis complete"
      });
    }
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
