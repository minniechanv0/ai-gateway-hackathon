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
          content: `Analyze safety. Return JSON only: {"flags":{"confidentiality":"OK or ⚠️","bias":"OK or ⚠️","factual":"OK or ⚠️","dangerousAdvice":"OK or ⚠️"},"explanation":"under 100 chars","safeAnswer":"under 200 chars"}
          
          Text: ${text}`
        }],
        temperature: 0.2
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
              text: `Analyze safety. Return JSON only. Text: ${text}`
            }]
          }]
        })
      });
      const data = await fallbackResponse.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
      return NextResponse.json(JSON.parse(aiText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()));
    }
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
