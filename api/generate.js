// Vercel Serverless Function: /api/generate
// Translates English communication intent into authentic, situation-appropriate Kannada,
// phonetic transliteration, meaning, cultural context, and plausible replies.

export default async function handler(req, res) {
  // Enforce POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { intent, situation, isAlternative } = req.body || {};

  // Input validation
  if (!intent || typeof intent !== 'string' || !intent.trim()) {
    return res.status(400).json({ error: 'Please provide a valid English intent description.' });
  }

  const trimmedIntent = intent.trim().slice(0, 300);

  // Read Gemini API Key from server environment
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return res.status(503).json({
      error: 'GEMINI_API_KEY is not configured on the server.',
      code: 'API_KEY_MISSING'
    });
  }

  const systemInstruction = `You are KannadaConnect, a real-world Kannada communication assistant.
Your goal is to help non-Kannada speakers communicate confidently in real-life situations in Karnataka (buses, autos, restaurants, markets, clinics, shops).

Given the user's intent in English and their situational context:
1. Provide a natural, spoken, context-appropriate Kannada sentence using correct Kannada script (Noto Sans Kannada compatible).
2. Provide a clear, phonetic English transliteration so an English speaker can pronounce it easily.
3. Provide a pronunciation guide showing syllables/cadence.
4. Provide the exact English meaning of the Kannada sentence.
5. Provide a short, practical cultural context tip (e.g. adding polite suffixes like '-ree' or '-kodi', tipping gestures, etc.).
6. Provide up to 3 plausible replies the local person might respond with in Kannada, with transliteration and English meaning.
7. Return strictly valid JSON adhering to the specified schema without any markdown formatting.`;

  const userPrompt = `User Intent: "${trimmedIntent}"
Situation Category: ${situation || 'general'}
${isAlternative ? 'Please provide a fresh alternative phrasing (slightly different tone or vocabulary).' : ''}`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: `${systemInstruction}\n\n${userPrompt}` }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.3,
      topP: 0.8,
      maxOutputTokens: 1024,
      responseMimeType: "application/json"
    }
  };

  // Model hierarchy: prioritize gemini-2.5-flash, fallback to gemini-1.5-flash
  const models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'];
  let lastError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        lastError = new Error(`Gemini API ${model} returned ${response.status}: ${errorText}`);
        continue; // Try next model if available
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        lastError = new Error(`Empty response from Gemini ${model}`);
        continue;
      }

      // Parse JSON from model output
      let parsed;
      try {
        // Strip markdown code fences if model returned them
        const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        parsed = JSON.parse(cleaned);
      } catch (parseErr) {
        lastError = new Error(`Failed to parse JSON response: ${parseErr.message}`);
        continue;
      }

      // Basic validation of fields
      if (!parsed.kannada || !parsed.transliteration) {
        lastError = new Error('Model output missing required kannada or transliteration fields.');
        continue;
      }

      return res.status(200).json({
        success: true,
        data: {
          kannada: parsed.kannada,
          transliteration: parsed.transliteration,
          pronunciationGuide: parsed.pronunciationGuide || '',
          english: parsed.english || trimmedIntent,
          originalIntent: trimmedIntent,
          contextNote: parsed.contextNote || '',
          situation: situation || 'general',
          verified: false, // Mark AI generated
          replies: Array.isArray(parsed.replies) ? parsed.replies : []
        }
      });
    } catch (err) {
      lastError = err;
    }
  }

  // If all models failed
  return res.status(502).json({
    error: lastError?.message || 'Failed to generate Kannada phrase with Gemini AI.',
    code: 'UPSTREAM_AI_ERROR'
  });
}
