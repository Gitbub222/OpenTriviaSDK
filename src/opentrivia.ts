import { OpenTriviaCategory } from "./question-categories";
import { QuestionImage } from "./pexels";

export enum ResponseCode {
  Success = 0,
  NoResults,
  InvalidParameter,
  TokenNotFound,
  TokenEmpty,
}

export enum QuestionsType {
  MultipleChoice = "multiple",
  TrueFalse = "boolean",
}

export enum TextEncoding {
  URLFC3986 = "url3986",
  BASE64 = "base64",
}

export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export interface OpenTriviaRequest {
  amount: number;
  catergory?: OpenTriviaCategory;
  difficulty?: Difficulty;
  type?: QuestionsType;
  encode?: TextEncoding;
  token?: string;
}

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  all_answers: string[];
}
