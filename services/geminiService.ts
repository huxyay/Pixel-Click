import { GoogleGenAI } from "@google/genai";
import { CursorType } from "../types";
import { removeBackground } from "../utils/imageHelper";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

interface GenerationResult {
  type: CursorType;
  base64: string;
}

// Safety settings to prevent over-filtering of cursor shapes (which can sometimes be misinterpreted)
const SAFETY_SETTINGS = [
  { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
  { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
  { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
  { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateCursorSet = async (userPrompt: string): Promise<GenerationResult[]> => {
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    throw new Error("API Key is missing or invalid. Please add your API_KEY in index.html or environment.");
  }

  // Simplified prompt structure to improve instruction following
  const basePrompt = `
    Generate a 128x128 pixel art cursor icon.
    Style: Cute, cozy, 16-bit retro style.
    Theme: "${userPrompt}".
    Background: Solid MAGENTA (#FF00FF) color.
    Constraint: NO anti-aliasing. NO drop shadows. Sharp pixel edges.
    Subject: Large and distinct.
  `;

  const prompts = [
    {
      type: CursorType.NORMAL,
      text: `${basePrompt} 
        Type: Normal Pointer.
        Visual: A pixelated ARROW pointing to the TOP-LEFT corner.
        Decoration: Add a small "${userPrompt}" themed item next to the arrow.
        Color: Match the theme.
      `
    },
    {
      type: CursorType.POINTING,
      text: `${basePrompt}
        Type: Link Select Pointer.
        Visual: A pixelated HAND pointing to the TOP-LEFT corner. The index finger must be extended pointing up-left.
        Decoration: Add a small "${userPrompt}" themed item on the back of the hand.
      `
    },
    {
      type: CursorType.LOADING,
      text: `${basePrompt}
        Type: Loading/Busy Indicator.
        Visual: A central object representing "${userPrompt}" that looks like it is waiting (e.g., spinning, sleeping, hourglass).
        No arrow. Centered subject.
      `
    },
    {
      type: CursorType.CLICKING,
      text: `${basePrompt}
        Type: Clicking State.
        Visual: The "${userPrompt}" subject in an active/pressed state (e.g. squished, glowing, sparks).
        Centered.
      `
    },
    {
      type: CursorType.TYPING,
      text: `${basePrompt}
        Type: Text Select (I-Beam).
        Visual: A tall, thin vertical bar or tool (like a sword, wand, or stick) matching the theme "${userPrompt}".
        Must be vertical and centered.
      `
    }
  ];

  const results: GenerationResult[] = [];

  // Execute sequentially
  for (const p of prompts) {
    try {
      // Small delay to be gentle on rate limits
      if (results.length > 0) {
        await delay(1000);
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: p.text }]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          },
          // @ts-ignore - Explicitly setting safety settings to avoid refusals for benign shapes
          safetySettings: SAFETY_SETTINGS
        }
      });

      let base64Data = '';
      
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
            base64Data = part.inlineData.data;
            break;
          }
        }
      }

      if (!base64Data) {
        console.warn(`Generation failed for ${p.type}. No image data returned.`);
        continue; // Skip this one but keep others
      }

      const transparentBase64 = await removeBackground(base64Data);

      results.push({
        type: p.type,
        base64: transparentBase64
      });

    } catch (error) {
      console.error(`Error generating ${p.type}:`, error);
      // We continue to the next one instead of crashing the whole set
    }
  }

  if (results.length === 0) {
    throw new Error("Failed to generate any cursors. Please try a different prompt.");
  }

  return results;
};