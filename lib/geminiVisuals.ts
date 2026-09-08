import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeneratedItem } from './types';

export async function generateCanvasCode(apiKey: string, item: GeneratedItem): Promise<string> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash-lite' });

  const prompt = `
You are an expert generative artist using the HTML5 Canvas API.
Write a pure JavaScript function body that draws an ambient, abstract background matching this quote: "${item.quote}".
The background should fit a vertical video (9:16).
Do NOT include text drawing. ONLY background visuals (particles, gradients, waves, shapes, etc).
The code must be the interior body of a function with these available parameters:
- \`ctx\`: CanvasRenderingContext2D
- \`width\`: number (always 1080)
- \`height\`: number (always 1920)
- \`timeMs\`: number (current time in milliseconds, for animation)
- \`colors\`: object { primary: string, secondary: string, accent: string, textGlow: string }

Rules:
1. Do not use \`window\` or \`document\`.
2. Do not use \`requestAnimationFrame\` (the loop is handled externally).
3. Use \`timeMs\` to drive smooth animation (e.g. \`Math.sin(timeMs / 1000)\`).
4. Return ONLY valid javascript code. No markdown formatting, no \`\`\`javascript wrappers, just the raw code.
5. If using persistent state (like particles), you can attach them to \`ctx.particles\` so they persist across frames. E.g.: \`if (!ctx.particles) { ctx.particles = ... }\`
6. CRITICAL: ONLY use the exact color properties defined above (\`colors.primary\`, \`colors.secondary\`, \`colors.accent\`, \`colors.textGlow\`). DO NOT invent or use any other properties like \`baseAlpha\`, \`highlight\`, or \`background\`.

Example Output:
ctx.fillStyle = colors.primary;
ctx.fillRect(0, 0, width, height);
const wave = Math.sin(timeMs / 1000) * 50;
ctx.fillStyle = colors.secondary;
ctx.beginPath();
ctx.arc(width/2, height/2 + wave, 100, 0, Math.PI * 2);
ctx.fill();
`;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    // Strip markdown if present
    if (text.startsWith('\`\`\`')) {
      text = text.replace(/^```(javascript|js)?\n?/, '').replace(/\n?```$/, '').trim();
    }
    return text;
  } catch (error) {
    console.error('Error generating canvas code:', error);
    throw error;
  }
}
