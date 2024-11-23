import { OpenAI } from "openai";
const promptToUrl = async (promptString) => {
    const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });

      try {
        const response = await openai.images.generate({
          prompt: promptString,
          n: 1,
          size: "1792x1024",
          model: "dall-e-3",
          quality: "hd",
        });
    
        if (response && response.data && response.data[0] && response.data[0].url) {
          console.log(response);
          return response.data[0].url;
        } else {
          console.error("Nieprawidłowa odpowiedź z API");
          return "";
        }
      } catch (error) {
        // Obsługa błędów
        console.error("Wystąpił błąd:", error);
        return ""; // Zwracamy false w przypadku błędu
      }

      
}

export default promptToUrl;