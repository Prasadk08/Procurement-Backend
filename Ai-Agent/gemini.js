import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: "AIzaSyDfPl1sTY-Vpq7Qbivn6bq6-eW-wJacYgk",
});


export default model