'use server';

/**
 * @fileOverview A conversational AI agent named "Think AI" that can answer general questions,
 * solve math problems, and generate code snippets.
 *
 * - thinkAiAgent - The main function to interact with the AI agent.
 * - ThinkAiAgentInput - The input type for the thinkAiAgent function.
 * - ThinkAiAgentOutput - The return type for the thinkAiAgent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ThinkAiAgentInputSchema = z.object({
  message: z.string().describe('The user message to the AI agent.'),
});
export type ThinkAiAgentInput = z.infer<typeof ThinkAiAgentInputSchema>;

const ThinkAiAgentOutputSchema = z.object({
  response: z.string().describe('The AI agent text response to the user message.'),
});
export type ThinkAiAgentOutput = z.infer<typeof ThinkAiAgentOutputSchema>;

export async function thinkAiAgent(input: ThinkAiAgentInput): Promise<ThinkAiAgentOutput> {
  return thinkAiAgentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'thinkAiAgentPrompt',
  input: {schema: ThinkAiAgentInputSchema},
  output: {schema: ThinkAiAgentOutputSchema},
  prompt: `You are Think AI, a helpful AI assistant. Your role is to provide information,
      answer questions, solve math problems, and generate code snippets.

      When generating code snippets, always wrap the code in markdown code blocks with the
      appropriate language identifier (e.g., \`\`\`python for Python code).
      Ensure to add a copy button so that the user can easily copy the code.

      If a user asks for code, you MUST return the code in a fenced code block. You MUST specify
      the language of the code.

      User message: {{{message}}}`,
});

const thinkAiAgentFlow = ai.defineFlow(
  {
    name: 'thinkAiAgentFlow',
    inputSchema: ThinkAiAgentInputSchema,
    outputSchema: ThinkAiAgentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      return { response: "I'm sorry, I couldn't generate a response." };
    }
    return { response: output.response };
  }
);
