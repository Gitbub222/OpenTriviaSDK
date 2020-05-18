import { OpenTriviaRequest, Question } from "./opentrivia";
import { QuestionImage, ImageSize } from "./pexels";
export * from "./opentrivia";
export * from "./helpers";
export * from "./pexels";
export * from "./question-categories";
/**
 *
 * returns a list of questions from the Open Trivia API
 * @param params { amount: number;
                   catergory?: OpenTriviaCategory;
                   difficulty?: Difficulty;
                   type?: QuestionsType;
                   encode?: TextEncoding;
                   token?: string;
                 }
 *
 */
export declare const getQuestions: (params: OpenTriviaRequest) => Promise<Question[] | []>;
/**
 * Retrieve an image from the pexels api relating to catergory of a question
 *
 * @param query search for any image on pexel
 * @param size size of image {large, original, etc...}
 */
export declare const getImage: (query: string, size: ImageSize) => Promise<QuestionImage | undefined>;
/**
 * Retrieve a Session Token
 *
 */
export declare const generateSessionToken: () => Promise<string | undefined>;
/**
 * Reset a Session Token
 * @param session_token Session Tokens are unique keys that will help keep track of the questions the API has already retrieved
 */
export declare const resetSessionToken: (session_token: string) => Promise<any>;
