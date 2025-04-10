import { GoogleGenAI } from "@google/genai";
import { GEMINI_KEY } from './constants'

export const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });