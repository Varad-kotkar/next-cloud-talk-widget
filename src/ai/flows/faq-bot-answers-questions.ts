'use server';
/**
 * @fileOverview An FAQ answering bot.
 *
 * - faqBotAnswersQuestions - A function that answers FAQs based on a markdown file.
 * - FaqBotAnswersQuestionsInput - The input type for the faqBotAnswersQuestions function.
 * - FaqBotAnswersQuestionsOutput - The return type for the faqBotAnswersQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FaqBotAnswersQuestionsInputSchema = z.object({
  question: z.string().describe('The question asked by the user.'),
  faqMarkdown: z.string().describe('The markdown file containing the FAQs.'),
});
export type FaqBotAnswersQuestionsInput = z.infer<typeof FaqBotAnswersQuestionsInputSchema>;

const FaqBotAnswersQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the question.'),
});
export type FaqBotAnswersQuestionsOutput = z.infer<typeof FaqBotAnswersQuestionsOutputSchema>;

export async function faqBotAnswersQuestions(input: FaqBotAnswersQuestionsInput): Promise<FaqBotAnswersQuestionsOutput> {
  return faqBotAnswersQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'faqBotAnswersQuestionsPrompt',
  input: {schema: FaqBotAnswersQuestionsInputSchema},
  output: {schema: FaqBotAnswersQuestionsOutputSchema},
  prompt: `You are a chatbot that answers questions based on a given FAQ markdown file.

FAQ Markdown:
{{{faqMarkdown}}}

Question: {{{question}}}

Answer:`,
});

const faqBotAnswersQuestionsFlow = ai.defineFlow(
  {
    name: 'faqBotAnswersQuestionsFlow',
    inputSchema: FaqBotAnswersQuestionsInputSchema,
    outputSchema: FaqBotAnswersQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
