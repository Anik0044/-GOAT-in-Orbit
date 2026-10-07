import { getAllWikiQuestions } from '../data/wiki';
import { shuffleArray } from './shuffle';

/**
 * Generates a random set of ready quiz questions from the entire Messi Wiki data pool.
 * @param {number} count Number of questions to return (default 10)
 * @returns Array of formatted quiz question objects with shuffled options
 */
export function getRandomQuiz(count = 10) {
  const allQuestions = getAllWikiQuestions();
  
  // Filter questions that have isQuizReady: true and valid quiz options
  const eligibleQuestions = allQuestions.filter(
    (q) => q.isQuizReady && q.quizOptions && q.quizOptions.length > 0 && q.quizCorrect
  );

  // Fisher-Yates shuffle the entire question pool
  const shuffledPool = shuffleArray(eligibleQuestions);

  // Take the top 'count' questions
  const selectedQuestions = shuffledPool.slice(0, count);

  // Format and shuffle options for each selected question
  return selectedQuestions.map((q) => {
    const shuffledOptions = shuffleArray(q.quizOptions);
    return {
      id: q.id,
      question: q.question,
      options: shuffledOptions,
      correctAnswer: q.quizCorrect,
      explanation: q.answer,
      category: q.category,
    };
  });
}
