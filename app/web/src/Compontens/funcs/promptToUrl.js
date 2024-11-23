import { OpenAI } from "openai";
const func = async (promptString) => {
    const openai = new OpenAI({
        apiKey: "cos",
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