// src/ai/flows/project-insights.ts
'use server';

/**
 * @fileOverview AI-powered project insights generator.
 *
 * This file defines a Genkit flow that takes project data as input and
 * generates personalized insights about the project's impact and relevance.
 *
 * @param {ProjectInsightsInput} input - The input for the project insights flow.
 * @returns {Promise<ProjectInsightsOutput>} - A promise that resolves with the AI-generated project insights.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProjectInsightsInputSchema = z.object({
  title: z.string().describe('The title of the project.'),
  summary: z.string().describe('A brief summary of the project.'),
  toolsUsed: z.string().describe('The tools and technologies used in the project.'),
  githubLink: z.string().url().optional().describe('The link to the project repository on GitHub, if available.'),
});

export type ProjectInsightsInput = z.infer<typeof ProjectInsightsInputSchema>;

const ProjectInsightsOutputSchema = z.object({
  insights: z.string().describe('AI-generated insights about the project, summarizing its impact and relevance.'),
});

export type ProjectInsightsOutput = z.infer<typeof ProjectInsightsOutputSchema>;

export async function generateProjectInsights(input: ProjectInsightsInput): Promise<ProjectInsightsOutput> {
  return projectInsightsFlow(input);
}

const projectInsightsPrompt = ai.definePrompt({
  name: 'projectInsightsPrompt',
  input: {schema: ProjectInsightsInputSchema},
  output: {schema: ProjectInsightsOutputSchema},
  prompt: `You are an AI assistant that generates insightful summaries for data analytics projects.

  Given the following project details, provide a concise summary of the project's impact and relevance.

  Project Title: {{{title}}}
  Summary: {{{summary}}}
  Tools Used: {{{toolsUsed}}}
  GitHub Link: {{{githubLink}}}
  `,
});

const projectInsightsFlow = ai.defineFlow(
  {
    name: 'projectInsightsFlow',
    inputSchema: ProjectInsightsInputSchema,
    outputSchema: ProjectInsightsOutputSchema,
  },
  async input => {
    const {output} = await projectInsightsPrompt(input);
    return output!;
  }
);
