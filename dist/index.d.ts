import { OpenTriviaRequest, Question } from "./opentrivia";
import { QuestionImage, ImageSize } from "./pexels";
export * from './opentrivia';
export * from './helpers';
export * from './pexels';
export * from './question-categories';
/**
 *
 * returns a list of questions from the Open Trivia API
 *
 * @param params
 */
export declare const getQuestions: (params: OpenTriviaRequest) => Promise<Question[]>;
/**
 *
 * @param query
 * @param size
 */
export declare const getImage: (query: string, size: ImageSize) => Promise<QuestionImage>;
