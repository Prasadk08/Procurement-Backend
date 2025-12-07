import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import dotenv from "dotenv"

dotenv.config()

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_KEY,
});


export default model