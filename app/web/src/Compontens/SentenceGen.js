import React, { useState} from "react";
import { useEffect } from "react";
import { OpenAI } from "openai";
import promptToUrl from "./funcs/promptToUrl";
import arrow from "../assets/arrow.png";
import LoadingScreen from "./LoadingScreen";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true   
});

const SentenceGen = () => {

  const [responseText, setResponseText] = useState(null);
  const [loading, setLoading] = useState(false);
  const [whatLoads, setWhatLoads] = useState("text");

  const [sentype, setSenType] = useState(0);
  const [finalSentence, setFinalSentence] = useState(''); 

  const [selectedDollar, setSelectedDollar] = useState([]);
  const [selectedHash, setSelectedHash] = useState([]);

  const [errorMes, setErrorMess] = useState('');

  const renderSentence = () => {
    const parts = responseText.all[0].zdanie.split('$');
    const secondParts = parts[1].split('#');
  
    return (
      <div>
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
      </div>
    );
  };

 
  const generateFinalSentence = () => {
    setLoading(true);
    setWhatLoads("image");

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
              setLoading(false);
            })
            .catch(error => {
              console.error('Błąd podczas ustawiania tapety:', error);
              setLoading(false);
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
    setWhatLoads("text");
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
    fetchOpenAIResponse();
    // setTimeout(()=>{
    //     const test = {
    //         "all": [
    //           {
    //             "zdanie": "W czasach średniowiecza rycerze często nosili zbroje, a ich ulubioną przekąską były $ #.",
    //             "$": ["złote jabłka", "kiełbaski w zbroi", "przekąski z zamku", "ciastka z miodem", "mrożony ogórek", "słodkie trociny", "serowe talerze", "muffinki od królowej", "ciasto z rycerzem", "pączki w zbroi"],
    //             "#": ["na turnieje", "w czasie walki", "podczas uczty", "na koniach", "w tawernach", "z wielbłądami", "na pikniku", "w lochach", "w dymie bitewnym", "podczas snu"]
    //           }
    //         ]
    //       }
    //     setResponseText(test);
    // },1000)
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
        <div style={{ display: loading ? "none" : "block" }}></div>
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
    fetchOpenAIResponse();
  }
  return (
    <div>
    {loading && <LoadingScreen action={whatLoads}/>}
      <div style={{ display: loading ? "none" : "block" }}>
    <div className="flex flex-col  items-center">
      <div className="bg-black w-full">
        <h1 className="p-4 text-4xl text-white text-center font-bold">TAPET.IO</h1>
      </div>
          <div className="h-[230px] mt-5 w-4/5 bg-gray-200 rounded-xl shadow-2xl">
            <div className="  h-3/4">
              <p className="text-left p-4 text-2xl">{renderSentence()}</p>
            </div>
            <div className=" h-1/4 flex flex-col items-center justify-center">
            </div>
          </div>
          <div className="w-full flex items-center justify-center  mt-5 gap-5 font-semibold text-xl ">
            <button className=" flex items-center justify-center p-5 bg-white hover:bg-gray-100 h-[65px] w-1/3" onClick={fetchOpenAIResponse} di sabled={loading}>{loading ? 'Ładowanie...' : 'Nowy temat'}</button> 
            <button className=" flex items-center justify-center text-white  bg-black hover:bg-gray-900  h-[65px] p-5 w-1/3" onClick={generateFinalSentence}>Ustaw tapetę</button>
          </div>
          <div className=" w-[95%] flex flex-col items-end">

            {sentype ? <> <button onClick={handleClick}  className="w-[120px]  ml-2 shadow-xl rounded-md p-2 bg-[#89e8af] font-semibold mt-2 flex items-center justify-item-center"> 
              <img src={arrow} className="w-[10px] ml-1 mr-1"></img>
            Przyszłość
            </button></> :
            <> 
            <button onClick={handleClick} className="w-[120px] ml-2 shadow-xl rounded-md p-2 bg-[#ffbc56] font-semibold  mt-2 flex items-center justify-item-center"> 
              <img src={arrow} className="w-[10px] ml-1 mr-1"></img>
            Przeszłość
            </button>
            </>}
           
          </div>
    </div>
    </div>
    </div>
     
  );
};

export default SentenceGen;
