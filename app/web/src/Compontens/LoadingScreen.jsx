import React, { useState, useEffect } from "react";

const loadingPhrasesImage = [
  "Przygotowujemy najlepszy obrazek, proszę czekać!",
  "Nasze serwery rozgrzewają się do maksimum!",
  "Ładowanie w toku... za chwilę będzie śmiech!",
  "Pies w okularach przeciwsłonecznych już na horyzoncie!",
  "Cierpliwości, właśnie ściągamy kota na deskorolce!",
  "Nie martw się, obrazek zaraz dojedzie!",
  "Człowiek w kapeluszu już prawie na ekranie!",
  "Zaraz zrobimy Ci dzień! Ładujemy humor!",
  "Proszę o sekundkę, obrazek się parzy!",
  "Na prawdę śmieszne rzeczy czekają na Ciebie!",
  "Lama w okularach już w drodze!",
  "Za chwilę wjedzie kot na rowerze!",
  "Trochę cierpliwości, i gotowe!",
  "Czekaj, zaraz pokazujemy uśmiech na Twojej twarzy!",
  "Obrazek się ładuje... jeszcze tylko kawałek drogi!",
  "Każdy obrazek potrzebuje chwili na naładowanie humoru!",
  "Właśnie wyciskamy najlepszy śmiech z internetu!",
  "Nie stresuj się, kot zaraz pojawi się na ekranie!",
  "Za chwilę będziesz się śmiał jak nigdy!",
  "Na końcu ładowania czeka Cię wielka niespodzianka!",
  "Trzymaj się, za moment rozbawi Cię internet!",
  "Już prawie, jeszcze chwilka, aby rozśmieszyć Cię!",
  "To nie jest zwykłe ładowanie, to ładowanie śmiechu!",
  "Niech ładowanie trwa, obrazek się robi!",
  "Zaraz będzie się działo, zostań z nami!",
  "Zaraz Twój humor zostanie doładowany!",
  "Chwileczkę, obrazek gotowy do wybuchu śmiechu!",
  "Nie możesz się doczekać? Już prawie gotowe!",
  "Czekaj, zaraz uruchomi się lawina śmiechu!",
  "Zaraz będzie na ekranie coś, czego się nie spodziewasz!",
  "I zaraz wjeżdżamy z prawdziwym hitem!",
  "Poczekaj, to będzie najśmieszniejszy obrazek w Twoim życiu!",
  "Nie rób miny, zaraz Cię rozśmieszymy!",
  "Poczekaj chwilkę, obrazek ma swoje tempo!",
  "Czekaj, obrazek jest już w drodze do Twoich oczu!",
  "Już za chwilę, serwujemy najlepszą zabawę!",
  "Poczekaj, obrazek już prawie na Ciebie czeka!",
  "Śmiech w drodze... za chwilę się zacznie!",
  "Już prawie, obrazek zaraz wskoczy na ekran!",
  "Cierpliwości, za moment rozbawimy Cię na maksa!",
  "Daj nam chwilę, żeby dostarczyć Ci rozrywkę!",
  "Za moment cała scena śmiechu!",
  "Obrazek jest prawie gotowy, przygotuj się na śmiech!",
  "Już prawie, za moment Twoje oczy będą się śmiały!",
  "Ładowanie... teraz tylko uśmiech na Twojej twarzy!",
  "Już prawie, czekaj na najlepszy moment do śmiechu!",
  "Za chwilę będzie głośno, śmiech na całego!",
  "Obrazek się ładuje... a Ty się śmiejesz?",
  "Za chwilę wciągniesz się w wir śmiechu!",
  "Nie bój się, już wkrótce będziesz się śmiał!",
  "Zaraz na ekranie pojawi się coś, czego nie zapomnisz!",
  "Obrazek już jedzie na pełnym gazie!",
  "Za chwilę już nie będziesz mógł przestać się śmiać!",
  "Czekaj, aż zobaczysz ten obrazek!",
  "Za moment przywitamy Cię z wielkim uśmiechem!",
  "Obrazek się ładuje... a Ty się przygotuj na śmiech!"
];

const loadingPhrasesText = [
  "Czekamy na inspirację, już za chwilę coś się wydarzy!",
  "Daj nam chwilkę, aby stworzyć coś wyjątkowego!",
  "Pracujemy nad czymś świetnym, zostań z nami!",
  "Za moment wyświetlimy najlepszy pomysł!",
  "Tworzymy coś, co Cię zaskoczy!",
  "Wkrótce otrzymasz prawdziwą inspirację!",
  "Przygotowujemy dla Ciebie unikalny pomysł!",
  "Już prawie gotowe, chwilka cierpliwości!",
  "Na horyzoncie pojawi się coś niesamowitego!",
  "Zaraz otrzymasz prompt, na który czekasz!",
  "Właśnie dodajemy ostatnie szlify!",
  "Twój pomysł już prawie gotowy do działania!",
  "Przygotowujemy się do wyświetlenia czegoś niesamowitego!",
  "Cierpliwości, już za chwilę pojawi się prompt!",
  "Praca nad kreatywnym promptem trwa!",
  "Zaraz będziesz mógł podjąć najlepszą decyzję!",
  "Nie martw się, to już prawie gotowe!",
  "Tworzymy dla Ciebie coś, czego jeszcze nie widziałeś!",
  "Chwileczkę, jeszcze tylko kilka sekund!",
  "Poczekaj, tworzymy inspirację na miarę mistrza!",
  "Za moment będziesz miał przed sobą coś wyjątkowego!",
  "Daj nam sekundkę, jeszcze tylko ostatnie poprawki!",
  "Za chwilę będziesz mógł podjąć decyzję!",
  "Wkrótce wyświetlimy coś, co Cię zachwyci!",
  "Trzymaj się, już prawie gotowe!",
  "Czekaj, tworzymy coś, co rozwinie Twoje możliwości!",
  "Za moment Twój prompt będzie gotowy!",
  "Niech proces twórczy trwa, już prawie skończone!",
  "Pracujemy nad czymś, co idealnie pasuje do Ciebie!",
  "Poczekaj chwilę, a zaskoczymy Cię czymś specjalnym!",
  "Zaraz pojawi się prompt, którego nie zapomnisz!",
  "Już prawie, coś bardzo inspirującego jest na drodze!",
  "Cierpliwości, za chwilę dostaniesz swój unikalny prompt!",
  "Przygotowanie w toku... gotowe za chwilę!",
  "Poczekaj, nadchodzą niesamowite propozycje!",
  "Daj nam jeszcze chwilę, bo chcemy, żeby to było perfekcyjne!",
  "Przygotowanie za kulisami trwa!",
  "Za moment Twój prompt już będzie na ekranie!",
  "Chwilę to potrwa, ale warto czekać!",
  "Jest prawie gotowe, prawie gotowe do działania!",
  "Przygotowujemy inspirację na Twoje potrzeby!",
  "Już prawie, już prawie... jeszcze tylko moment!",
  "Poczekaj, zaskoczymy Cię czymś kreatywnym!",
  "Tworzymy coś specjalnie dla Ciebie, zostań z nami!",
  "Kreatywny proces w toku... zaraz wyświetlimy wynik!",
  "Już prawie, tylko jeszcze kilka poprawek!",
  "Chwileczkę, za moment dostaniesz pełny prompt!",
  "Za moment coś specjalnego wyświetli się na ekranie!",
  "Wkrótce zobaczysz pomysł, który Cię zainspiruje!",
  "Jest blisko, jeszcze tylko chwilę!",
  "Czekamy na finalny efekt, już za chwilę!",
  "Nadchodzi coś, co Cię zaskoczy i zainspiruje!",
  "Za moment Twój prompt wypełni ekran!",
  "Cierpliwości, zaraz będziesz mieć pomysł gotowy do działania!",
  "Przygotowanie trwa... już prawie gotowe!"
];


const LoadingScreen = ({action}) => {
  const data = action === "image" ? loadingPhrasesImage : loadingPhrasesText
  
  
  
  const [text, setText] = useState(data[Math.floor(Math.random() * data.length)]);

  useEffect(() => {
    const id = setInterval(() => {
      setText(data[Math.floor(Math.random() * data.length)]);
    }, 3000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div style={styles.overlay}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>{text}</p>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #3498db",
    borderRadius: "50%",
    animation: "spin 1s linear infinite", // spinner animation
  },
  text: {
    color: "#fff",
    marginTop: "10px",
    fontSize: "18px",
  },
};

export default LoadingScreen;