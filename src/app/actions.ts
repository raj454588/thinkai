"use server";

import { thinkAiAgent } from "@/ai/flows/think-ai-agent";
import { generateOtp, verifyOtp } from "@/ai/flows/verification-flow";
import { z } from "zod";

const getAiResponseSchema = z.object({
  message: z.string().min(1),
});

export async function getAiResponse(input: { message: string }) {
  try {
    const validatedInput = getAiResponseSchema.parse(input);
    const result = await thinkAiAgent(validatedInput);
    return { success: true, response: result.response };
  } catch (error) {
    console.error("Error getting AI response:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "Invalid input." };
    }
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}

const generateOtpSchema = z.object({
  email: z.string().email(),
});

export async function handleGenerateOtp(email: string) {
    try {
        const validatedInput = generateOtpSchema.parse({ email });
        const result = await generateOtp(validatedInput);
        return { success: true, ...result };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, error: "Invalid email address." };
        }
        return { success: false, error: "Failed to generate OTP. Please try again." };
    }
}

const verifyOtpSchema = z.object({
    email: z.string().email(),
    otp: z.string().length(6),
});

export async function handleVerifyOtp(email: string, otp: string) {
    try {
        const validatedInput = verifyOtpSchema.parse({ email, otp });
        const result = await verifyOtp(validatedInput);
        if (result.isVerified) {
            return { success: true };
        } else {
            return { success: false, error: "Invalid OTP. Please try again." };
        }
    } catch (error) {
         if (error instanceof z.ZodError) {
            return { success: false, error: "Invalid input." };
        }
        return { success: false, error: "An unexpected error occurred." };
    }
}
