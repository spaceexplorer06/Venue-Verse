'use server';

/**
 * @fileOverview Generates creative event names based on a description.
 *
 * - generateEventName - A function that generates an event name.
 * - GenerateEventNameInput - The input type for the generateEventName function.
 * - GenerateEventNameOutput - The return type for the generateEventName function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEventNameInputSchema = z.object({
  description: z.string().describe('The description of the event.'),
});

export type GenerateEventNameInput = z.infer<typeof GenerateEventNameInputSchema>;

const GenerateEventNameOutputSchema = z.object({
  eventName: z.string().describe('The generated name for the event.'),
});

export type GenerateEventNameOutput = z.infer<typeof GenerateEventNameOutputSchema>;

export async function generateEventName(input: GenerateEventNameInput): Promise<GenerateEventNameOutput> {
  return generateEventNameFlow(input);
}

const generateEventNamePrompt = ai.definePrompt({
  name: 'generateEventNamePrompt',
  input: {schema: GenerateEventNameInputSchema},
  output: {schema: GenerateEventNameOutputSchema},
  prompt: `You are an event naming expert. Generate a creative and catchy name for an event based on the following description: {{{description}}}`,
});

const generateEventNameFlow = ai.defineFlow(
  {
    name: 'generateEventNameFlow',
    inputSchema: GenerateEventNameInputSchema,
    outputSchema: GenerateEventNameOutputSchema,
  },
  async input => {
    const {output} = await generateEventNamePrompt(input);
    return output!;
  }
);
