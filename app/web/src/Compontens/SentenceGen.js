import React, { useState} from "react";
import { useEffect } from "react";
import { OpenAI } from "openai";
import promptToUrl from "./funcs/promptToUrl";
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true   
});

const SentenceGen = () => {

  const [responseText, setResponseText] = useState(null);
  const [loading, setLoading] = useState(false);

  const [sentype, setSenType] = useState(0);
  const [finalSentence, setFinalSentence] = useState(''); 

  const [selectedDollar, setSelectedDollar] = useState([]);
  const [selectedHash, setSelectedHash] = useState([]);

  const [errorMes, setErrorMess] = useState('');

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

 
  const generateFinalSentence = () => {
    const sentence = responseText.all[0].zdanie
      .replace('$', selectedDollar)
      .replace('#', selectedHash);
    setFinalSentence(sentence);  
    
    try{
      promptToUrl(sentence).then((imageUrl) => {
        console.log("imageurl", imageUrl)
        if(imageUrl.length > 0)
        {
          console.log("FIUFIFIF")
          window.api.setWallpaper(imageUrl)
            .then(response => {
              console.log(response);  
            })
            .catch(error => {
              console.error('Błąd podczas ustawiania tapety:', error);
            });
        }
      });
    }
    catch{
      console.log("Błąd")
    }
  };

  const fetchOpenAIResponse = async () => {
    setLoading(true);
    try {
      if (!navigator.onLine) {
        setLoading(false);
        return; 
      }
   
      const type = ["historycznej","futurystycznej"];
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "stwórz zdanie o tematyce " + type[sentype] + " z 2 lukami (luka 1 oznaczona $, luka 2 oznaczona #) w miejscach znaków mają trafić humorystyczne wyrazu pasujące gramatycznie i stylistycznie, do kazdej luki podaj 10 opcji. struktura pliku json:\n{\r\n    \"all\": [\r\n        {\r\n            \"zdanie\": \"\",\r\n            \"$\": [],\r\n            \"#\": []\r\n        }\r\n    ]\r\n}\n"
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

      if (!response || !response.choices || !response.choices[0].message.content) {
        throw new Error('Nieprawidłowa odpowiedź z API. Spróbuj ponownie później.');
      }
      else
      {
        setResponseText(JSON.parse(response.choices[0].message.content));
        setErrorMess('');
      }

    } catch (error) {
      console.error('Błąd API OpenAI:', error);
      setErrorMess("Wystąpił błąd podczas łączenia z API. Sprawdź połączenie internetowe !");
    }
    setLoading(false);
  };

  useEffect(()=>{
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
    },1000)
  },[])
 useEffect(()=>{
    if(responseText)
    {
        setSelectedDollar(responseText.all[0]["$"][0]);
        setSelectedHash(responseText.all[0]["#"][0]);
    }

 },[responseText])
  if(!responseText )
  {
      return(
          <button onClick={fetchOpenAIResponse}>Generuj pełne zdanie</button>
      )
  }

  const handleClick = () =>{
    if(sentype === 1)
    {
      setSenType(0);
    }
    else
    {
      setSenType(1)
    }
  }
  return (
    <div>

      <h1>Generuj Zdanie</h1>
       <button onClick={fetchOpenAIResponse} disabled={loading}>
        {loading ? 'Ładowanie...' : 'Zmień zdanie'}
      </button> 
          <button onClick={handleClick}> 
          {sentype === 0 ? "Futurystyczne" : "Historyczne" }
          </button>
          <p>Zdanie: {renderSentence()}</p>
          <button onClick={generateFinalSentence}>Generuj pełne zdanie</button>
          {finalSentence && <p>Wygenerowane zdanie: {finalSentence}</p>}
    </div>
     
  );
};

export default SentenceGen;
