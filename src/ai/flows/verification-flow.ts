
'use server';

/**
 * @fileOverview Manages user email verification using OTP.
 *
 * - generateOtp - Generates an OTP and (simulates) sending it to the user's email.
 * - verifyOtp - Verifies the OTP provided by the user.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import * as otpGenerator from 'otp-generator';

// In a real application, you would use a secure, persistent store like a database.
// For this example, we'll store OTPs in memory. This is NOT for production.
const otpStore: Record<string, { otp: string; expires: number }> = {};

const GenerateOtpInputSchema = z.object({
    email: z.string().email().describe("The user's email address to send the OTP to."),
});
export type GenerateOtpInput = z.infer<typeof GenerateOtpInputSchema>;

const GenerateOtpOutputSchema = z.object({
    message: z.string().describe('A confirmation message that the OTP was sent.'),
});
export type GenerateOtpOutput = z.infer<typeof GenerateOtpOutputSchema>;


export async function generateOtp(input: GenerateOtpInput): Promise<GenerateOtpOutput> {
    return generateOtpFlow(input);
}

const generateOtpFlow = ai.defineFlow(
    {
        name: 'generateOtpFlow',
        inputSchema: GenerateOtpInputSchema,
        outputSchema: GenerateOtpOutputSchema,
    },
    async ({ email }) => {
        const otp = otpGenerator.generate(6, { 
            upperCaseAlphabets: false, 
            specialChars: false,
            lowerCaseAlphabets: false,
        });

        const expires = Date.now() + 5 * 60 * 1000; // OTP is valid for 5 minutes
        otpStore[email] = { otp, expires };

        // In a real application, you would use an email service like SendGrid or Nodemailer.
        // For this example, we will just log it to the console to simulate sending.
        console.log(`[Email Simulation] OTP for ${email}: ${otp}`);

        return {
            message: `An OTP has been sent to ${email}.`,
        };
    }
);


const VerifyOtpInputSchema = z.object({
    email: z.string().email().describe("The user's email address."),
    otp: z.string().length(6).describe('The 6-digit OTP entered by the user.'),
});
export type VerifyOtpInput = z.infer<typeof VerifyOtpInputSchema>;


const VerifyOtpOutputSchema = z.object({
    isVerified: z.boolean().describe('Whether the OTP was correct and valid.'),
});
export type VerifyOtpOutput = z.infer<typeof VerifyOtpOutputSchema>;

export async function verifyOtp(input: VerifyOtpInput): Promise<VerifyOtpOutput> {
    return verifyOtpFlow(input);
}


const verifyOtpFlow = ai.defineFlow(
    {
        name: 'verifyOtpFlow',
        inputSchema: VerifyOtpInputSchema,
        outputSchema: VerifyOtpOutputSchema,
    },
    async ({ email, otp }) => {
        const stored = otpStore[email];

        if (!stored) {
            return { isVerified: false };
        }

        if (Date.now() > stored.expires) {
            delete otpStore[email]; // OTP has expired
            return { isVerified: false };
        }

        if (stored.otp === otp) {
            delete otpStore[email]; // OTP is used, remove it
            return { isVerified: true };
        }

        return { isVerified: false };
    }
);
