import { OpenTrivaCatergory } from "./OpenTrivaCatergory";

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
  amount: 10 | number;
  catergory?: OpenTrivaCatergory;
  difficulty?: Difficulty;
  type?: QuestionsType;
  encode?: TextEncoding;
}
