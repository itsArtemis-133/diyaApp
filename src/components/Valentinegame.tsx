import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* --- Types --- */
interface Heart { id: number; left: number; top: number; size: number; emoji: string; delay: number; drift: number; }

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  image: string; 
}

interface QuizProps {
  onNext: () => void;
}

/* --- Stable Kitten & Hamster Mix (Guaranteed to Load) --- */
const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What's our 'perfect' date vibe? ✨",
    options: ["Fancy dinner & dressing up", "Cuddling & watching movies", "Late night walks & deep talks", "Trying new food together"],
    image: "https://placekitten.com/500/350",
  },
  {
    id: 2,
    question: "How much do I love you? 🌙",
    options: ["To the moon and back", "More than pizza (huge deal!)", "Infinity is just the start", "More than words can say"],
    image: "https://cdn.pixabay.com/photo/2016/10/26/18/59/hamster-1772240_640.jpg",
  },
  {
    id: 3,
    question: "Which emoji describes us best? 👩‍❤️‍👨",
    options: ["👩‍❤️‍👨 (The Classics)", "💖 (The Romantics)", "🍕 (The Foodies)", "♾️ (The Forevers)"],
    image: "https://placekitten.com/501/351",
  },
  {
    id: 4,
    question: "What is my absolute favorite thing about you? ❤️",
    options: ["Your beautiful smile", "How you handle me", "Your chaotic energy", "Every single thing!"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Pearl_Winter_White_Russian_Dwarf_Hamster_-_Front.jpg/640px-Pearl_Winter_White_Russian_Dwarf_Hamster_-_Front.jpg",
  },
  {
    id: 5,
    question: "How much of a 'cuchuu' are you being today? 🥰",
    options: ["100% Cuchuu", "Maximum Cuchuu", "Ultra Cuchuu", "Infinite Cuchuu!"],
    image: "https://placekitten.com/499/349",
  },
  {
    id: 6,
    question: "If we were animals, we'd be a cute 'hamster' pair, right? 🐹",
    options: ["Yes, definitely!", "The cutest hamsters ever", "Hamster energy only", "Squeak squeak! (Yes)"],
    image: "https://cdn.pixabay.com/photo/2014/10/01/10/44/hamster-468213_640.jpg",
  },
  {
    id: 7,
    question: "Who is my one and only 'my baby pie'? 🥧",
    options: ["Me!", "Only me", "Obviously me", "Your Baby Pie forever"],
    image: "https://placekitten.com/502/352",
  },
  {
    id: 8,
    question: "Final Step: Give me a big 'chu' before we move on! 💋",
    options: ["*Gives a Chu*", "*Big Chu*", "*The biggest Chu*", "Mwahh!"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Hamster_with_cheek_pouches_full.jpg/640px-Hamster_with_cheek_pouches_full.jpg",
  }
];

const ValentineGame = () => {
  const [step, setStep] = useState(1);
  const [clicks, setClicks] = useState(0);

  const [hearts] = useState<Heart[]>(() => 
    Array.from({ length: 20 }).map((_, i) => ({
      id: i, 
      left: Math.random() * 100, 
      top: Math.random() * 100,
      size: Math.random() * 20 + 20, 
      delay: i * 0.5, 
      drift: Math.random() * 40 - 20,
      emoji: ["❤️", "💖", "💝", "💗", "💕"][Math.floor(Math.random() * 5)]
    }))
  );

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* PROGRESS TRACKER */}
      <div className="absolute top-12 flex items-center justify-center w-full max-w-xs z-30 px-4">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center flex-1 last:flex-none">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black transition-all duration-700 shadow-lg border-4 ${step >= num ? 'bg-rose-500 border-white text-white shadow-rose-200' : 'bg-white border-rose-100 text-rose-200'}`}>
              {step > num ? "✓" : num}
            </div>
            {num < 3 && (
              <div className="flex-1 h-2 mx-2 rounded-full bg-white overflow-hidden shadow-inner">
                <motion.div initial={{ width: 0 }} animate={{ width: step > num ? "100%" : "0%" }} className="h-full bg-rose-400" transition={{ duration: 0.8 }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* BACKGROUND DECOR */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        {hearts.map(h => (
          <motion.div key={h.id} animate={{ y: [0, -150], opacity: [0, 1, 0], x: [0, h.drift] }} transition={{ duration: 7, repeat: Infinity, delay: h.delay }} className="absolute text-rose-300" style={{ left: `${h.left}%`, top: `${h.top}%`, fontSize: `${h.size}px` }}>
            {h.emoji}
          </motion.div>
        ))}
      </div>

      {/* MAIN CARD */}
      <motion.div layout className="max-w-xl w-full bg-white/90 backdrop-blur-xl rounded-[4rem] shadow-2xl p-10 md:p-14 relative z-10 border-8 border-white">
        <AnimatePresence mode="wait">
          {step === 1 && <Level1Quiz key="q" onNext={() => setStep(2)} />}
          {step === 2 && <Level2Memory key="m" onNext={() => setStep(3)} />}
          {step === 3 && <Level3Meter key="mt" clicks={clicks} setClicks={setClicks} onNext={() => setStep(4)} />}
          {step === 4 && <FinalScreen key="f" />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

/* --- Level 1 Components --- */
const Level1Quiz = ({ onNext }: QuizProps) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [ans, setAns] = useState<number | null>(null);

  const handleNextQuestion = () => {
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
      setAns(null); 
    } else {
      onNext(); 
    }
  };

  const activeQuestion = QUIZ_QUESTIONS[currentQ];

  return (
    <motion.div key={currentQ} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="text-center">
      <div className="flex flex-col items-center mb-6">
        <span className="bg-rose-100 text-rose-500 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">
          Quest Step {currentQ + 1} of 8
        </span>

        <motion.img 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          src={activeQuestion.image} 
          className="w-full h-48 object-cover rounded-3xl shadow-md mb-6 border-4 border-white"
          alt="Cute Kitten/Hamster"
        />

        <div className="flex gap-1 w-full h-1.5 px-4">
          {QUIZ_QUESTIONS.map((_, i) => (
            <div key={i} className={`flex-1 rounded-full transition-all duration-700 ${i <= currentQ ? 'bg-rose-500 shadow-md shadow-rose-200' : 'bg-rose-100'}`} />
          ))}
        </div>
      </div>

      <h2 className="text-2xl font-black text-rose-600 mb-8 leading-tight">{activeQuestion.question}</h2>

      <div className="space-y-4 text-left px-2">
        {activeQuestion.options.map((o, i) => (
          <button key={i} onClick={() => setAns(i)} className={`w-full p-4 rounded-3xl border-4 transition-all font-bold text-lg ${ans === i ? 'bg-rose-500 border-rose-600 text-white shadow-lg shadow-rose-200 -translate-y-1' : 'bg-rose-50 border-white text-rose-400 hover:border-rose-200 shadow-sm'}`}>
            {o}
          </button>
        ))}
      </div>

      <button disabled={ans === null} onClick={handleNextQuestion} className={`mt-10 w-full py-5 rounded-3xl font-black text-xl transition-all uppercase tracking-widest ${ans === null ? 'bg-rose-100 text-rose-200' : 'bg-rose-600 text-white shadow-xl hover:scale-[1.02] active:scale-95'}`}>
        {currentQ < QUIZ_QUESTIONS.length - 1 ? "Next Question →" : "Finish Level 1 →"}
      </button>
    </motion.div>
  );
};

/* --- Level 2 Component --- */
const Level2Memory = ({ onNext }: { onNext: () => void }) => {
  const emojis = useMemo(() => ["🧸", "🌹", "💖", "🌸", "💍", "🍫", "🎀", "🥂"], []);
  const [cards] = useState(() => [...emojis, ...emojis].sort(() => Math.random() - 0.5));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  const handle = (i: number) => {
    if (flipped.length === 2 || flipped.includes(i) || matched.includes(i)) return;
    const next = [...flipped, i];
    setFlipped(next);
    if (next.length === 2) {
      if (cards[next[0]] === cards[next[1]]) setMatched(p => [...p, ...next]);
      setTimeout(() => setFlipped([]), 600);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
      <span className="bg-rose-100 text-rose-500 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">The Memory Test</span>
      <h2 className="text-3xl font-black text-rose-600 mb-8">Match The Love</h2>
      <div className="grid grid-cols-4 gap-3 px-2">
        {cards.map((e, i) => (
          <motion.div key={i} onClick={() => handle(i)} className={`h-20 flex items-center justify-center text-3xl rounded-[1.2rem] cursor-pointer transition-all duration-500 shadow-md border-4 ${flipped.includes(i) || matched.includes(i) ? 'bg-white border-rose-200 rotate-0 shadow-inner' : 'bg-rose-400 border-rose-300 text-transparent rotate-6 hover:rotate-0 shadow-rose-200'}`}>
            {(flipped.includes(i) || matched.includes(i)) && e}
          </motion.div>
        ))}
      </div>
      {matched.length === cards.length && <button onClick={onNext} className="mt-10 w-full bg-rose-600 text-white py-5 rounded-3xl font-black text-xl shadow-xl hover:scale-105 active:scale-95 transition-all">Final Challenge! →</button>}
    </motion.div>
  );
};

interface Level3MeterProps {
  clicks: number;
  setClicks: (value: number | ((prev: number) => number)) => void;
  onNext: () => void;
}

/* --- Level 3 Component --- */
const Level3Meter = ({ clicks, setClicks, onNext }: Level3MeterProps) => {
  const [active, setActive] = useState(false);
  const start = () => { setClicks(0); setActive(true); setTimeout(() => setActive(false), 5000); };
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center font-sans">
      <span className="bg-rose-100 text-rose-500 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4 inline-block">The Speed Test</span>
      <h2 className="text-3xl font-black text-rose-600 mb-10 leading-tight text-balance">Fill The Meter With Love! ❤️</h2>
      <div onClick={() => active && setClicks((p: number) => p + 1)} className={`text-[120px] mb-8 cursor-pointer select-none transition-transform active:scale-90 ${active ? 'animate-bounce drop-shadow-2xl' : 'opacity-80 grayscale-[30%]'}`}>❤️</div>
      <div className="h-6 w-full bg-rose-50 rounded-full overflow-hidden mb-8 border-4 border-white shadow-inner mx-auto">
        <motion.div className="h-full bg-gradient-to-r from-rose-400 to-rose-600 shadow-lg shadow-rose-200" animate={{ width: `${Math.min(clicks * 2.5, 100)}%` }} transition={{ type: "spring", damping: 10 }} />
      </div>
      <p className="text-rose-600 font-black text-2xl mb-8 uppercase tracking-widest">Love Points: {clicks}</p>
      {!active && clicks === 0 ? <button onClick={start} className="w-full bg-rose-600 text-white py-5 rounded-3xl font-black text-xl shadow-xl hover:scale-105 transition-all">START TAPPING 🔥</button> : !active && <button onClick={onNext} className="w-full bg-rose-600 text-white py-5 rounded-3xl font-black text-xl shadow-xl hover:scale-105 transition-all">SEE THE SURPRISE ✨</button>}
    </motion.div>
  );
};

/* --- Final Screen Component --- */
const FinalScreen = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => { const timer = setTimeout(() => setWidth(100), 500); return () => clearTimeout(timer); }, []);
  return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
      <h2 className="text-5xl font-black text-rose-600 mb-8 tracking-tighter uppercase leading-tight">Quest Complete! 🏆</h2>
      <div className="text-[140px] mb-10 relative inline-block">
        💖
        <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-rose-400 rounded-full blur-[40px] -z-10" />
      </div>
      <div className="bg-rose-50 p-8 rounded-[2.5rem] border-4 border-white italic text-rose-700 font-black text-2xl leading-relaxed shadow-inner mb-10 shadow-rose-100 text-balance">
        "You passed every level, just like you won my heart. I love you endlessly, Pookie!"
      </div>
      <div className="h-8 w-full bg-rose-100 rounded-full overflow-hidden relative border-4 border-white shadow-inner mx-auto">
        <motion.div initial={{ width: 0 }} animate={{ width: `${width}%` }} transition={{ duration: 2.5, ease: "easeOut" }} className="h-full bg-gradient-to-r from-rose-400 via-pink-500 to-rose-600 shadow-md shadow-rose-200" />
        <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-black uppercase tracking-[0.3em]">Infinite Love Reached</span>
      </div>
    </motion.div>
  );
};

export default ValentineGame;