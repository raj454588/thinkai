"use server";

import { thinkAiAgent } from "@/ai/flows/think-ai-agent";
import { z } from "zod";

const getAiResponseSchema = z.object({
  message: z.string().min(1),
});

export async function getAiResponse(input: { message: string }) {
  try {
    const validatedInput = getAiResponseSchema.parse(input);
    const result = await thinkAiAgent(validatedInput);
    return { success: true, response: result.response, imageUrl: result.imageUrl };
  } catch (error) {
    console.error("Error getting AI response:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid input." };
    }
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
