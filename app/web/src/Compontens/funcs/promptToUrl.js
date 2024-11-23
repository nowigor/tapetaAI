import { OpenAI } from "openai";
const promptToUrl = async (promptString) => {
    const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });

      // Generowanie obrazu
      const response = await openai.images.generate({
        prompt: promptString,
        n: 1,
        size: "1024x1024",
        model: "dall-e-3"
      });

      return response.data[0].url;
}

export default promptToUrl;