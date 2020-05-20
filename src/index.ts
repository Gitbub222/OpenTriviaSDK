import axios from "axios";
import { config } from "dotenv";
import { OpenTriviaRequest, Question, ResponseCode } from "./opentrivia";
import { QuestionImage, ImageSize } from "./pexels";
import { categories } from "./question-categories";

export * from "./opentrivia";
export * from "./helpers";
export * from "./pexels";
export * from "./question-categories";

config();

const OPEN_TRIVIA_BASE_URL = "https://opentdb.com/api.php?";
const REQUEST_SESSION_TOKEN_URL =
  "https://opentdb.com/api_token.php?command=request";
const PEXELS_BASE_URL = "https://api.pexels.com/v1/search?";

/**
 * function returns a url based on parameters provided
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
  const token = params.token ? `&token=${params.token}` : "";

  const url = `${OPEN_TRIVIA_BASE_URL}${amount}${catergory}${difficulty}${type}${encode}${token}`;
  return url;
};

/**
 *
 * returns a list of questions from the Open Trivia API
 * @param params  interface OpenTriviaRequest 
 *        
 */
export const getQuestions = async (params: OpenTriviaRequest): Promise <Question [] | []>=> {
  const url = setRequestURL(params);
  const { data } = await axios.get(url);
  if (data.response_code === ResponseCode.Success) {
    const { results } = data;
    const questionList: Question[] = [];
    results.forEach((question: any) => {
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
    if (data.response_code === ResponseCode.NoResults)
      console.log("The API doesn't have enough questions for your query");
    if (data.response_code === ResponseCode.TokenNotFound)
      console.log("Invalid Token");
    if (data.response_code === ResponseCode.TokenEmpty)
      console.log("Session Token has returned all possible questions");
    return [];
  }
};

/**
 * Retrieve an image from the pexels api relating to the catergory of a question
 *
 * @param query search for any image on pexel
 * @param size size of image {large, original, etc...}
 */
export const getImage = async (query: string, size: ImageSize): Promise<QuestionImage | undefined> => {
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

/**
 * Retrieve a Session Token
 *
 */
export const generateSessionToken = async (): Promise<string | undefined> => {
  const { data } = await axios.get(REQUEST_SESSION_TOKEN_URL);
  const { token, response_code, response_message } = data;
  console.log(response_message);
  if (response_code === ResponseCode.Success) return token;
};

/**
 * Reset a Session Token
 * @param session_token Session Tokens are unique keys that will help keep track of the questions the API has already retrieved
 */
export const resetSessionToken = async (session_token: string) => {
  const URL = `https://opentdb.com/api_token.php?command=reset&token=${session_token}`;

  const {data} = await axios.get(URL);
  const { response_code, token } = data;
  if (response_code === ResponseCode.Success) {
    console.log("Token reset");
    return token;
  }else{
    console.error({err: response_code})
    return {err: response_code};
  }
};

/**
 * Returns the entire list of categories in the OPENTRIVIA database.
 */
export const listAvailableCategories = () => {
  return Object.values(categories)
}

/**
 * Returns the number of questions in the database, in a specific category.
 * @param ID category ID (number) e.g 9
 */
export const numberOfQuestionsInCategory = async (ID: Number) => {
  const URL = `https://opentdb.com/api_count.php?category=${ID}`;
  const { data } = await axios.get(URL);
  return data;
 }

 /**
  * Returns the number of ALL questions in the database. Total, Pending, Verified, and Rejected.
  */
export const numberOfTotalQuestions = async () => {
  const URL = "https://opentdb.com/api_count_global.php";
  const { data } = await axios.get(URL);
  return data;
}

