"use client";

import { useState, useEffect, useRef } from 'react';

// --- THE PUBLIC DOMAIN ARCHIVE ---
const LITERARY_ARCHIVE = [
    { text: "Shall I compare thee to a summer's day?", author: "W. Shakespeare", source: "Sonnet 18" },
    { text: "To be, or not to be, that is the question.", author: "W. Shakespeare", source: "Hamlet" },
    { text: "Love looks not with the eyes, but with the mind.", author: "W. Shakespeare", source: "Midsummer Night's Dream" },
    { text: "My only love sprung from my only hate.", author: "W. Shakespeare", source: "Romeo & Juliet" },
    { text: "The course of true love never did run smooth.", author: "W. Shakespeare", source: "Midsummer Night's Dream" },
    { text: "If music be the food of love, play on.", author: "W. Shakespeare", source: "Twelfth Night" },
    { text: "All the world's a stage, and all the men and women merely players.", author: "W. Shakespeare", source: "As You Like It" },
    { text: "A rose by any other name would smell as sweet.", author: "W. Shakespeare", source: "Romeo & Juliet" },
    { text: "Parting is such sweet sorrow.", author: "W. Shakespeare", source: "Romeo & Juliet" },
    { text: "It is the east, and Juliet is the sun.", author: "W. Shakespeare", source: "Romeo & Juliet" },
    { text: "Cowards die many times before their deaths; The valiant never taste of death but once.", author: "W. Shakespeare", source: "Julius Caesar" },
    { text: "We are such stuff as dreams are made on.", author: "W. Shakespeare", source: "The Tempest" },
    { text: "The better part of valor is discretion.", author: "W. Shakespeare", source: "Henry IV" },
    { text: "Brevity is the soul of wit.", author: "W. Shakespeare", source: "Hamlet" },
    { text: "Though she be but little, she is fierce.", author: "W. Shakespeare", source: "Midsummer Night's Dream" },
    { text: "When shall we three meet again in thunder, lightning, or in rain?", author: "W. Shakespeare", source: "Macbeth" },
    { text: "Something wicked this way comes.", author: "W. Shakespeare", source: "Macbeth" },
    { text: "Friends, Romans, countrymen, lend me your ears.", author: "W. Shakespeare", source: "Julius Caesar" },
    { text: "What light through yonder window breaks?", author: "W. Shakespeare", source: "Romeo & Juliet" },
    { text: "To thine own self be true.", author: "W. Shakespeare", source: "Hamlet" },
    { text: "All that glitters is not gold.", author: "W. Shakespeare", source: "Merchant of Venice" },
    { text: "Hell is empty and all the devils are here.", author: "W. Shakespeare", source: "The Tempest" },
    { text: "Uneasy lies the head that wears a crown.", author: "W. Shakespeare", source: "Henry IV" },
    { text: "Hope is the thing with feathers that perches in the soul.", author: "Emily Dickinson", source: "Poems" },
    { text: "I cannot live with You – It would be Life – And Life is over there.", author: "Emily Dickinson", source: "Poems" },
    { text: "Because I could not stop for Death – He kindly stopped for me.", author: "Emily Dickinson", source: "Poems" },
    { text: "The Soul selects her own Society – Then – shuts the Door.", author: "Emily Dickinson", source: "Poems" },
    { text: "A word is dead when it is said, some say. I say it just begins to live that day.", author: "Emily Dickinson", source: "Poems" },
    { text: "That it will never come again is what makes life so sweet.", author: "Emily Dickinson", source: "Poems" },
    { text: "I’m Nobody! Who are you? Are you – Nobody – too?", author: "Emily Dickinson", source: "Poems" },
    { text: "Forever is composed of nows.", author: "Emily Dickinson", source: "Poems" },
    { text: "The heart wants what it wants - or else it does not care.", author: "Emily Dickinson", source: "Letters" },
    { text: "To live is so startling it leaves little time for anything else.", author: "Emily Dickinson", source: "Letters" },
    { text: "Nature is a haunted house--but Art--is a house that tries to be haunted.", author: "Emily Dickinson", source: "Letters" },
    { text: "Tell all the truth but tell it slant.", author: "Emily Dickinson", source: "Poems" },
    { text: "The Brain—is wider than the Sky.", author: "Emily Dickinson", source: "Poems" },
    { text: "I felt a Funeral, in my Brain.", author: "Emily Dickinson", source: "Poems" },
    { text: "Wild Nights - Wild Nights! Were I with thee Wild Nights should be our luxury!", author: "Emily Dickinson", source: "Poems" },
    { text: "I dwell in Possibility.", author: "Emily Dickinson", source: "Poems" },
    { text: "Success is counted sweetest by those who ne'er succeed.", author: "Emily Dickinson", source: "Poems" },
    { text: "My life closed twice before its close.", author: "Emily Dickinson", source: "Poems" },
    { text: "If I loved you less, I might be able to talk about it more.", author: "Jane Austen", source: "Emma" },
    { text: "The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid.", author: "Jane Austen", source: "Northanger Abbey" },
    { text: "There is no charm equal to tenderness of heart.", author: "Jane Austen", source: "Emma" },
    { text: "I declare after all there is no enjoyment like reading!", author: "Jane Austen", source: "Pride & Prejudice" },
    { text: "A large income is the best recipe for happiness I ever heard of.", author: "Jane Austen", source: "Mansfield Park" },
    { text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.", author: "Jane Austen", source: "Pride & Prejudice" },
    { text: "You must learn some of my philosophy. Think only of the past as its remembrance gives you pleasure.", author: "Jane Austen", source: "Pride & Prejudice" },
    { text: "My courage always rises at every attempt to intimidate me.", author: "Jane Austen", source: "Pride & Prejudice" },
    { text: "There is a stubbornness about me that never can bear to be frightened at the will of others.", author: "Jane Austen", source: "Pride & Prejudice" },
    { text: "Know your own happiness.", author: "Jane Austen", source: "Sense and Sensibility" },
    { text: "Friendship is the finest balm for the pangs of disappointed love.", author: "Jane Austen", source: "Northanger Abbey" },
    { text: "I do not want people to be very agreeable, as it saves me the trouble of liking them a great deal.", author: "Jane Austen", source: "Letters" },
    { text: "Selfishness must always be forgiven you know, because there is no hope of a cure.", author: "Jane Austen", source: "Mansfield Park" },
    { text: "Life seems but a quick succession of busy nothings.", author: "Jane Austen", source: "Mansfield Park" },
    { text: "To define is to limit.", author: "Oscar Wilde", source: "Dorian Gray" },
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde", source: "Epigrams" },
    { text: "We are all in the gutter, but some of us are looking at the stars.", author: "Oscar Wilde", source: "Lady Windermere" },
    { text: "The truth is rarely pure and never simple.", author: "Oscar Wilde", source: "Earnest" },
    { text: "I can resist everything except temptation.", author: "Oscar Wilde", source: "Lady Windermere" },
    { text: "Experience is simply the name we give our mistakes.", author: "Oscar Wilde", source: "Dorian Gray" },
    { text: "The only way to get rid of a temptation is to yield to it.", author: "Oscar Wilde", source: "Dorian Gray" },
    { text: "A good friend will always stab you in the front.", author: "Oscar Wilde", source: "Epigrams" },
    { text: "Most people are other people. Their thoughts are someone else's opinions.", author: "Oscar Wilde", source: "De Profundis" },
    { text: "To love oneself is the beginning of a lifelong romance.", author: "Oscar Wilde", source: "Ideal Husband" },
    { text: "I am so clever that sometimes I don't understand a single word of what I am saying.", author: "Oscar Wilde", source: "Happy Prince" },
    { text: "Always forgive your enemies; nothing annoys them so much.", author: "Oscar Wilde", source: "Epigrams" },
    { text: "There is only one thing in the world worse than being talked about, and that is not being talked about.", author: "Oscar Wilde", source: "Dorian Gray" },
    { text: "Art is the most intense mode of individualism that the world has known.", author: "Oscar Wilde", source: "Soul of Man" },
    { text: "Man is least himself when he talks in his own person. Give him a mask, and he will tell you the truth.", author: "Oscar Wilde", source: "Critic as Artist" },
    { text: "Quoth the Raven, 'Nevermore.'", author: "Edgar Allan Poe", source: "The Raven" },
    { text: "All that we see or seem is but a dream within a dream.", author: "Edgar Allan Poe", source: "A Dream Within a Dream" },
    { text: "I celebrate myself, and sing myself.", author: "Walt Whitman", source: "Song of Myself" },
    { text: "Two roads diverged in a wood, and I—I took the one less traveled by.", author: "Robert Frost", source: "The Road Not Taken" },
    { text: "Water, water, everywhere, nor any drop to drink.", author: "S.T. Coleridge", source: "Ancient Mariner" },
    { text: "I wandered lonely as a cloud.", author: "Wordsworth", source: "Daffodils" },
    { text: "Beauty is truth, truth beauty.", author: "John Keats", source: "Ode on a Grecian Urn" },
    { text: "Do not go gentle into that good night.", author: "Dylan Thomas", source: "Do Not Go Gentle" },
    { text: "Rage, rage against the dying of the light.", author: "Dylan Thomas", source: "Do Not Go Gentle" },
    { text: "I have measured out my life with coffee spoons.", author: "T.S. Eliot", source: "Prufrock" },
    { text: "April is the cruelest month.", author: "T.S. Eliot", source: "The Waste Land" },
    { text: "Look on my Works, ye Mighty, and despair!", author: "Percy Shelley", source: "Ozymandias" },
    { text: "She walks in beauty, like the night.", author: "Lord Byron", source: "She Walks in Beauty" },
    { text: "Tyger Tyger, burning bright, in the forests of the night.", author: "William Blake", source: "The Tyger" },
    { text: "To see a World in a Grain of Sand and a Heaven in a Wild Flower.", author: "William Blake", source: "Auguries" },
    { text: "I am the master of my fate, I am the captain of my soul.", author: "William Henley", source: "Invictus" },
    { text: "The woods are lovely, dark and deep, but I have promises to keep.", author: "Robert Frost", source: "Stopping by Woods" },
    { text: "Miles to go before I sleep.", author: "Robert Frost", source: "Stopping by Woods" },
    { text: "No man is an island, entire of itself.", author: "John Donne", source: "Devotions" },
    { text: "Death, be not proud.", author: "John Donne", source: "Holy Sonnets" },
    { text: "A thing of beauty is a joy forever.", author: "John Keats", source: "Endymion" },
    { text: "For the moon never beams without bringing me dreams.", author: "Edgar Allan Poe", source: "Annabel Lee" },
    { text: "We loved with a love that was more than love.", author: "Edgar Allan Poe", source: "Annabel Lee" }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateDisplay, setDateDisplay] = useState('--');
  const [timeDisplay, setTimeDisplay] = useState('--:--:--');
  const [weatherDisplay, setWeatherDisplay] = useState('Weather: Checking...');
  
  const [resultVisible, setResultVisible] = useState(false);
  
  // Data State
  const [mainWord, setMainWord] = useState('...');
  const [phonetic, setPhonetic] = useState('...');
  const [synonyms, setSynonyms] = useState('-');
  const [contextUsage, setContextUsage] = useState('-');
  
  // Array of 3 strings for definitions
  const [definitions, setDefinitions] = useState<string[]>(['Awaiting input...']);
  
  // Array of quote objects
  const [quotes, setQuotes] = useState<{text: string; author: string; source: string}[]>([]);
  const [fallbackMsg, setFallbackMsg] = useState('');

  // 1. TIME/DATE Effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateOpts: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      setDateDisplay(now.toLocaleDateString('en-US', dateOpts));
      setTimeDisplay(now.toLocaleTimeString('en-US'));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. WEATHER Effect
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&current_weather=true`);
          const data = await res.json();
          setWeatherDisplay(`Local: ${data.current_weather.temperature}°C`);
        } catch (e) {
          setWeatherDisplay("Weather: Unavailable");
        }
      }, () => {
        setWeatherDisplay("Weather: Sunny & Verbose");
      });
    } else {
      setWeatherDisplay("Weather: Standard Ink");
    }
  }, []);

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const term = searchTerm.toLowerCase().trim();
      if (!term) return;

      setResultVisible(false);

      // Fetch Dictionary API
      let dictData = null;
      try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${term}`);
        if (res.ok) {
          const json = await res.json();
          dictData = json[0];
        }
      } catch (err) {
        console.error(err);
      }

      // Allow a small delay for fade-out animation before rendering new data
      setTimeout(() => {
        renderNewspaper(term, dictData);
        setResultVisible(true);
      }, 500);
    }
  };

  const renderNewspaper = (term: string, data: any) => {
    // 1. Center Column
    setMainWord(data ? data.word : term);
    setPhonetic(data?.phonetic || "Phonetic unavailable");

    // Extract Synonyms & Usage
    let foundSynonyms: string[] = [];
    let foundExample: string | null = null;

    if (data?.meanings) {
      data.meanings.forEach((m: any) => {
        if (m.synonyms) foundSynonyms.push(...m.synonyms);
        m.definitions.forEach((d: any) => {
          if (d.example && !foundExample) foundExample = d.example;
        });
      });
    }

    setSynonyms(foundSynonyms.length > 0 ? [...new Set(foundSynonyms)].slice(0, 5).join(", ") : "No direct alternatives.");
    setContextUsage(foundExample ? `"${foundExample}"` : "Usage depends on context.");

    // 2. Definitions Column
    let defsList: string[] = [];
    if (data?.meanings) {
      data.meanings.forEach((m: any) => m.definitions.forEach((d: any) => defsList.push(d.definition)));
    }
    
    // Ensure we have 3 slots
    const finalDefs = [];
    for (let i = 0; i < 3; i++) {
      finalDefs.push(defsList[i] || "Pending...");
    }
    setDefinitions(finalDefs);

    // 3. Literary Corner (Strict Matching)
    const regex = new RegExp(`\\b${term}\\b`, 'i');
    const hits = LITERARY_ARCHIVE.filter(item => regex.test(item.text));

    if (hits.length > 0) {
      // Top 3 hits
      setQuotes(hits.slice(0, 3));
      setFallbackMsg('');
    } else {
      // Fallback
      if (foundExample) {
        setQuotes([{ text: foundExample, author: "Standard Usage", source: "The Dictionary" }]);
        setFallbackMsg(`(No specific matches in the Public Domain Archive for '${term}'.)`);
      } else {
        setQuotes([]);
        setFallbackMsg(`"The archives are silent. No direct verse containing '${term}' was found."`);
      }
    }
  };

  // Helper to highlight text safely
  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(\\b${highlight}\\b)`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() ? <span key={i} className="text-[#8b0000] underline">{part}</span> : part
    );
  };

  return (
    <main className="min-h-screen flex flex-col items-center pb-12 bg-[#e0dcd3] font-serif text-[#111]">
      <div className="bg-[#f4f1ea] w-[95%] max-w-[1200px] mt-5 p-10 shadow-xl border border-[#d4d0c7] min-h-[90vh]">
        
        {/* MASTHEAD */}
        <header className="text-center border-b-4 border-double border-[#111] pb-5 mb-10 relative">
          <div className="flex justify-between absolute top-0 w-full font-sans text-xs uppercase">
            <div className="border border-[#111] px-2 py-1 bg-white">{weatherDisplay}</div>
            <div className="border border-[#111] px-2 py-1 bg-white">{timeDisplay}</div>
          </div>
          <h1 className="font-serif text-6xl md:text-8xl font-black mt-6 mb-2 text-[#111] uppercase tracking-tighter leading-[0.9]">
            The Daily Lexicon
          </h1>
          <div className="font-serif italic text-xl text-[#444]">
            "All the Words That Are Fit to Print"
          </div>
          <div className="flex justify-between border-y border-[#111] py-1 mt-4 font-sans text-xs uppercase tracking-widest">
            <span>Vol. No. 1</span>
            <span>{dateDisplay}</span>
            <span>Price: Gratis (Public Domain)</span>
          </div>
        </header>

        {/* SEARCH */}
        <div className="text-center mb-12 border-b border-[#111] pb-8">
          <label className="font-sans text-sm uppercase tracking-widest mb-2 block">
            Type a word to search the archives:
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Try: 'Love', 'Time', 'Hope'..."
            className="w-full max-w-[600px] bg-transparent border-b-[3px] border-[#111] text-[#111] font-serif text-5xl font-bold text-center p-2 outline-none focus:bg-black/5 placeholder:text-[#999] placeholder:italic placeholder:font-normal placeholder:text-4xl"
          />
        </div>

        {/* COLUMNS */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-10 transition-all duration-700 ease-in-out ${resultVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          
          {/* COL 1: DEFINITIONS */}
          <div className="flex flex-col relative md:after:content-[''] md:after:absolute md:after:-right-5 md:after:top-0 md:after:bottom-0 md:after:w-[1px] md:after:bg-[#ccc]">
            <div className="font-sans text-xl font-bold uppercase border-b-2 border-[#111] pb-1 mb-5 tracking-wide">
              The Dictionary
            </div>
            <div className="space-y-6">
              {definitions.map((def, i) => (
                <div key={i}>
                  <span className="font-sans text-xs font-bold uppercase block mb-1 text-[#444]">
                    {["The Standard Lexicon", "Common Usage", "Academic Sense"][i]}
                  </span>
                  <div className="text-base leading-relaxed text-justify">
                    {def}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COL 2: POSSIBILITIES */}
          <div className="flex flex-col relative md:after:content-[''] md:after:absolute md:after:-right-5 md:after:top-0 md:after:bottom-0 md:after:w-[1px] md:after:bg-[#ccc]">
            <div className="font-sans text-xl font-bold uppercase border-b-2 border-[#111] pb-1 mb-5 tracking-wide">
              The Possibilities
            </div>
            
            <div className="font-serif text-4xl font-bold leading-none mb-2 text-center border-b border-[#111] pb-4">
              {mainWord}
            </div>
            <div className="text-center italic text-[#444] mb-5">
              {phonetic}
            </div>

            <div className="mb-5 bg-[#e3ddd3] p-4 border border-[#ccc]">
              <span className="font-sans font-bold text-xs uppercase mb-2 block border-b border-[#111]">
                Synonyms
              </span>
              <div className="italic leading-relaxed">
                {synonyms}
              </div>
            </div>

            <div className="mb-5 bg-[#e3ddd3] p-4 border border-[#ccc]">
              <span className="font-sans font-bold text-xs uppercase mb-2 block border-b border-[#111]">
                Contextual Usage
              </span>
              <div className="italic leading-relaxed">
                {contextUsage}
              </div>
            </div>
          </div>

          {/* COL 3: LITERARY CORNER */}
          <div className="flex flex-col">
            <div className="font-sans text-xl font-bold uppercase border-b-2 border-[#111] pb-1 mb-5 tracking-wide">
              Literary Corner
            </div>
            
            {quotes.length > 0 ? (
              quotes.map((q, i) => (
                <div key={i} className="mb-6 pl-4 border-l-[3px] border-[#111] pb-4 border-b border-dotted border-[#ccc] last:border-b-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <div className="text-lg font-bold font-serif leading-snug mb-2 text-[#111]">
                    "{getHighlightedText(q.text, searchTerm)}"
                  </div>
                  <div className="text-xs flex justify-between text-[#444] font-sans uppercase">
                    <span>— {q.author}</span>
                    <span className="font-bold text-[#8b0000]">{q.source}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-sm text-[#444] italic text-center mt-5 border-t border-[#ccc] pt-2">
                {fallbackMsg || "Selections from Shakespeare, Dickinson, & The Classics..."}
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}