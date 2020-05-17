import { OpenTriviaCategory } from "./question-categories";
export declare enum ResponseCode {
    Success = 0,
    NoResults = 1,
    InvalidParameter = 2,
    TokenNotFound = 3,
    TokenEmpty = 4
}
export declare enum QuestionsType {
    MultipleChoice = "multiple",
    TrueFalse = "boolean"
}
export declare enum TextEncoding {
    URLFC3986 = "url3986",
    BASE64 = "base64"
}
export declare enum Difficulty {
    Easy = "easy",
    Medium = "medium",
    Hard = "hard"
}
export interface OpenTriviaRequest {
    amount: number;
    catergory?: OpenTriviaCategory;
    difficulty?: Difficulty;
    type?: QuestionsType;
    encode?: TextEncoding;
}
export interface Question {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    all_answers: string[];
}
