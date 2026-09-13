import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeneratedItem } from './types';

export async function generateBatchContent(apiKey: string, theme: string): Promise<GeneratedItem[]> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-3.5-flash-lite',
    generationConfig: { responseMimeType: "application/json" }
  });

  const prompt = `Generate exactly 20 lofi ambient quotes and metadata. 
Niche / Topic / Music Genre inspiration: ${theme}.
Each item should conform strictly to the following JSON array structure:
[
  {
    "id": "generate_unique_string_id",
    "quote": "Short poetic lofi quote",
    "subtext": "Slightly longer poetic subtext",
    "theme": "mist_rain" | "analog_grain" | "starfield_drift" | "aurora_wave",
    "colors": {
      "primary": "#hex",
      "secondary": "#hex",
      "accent": "#hex",
      "textGlow": "#hex"
    },
    "cameraMovement": "zoom_in" | "pan_up" | "drift_right" | "static",
    "audioMood": "calm, ambient, etc.",
    "caption": "Instagram/TikTok caption",
    "hashtags": ["#lofi", "#ambient"]
  }
]
`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    let jsonString = responseText;
    
    // Handle potential markdown code block artifacts
    if (jsonString.startsWith('```')) {
      jsonString = jsonString.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '').trim();
    }
    
    const items: GeneratedItem[] = JSON.parse(jsonString);
    return items;
  } catch (error) {
    console.error('Error generating batch content:', error);
    throw error;
  }
}
