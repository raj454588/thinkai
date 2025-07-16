'use server';

/**
 * @fileOverview A conversational AI agent named "Think AI" that can answer general questions,
 * solve math problems, generate code snippets, and create images.
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
  imageUrl: z.string().optional().describe('The URL of a generated image, if requested.'),
});
export type ThinkAiAgentOutput = z.infer<typeof ThinkAiAgentOutputSchema>;

export async function thinkAiAgent(input: ThinkAiAgentInput): Promise<ThinkAiAgentOutput> {
  return thinkAiAgentFlow(input);
}

const generateImageTool = ai.defineTool(
  {
    name: 'generateImage',
    description: 'Use this tool to generate an image when the user asks for a picture, drawing, or image of something.',
    inputSchema: z.object({
      prompt: z.string().describe('A detailed text description of the image to generate.'),
    }),
    outputSchema: z.object({
      imageUrl: z.string(),
    }),
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: input.prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    return { imageUrl: media.url };
  }
);


const prompt = ai.definePrompt({
  name: 'thinkAiAgentPrompt',
  input: {schema: ThinkAiAgentInputSchema},
  output: {schema: ThinkAiAgentOutputSchema},
  tools: [generateImageTool],
  prompt: `You are Think AI, a helpful AI assistant. Your role is to provide information,
      answer questions, solve math problems, generate code snippets, and create images when requested.

      When asked to generate an image, drawing, or picture, you MUST use the generateImage tool.
      When you use the tool, also provide a short, friendly text response confirming the action, for example: "Sure, here's an image of..."

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
    
    // Check if a tool was used and extract the image URL
    if (output.toolRequest) {
       for (const part of output.toolRequest.tool.parts) {
         if (part.toolResponse && part.toolResponse.name === 'generateImage') {
          const toolOutput = part.toolResponse.output as { imageUrl: string };
          // Find the text part of the response to accompany the image
          const textResponse = output.text || "Here is the image you requested.";
          return { response: textResponse, imageUrl: toolOutput.imageUrl };
        }
       }
    }
    
    return { response: output.text! };
  }
);
