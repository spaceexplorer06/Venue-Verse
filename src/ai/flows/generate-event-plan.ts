
'use server';
/**
 * @fileOverview An AI agent that helps plan events by generating comprehensive details.
 *
 * - generateEventPlan - A function that generates a full event plan based on a theme.
 * - GenerateEventPlanInput - The input type for the generateEventPlan function.
 * - GenerateEventPlanOutput - The return type for the generateEventPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEventPlanInputSchema = z.object({
  theme: z.string().min(10, { message: "Event theme must be at least 10 characters." })
    .describe('The theme, core idea, or purpose of the event (e.g., "A surprise 30th birthday party for a sci-fi fan", "A corporate team-building workshop focused on communication").'),
});
export type GenerateEventPlanInput = z.infer<typeof GenerateEventPlanInputSchema>;

const GenerateEventPlanOutputSchema = z.object({
  name: z.string().describe('A creative and catchy name for the event.'),
  description: z.string().min(50).describe('A compelling and detailed description for the event (minimum 50 characters), highlighting key aspects, activities, and target audience.'),
  suggestedDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in YYYY-MM-DD format." })
    .describe('A suggested future date for the event in YYYY-MM-DD format. This should be a plausible date, at least a few weeks or a month from now, considering typical planning lead times.'),
  suggestedTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Time must be in HH:MM format." })
    .describe('A suggested start time for the event in HH:MM 24-hour format.'),
  suggestedLocation: z.string().describe('A specific type of location or a general venue suggestion suitable for the event theme and activities (e.g., "Spacious conference hall downtown", "Rustic barn in the countryside", "Online via Zoom for a virtual gathering").'),
  guestCapacity: z.number().int().positive().optional()
    .describe('An estimated guest capacity appropriate for the event. Omit if not applicable or hard to determine based on the theme alone.'),
});
export type GenerateEventPlanOutput = z.infer<typeof GenerateEventPlanOutputSchema>;

export async function generateEventPlan(input: GenerateEventPlanInput): Promise<GenerateEventPlanOutput> {
  return generateEventPlanFlow(input);
}

const generateEventPlanPrompt = ai.definePrompt({
  name: 'generateEventPlanPrompt',
  input: {schema: GenerateEventPlanInputSchema},
  output: {schema: GenerateEventPlanOutputSchema},
  prompt: `You are an expert event planner AI. Your task is to generate a comprehensive plan for an event based on the provided theme or idea.

Event Idea/Theme: {{{theme}}}

Please provide the following details for the event:
1.  **Event Name:** A creative, catchy, and relevant name.
2.  **Event Description:** A detailed and appealing description (at least 50 characters). It should cover the essence of the event, what attendees can expect, and who it's for.
3.  **Suggested Date:** A plausible future date in YYYY-MM-DD format. Ensure this date is at least 3-4 weeks from today to allow for planning.
4.  **Suggested Time:** A suitable start time in HH:MM (24-hour) format.
5.  **Suggested Location:** A type of venue or specific location idea that fits the event's theme and activities. Be descriptive (e.g., "A modern art gallery downtown", "A large park with picnic areas", "A virtual platform like Gather Town").
6.  **Guest Capacity (Optional):** An estimated number of guests the event could accommodate. If not applicable or difficult to determine from the theme alone, you can omit this or provide a broad range.

Ensure all details are consistent with the event theme.
`,
});

const generateEventPlanFlow = ai.defineFlow(
  {
    name: 'generateEventPlanFlow',
    inputSchema: GenerateEventPlanInputSchema,
    outputSchema: GenerateEventPlanOutputSchema,
  },
  async input => {
    const {output} = await generateEventPlanPrompt(input);
    if (!output) {
      throw new Error("AI failed to generate a valid event plan. The output structure might be incorrect.");
    }
    // Basic validation for date plausibility (e.g., not in the past) could be added here if desired,
    // but the prompt already guides the AI.
    return output;
  }
);
