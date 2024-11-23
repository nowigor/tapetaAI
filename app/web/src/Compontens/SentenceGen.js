import React, { useState } from "react";
import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true   // Zamień na swój klucz API
  });
const SentenceGen = () =>{
    const [responseText, setResponseText] = useState('');
    const [loading, setLoading] = useState(false);
  
    // Funkcja do pobierania odpowiedzi z OpenAI
    const fetchOpenAIResponse = async () => {
      setLoading(true);
      try {
        // Tworzymy zapytanie do OpenAI
        const cos = ["historycznej","futurystycznej"]
        const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              "role": "user",
              "content": [
                {
                  "type": "text",
                  "text": "stwórz zdanie o tematyce " + cos[0] + " z 2 lukami (luka 1 oznaczona $, luka 2 oznaczona #) w miejscach znaków mają trafić humorystyczne wyrazu pasujące gramatycznie i stylistycznie, do kazdej luki podaj 10 opcji. struktura pliku json:\n{\r\n    \"all\": [\r\n        {\r\n            \"zdanie\": \"\",\r\n            \"$\": [],\r\n            \"#\": []\r\n        }\r\n    ]\r\n}\n"
                }
              ]
            }
          ],
          response_format: {
            "type": "json_object"
          },
          temperature: 1,
          max_tokens: 2048,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0
        });
        console.log(response);
        console.log(response.choices[0].message);
        console.log(response.choices[0].message.content);
        // Odbierz odpowiedź i ustaw w stanie
        setResponseText(response.choices[0].message.content.trim());
      } catch (error) {
        console.error('Błąd API OpenAI:', error);
        setResponseText('Wystąpił błąd podczas komunikacji z API.');
      }
      setLoading(false);
    };
  
    return (
      <div>
        <h1>OpenAI API w React TEEEEEEEEEEEEEEEEEEEEEXT</h1>
        <button onClick={fetchOpenAIResponse} disabled={loading}>
          {loading ? 'Ładowanie...' : 'Generuj listę stringów'}
        </button>
        <pre>{responseText}</pre>
      </div>
    );
  };
export default SentenceGen