import axios from "axios";
import { config } from "dotenv";
import {
  OpenTriviaRequest,
  Difficulty,
  QuestionsType,
  TextEncoding,
  Question,
  ResponseCode,
} from "./opentrivia";
import { OpenTriviaCategory, categories } from "./question-categories";
import { QuestionImage, ImageSize } from "./pexels";

config();

const OPEN_TRIVIA_BASE_URL = "https://opentdb.com/api.php?";
const PEXELS_BASE_URL = "https://api.pexels.com/v1/search?";

/**
 * function creates return a url based on parameters provided
 * @param params
 */
const setRequestURL = (params: OpenTriviaRequest): string => {
  const amount = params.amount ? `amount=${params.amount}` : `amount=${10}`;
  const catergory = params.catergory ? `&category=${params.catergory}` : "";
  const difficulty = params.difficulty
    ? `&difficulty=${params.difficulty}`
    : "";
  const type = params.type ? `&type=${params.type}` : "";
  const encode = params.encode ? `&encode=${params.encode}` : "";

  const url = `${OPEN_TRIVIA_BASE_URL}${amount}${catergory}${difficulty}${type}${encode}`;
  return url;
};

/**
 *
 * returns a list of questions from the Open Trivia API
 *
 * @param params
 */

export const getQuestions = async (params: OpenTriviaRequest) => {
  const url = setRequestURL(params);
  const { data } = await axios.get(url);
  if (data.response_code === ResponseCode.Success) {
    const { results } = data;
    const questionList: Question[] = [];
    await results.forEach((question: any, i: string | number) => {
      questionList.push({
        category: question.category,
        type: question.type,
        difficulty: question.difficulty,
        question: question.question,
        correct_answer: question["correct_answer"],
        all_answers: [
          question["correct_answer"],
          ...question["incorrect_answers"],
        ].sort(() => 0.5 - Math.random()),
      } as Question);
    });
    return questionList;
  } else {
    return [];
  }
};

/**
 *
 * @param query
 * @param size
 */
export const getImage = async (query: string, size: ImageSize) => {
  const { data } = await axios.get(PEXELS_BASE_URL, {
    headers: {
      Authorization: process.env.PEXELS_API_KEY,
    },
    params: {
      query: query,
      per_page: 1,
    },
  });
  const { photos } = data;
  const photo = photos[0];
  const image: QuestionImage = {
    id: photo.id,
    imagesize: size,
    src: photo.src[size],
  };
  return image;
};

// const paramaters: OpenTriviaRequest = {
//   amount: 10,
//   catergory: OpenTriviaCategory.Entertainment_Board_Games,
//   difficulty: Difficulty.Easy,
//   type: QuestionsType.MultipleChoice,
//   encode: TextEncoding.BASE64,
// };

// getQuestions(paramaters).then((res) => {
//   res.forEach((element) => {
//     console.log(element);
//   });
// });
