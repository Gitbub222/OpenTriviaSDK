import axios from "axios";
import { OpenTriviaRequest } from "./opentrivia";
import { OpenTrivaCatergory } from "./OpenTrivaCatergory";

const setRequestURL = async () => {
    
}

export const getQuestions = async (url: string) => {
  const { data } = await axios.get(url);
  const { results } = data;
  return results;
};

const req = {
  amount: 10,
  catergory: OpenTrivaCatergory.Animals,
} as OpenTriviaRequest;


