import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const gatewayKey = process.env.AI_GATEWAY_API_KEY;
    
    // Vercel AI SDK経由でGeminiを呼ぶ
    const response = await fetch('https://api.vercel.ai/v1/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${gatewayKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'google/gemini-1.5-flash',
        messages: [{
          role: 'user',
          content: `Analyze culture. Return JSON only: {"badExample":"what not to say","goodExample":"better way","keyPoints":["point1","point2","point3"]}
          
          Text: ${text}`
        }],
        temperature: 0.3
      })
    });
    
    if (!response.ok) {
      // フォールバック：Gemini直接
      const googleKey = process.env.GOOGLE_API_KEY;
      const fallbackResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${googleKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Analyze culture. Return JSON only: {"badExample":"what not to say","goodExample":"better way","keyPoints":["point1","point2","point3"]}. Text: ${text}`
            }]
          }]
        })
      });
      const data = await fallbackResponse.json();
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
    }
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
