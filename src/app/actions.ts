'use server';

import { faqBotAnswersQuestions, FaqBotAnswersQuestionsInput } from '@/ai/flows/faq-bot-answers-questions';

export async function getFaqAnswer(input: FaqBotAnswersQuestionsInput) {
  try {
    const result = await faqBotAnswersQuestions(input);
    return { success: true, answer: result.answer };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to get an answer from the bot.' };
  }
}
