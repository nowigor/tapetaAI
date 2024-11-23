import React, { useState} from "react";
import { useEffect } from "react";
import { OpenAI } from "openai";
import ImageGen from "./ImageGen";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true   // Zamień na swój klucz API
});

const SentenceGen = () => {
    useEffect(() => {
        // Ta funkcja wykona się tylko raz, po pierwszym renderze komponentu
        console.log("Komponent został załadowany.");
    
        return () => {
          console.log("Komponent jest czyszczony.");
        };
      }, []);  // Pusta tablica zależności
  const [responseText, setResponseText] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(0);
  const [finalSentence, setFinalSentence] = useState('');  // Dodajemy stan do przechowywania pełnego zdania
  





//   const [selectedDollar, setSelectedDollar] = useState(test.all[0]["$"][0]);
//   const [selectedHash, setSelectedHash] = useState(test.all[0]["#"][0]);

const [selectedDollar, setSelectedDollar] = useState([]);
const [selectedHash, setSelectedHash] = useState([]);

  const renderSentence = () => {
    const parts = responseText.all[0].zdanie.split('$');
    const secondParts = parts[1].split('#');
  
    return (
      <>
        <span>{parts[0]}</span>
        <select value={selectedDollar} onChange={(e) => setSelectedDollar(e.target.value)}>
          {responseText.all[0]["$"].map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <span>{secondParts[0]}</span>
        <select value={selectedHash} onChange={(e) => setSelectedHash(e.target.value)}>
          {responseText.all[0]["#"].map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <span>{secondParts[1]}</span>
      </>
    );
  };

  // Funkcja do generowania pełnego zdania
  const generateFinalSentence = () => {
    const sentence = responseText.all[0].zdanie
      .replace('$', selectedDollar)
      .replace('#', selectedHash);
    setFinalSentence(sentence);  // Ustawiamy wygenerowane zdanie w stanie
  };

  // Funkcja do pobierania odpowiedzi z OpenAI
  const fetchOpenAIResponse = async () => {
    setLoading(true);
    try {
      const type = ["historycznej","futurystycznej"]
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "stwórz zdanie o tematyce " + type[0] + " z 2 lukami (luka 1 oznaczona $, luka 2 oznaczona #) w miejscach znaków mają trafić humorystyczne wyrazu pasujące gramatycznie i stylistycznie, do kazdej luki podaj 10 opcji. struktura pliku json:\n{\r\n    \"all\": [\r\n        {\r\n            \"zdanie\": \"\",\r\n            \"$\": [],\r\n            \"#\": []\r\n        }\r\n    ]\r\n}\n"
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
      setResponseText(JSON.parse(response.choices[0].message.content));
      console.log("RES", responseText);
    } catch (error) {
      console.error('Błąd API OpenAI:', error);
      setResponseText('Wystąpił błąd podczas komunikacji z API.');
    }
    setLoading(false);
  };

  useEffect(()=>{
    console.log("!")
    // fetchOpenAIResponse();

    setTimeout(()=>{
        const test = {
            "all": [
              {
                "zdanie": "W czasach średniowiecza rycerze często nosili zbroje, a ich ulubioną przekąską były $ #.",
                "$": ["złote jabłka", "kiełbaski w zbroi", "przekąski z zamku", "ciastka z miodem", "mrożony ogórek", "słodkie trociny", "serowe talerze", "muffinki od królowej", "ciasto z rycerzem", "pączki w zbroi"],
                "#": ["na turnieje", "w czasie walki", "podczas uczty", "na koniach", "w tawernach", "z wielbłądami", "na pikniku", "w lochach", "w dymie bitewnym", "podczas snu"]
              }
            ]
          }
        setResponseText(test);
    },5000)
  },[])

  if(!responseText )
  {
      
      return(
          <button onClick={fetchOpenAIResponse}>Generuj pełne zdanie</button>
      )
  }
  return (
    <div>
       <button onClick={fetchOpenAIResponse} disabled={loading}>
        {loading ? 'Ładowanie...' : 'Zmień zdanie'}
      </button> 
       {/* <pre>{responseText}</pre>  */}
      <h1>Generuj Zdanie</h1>
      <p>Zdanie: {renderSentence()}</p>
      <button onClick={generateFinalSentence}>Generuj pełne zdanie</button>
      {finalSentence && <p>Wygenerowane zdanie: {finalSentence}</p>}
      <ImageGen sentance={finalSentence}/>
    </div>
  );
};

export default SentenceGen;
