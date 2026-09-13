import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeneratedItem } from './types';

export async function generateBatchContent(apiKey: string, theme: string, songNames: string[] = []): Promise<GeneratedItem[]> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-3.5-flash-lite',
    generationConfig: { responseMimeType: "application/json" }
  });

  const songsList = songNames.length > 0 ? `\nAvailable Songs (incorporate their vibes into the subtext if appropriate):\n${songNames.join(', ')}` : '';

  const prompt = `Generate exactly 20 lofi ambient quotes and metadata. 
Niche / Topic / Music Genre inspiration: ${theme}.${songsList}
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

export async function generateSingleItem(apiKey: string, theme: string, cameraMovement: string, songNames: string[] = []): Promise<GeneratedItem> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-3.5-flash-lite',
    generationConfig: { responseMimeType: "application/json" }
  });

  const songsList = songNames.length > 0 ? `\nAvailable Songs (incorporate their vibes into the subtext if appropriate):\n${songNames.join(', ')}` : '';

  const prompt = `Generate exactly 1 lofi ambient quote and metadata. 
Niche / Topic / Music Genre / Visual Theme inspiration: ${theme}.${songsList}
Requested Camera Movement: ${cameraMovement}.
Each item should conform strictly to the following JSON array structure:
[
  {
    "id": "generate_unique_string_id",
    "quote": "Short poetic lofi quote",
    "subtext": "Slightly longer poetic subtext",
    "theme": "${theme}",
    "colors": {
      "primary": "#hex",
      "secondary": "#hex",
      "accent": "#hex",
      "textGlow": "#hex"
    },
    "cameraMovement": "${cameraMovement}",
    "audioMood": "calm, ambient, etc.",
    "caption": "Instagram/TikTok caption",
    "hashtags": ["#lofi", "#ambient"]
  }
]
`;

  try {
    const result = await model.generateContent(prompt);
    let jsonString = result.response.text();
    if (jsonString.startsWith('\`\`\`')) {
      jsonString = jsonString.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '').trim();
    }
    const items: GeneratedItem[] = JSON.parse(jsonString);
    return items[0];
  } catch (error) {
    console.error('Error generating single item:', error);
    throw error;
  }
}
