import { useState } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

import image1 from "../images/image1.gif";
import image2 from "../images/image2.gif";
import image3 from "../images/image3.gif";
import image4 from "../images/image4.gif";
import image5 from "../images/image5.gif";
import image6 from "../images/image6.gif";
import image7 from "../images/image7.gif";

const IMAGES = [image1, image2, image3, image4, image5, image6, image7];
const NO_MESSAGES = ["No", "Are you sure?", "Pookie please 🥺", "Don't do this..", "I'll be so sad..", "💔"];

const ValentineQuestion = ({ onAccept, hasAccepted }: { onAccept: () => void; hasAccepted: boolean }) => {
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [currentImg, setCurrentImg] = useState(0);

  const handleNo = () => {
    if (noCount < NO_MESSAGES.length - 1) {
      setNoCount((prev) => prev + 1);
      setCurrentImg((prev) => (prev + 1) % (IMAGES.length - 1));
      setYesScale((prev) => prev + 0.45);
    }
  };

  const handleYes = () => {
    setCurrentImg(IMAGES.length - 1);
    const heart = confetti.shapeFromPath({ path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' });
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, shapes: [heart], colors: ['#ff69b4', '#fb7185'] });
    onAccept();
  };

  return (
    <div className="min-h-screen bg-[#fff5f7] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-200 rounded-full blur-[100px] opacity-50 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-pink-200 rounded-full blur-[100px] opacity-50 animate-pulse" />
      </div>

      <motion.div 
        layout
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className="max-w-md w-full bg-white/70 backdrop-blur-2xl p-8 rounded-[3rem] shadow-[0_20px_50px_rgba(251,113,133,0.2)] border-8 border-white text-center relative z-10"
      >
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImg} 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0 }} 
            src={IMAGES[currentImg]} 
            className="w-full h-72 object-cover rounded-[2rem] mb-6 shadow-inner" 
          />
        </AnimatePresence>
        
        <motion.h1 layout className="text-4xl font-black text-rose-600 mb-8 tracking-tighter">
          {hasAccepted ? "Yayyy! My Valentine! 💖" : "Will you be my Valentine?"}
        </motion.h1>

        {!hasAccepted && (
          <motion.div layout className="flex flex-col items-center">
            {/* FIX: We add a dynamic margin to account for the scale growth.
                As yesScale increases, marginBottom increases to push the "No" button down.
            */}
            <motion.button 
              layout
              style={{ 
                scale: yesScale,
                marginBottom: `${(yesScale - 1) * 35}px`,
                marginTop: `${(yesScale - 1) * 25}px`
              }} 
              whileHover={{ scale: yesScale + 0.05 }} 
              whileTap={{ scale: yesScale - 0.05 }} 
              onClick={handleYes} 
              className="bg-rose-500 hover:bg-rose-600 text-white font-black py-5 px-12 rounded-full shadow-[0_10px_20px_rgba(244,63,94,0.3)] transition-colors relative z-20"
            >
              YES! 💖
            </motion.button>

            <motion.button 
              layout
              onClick={handleNo} 
              className="text-rose-300 font-bold hover:text-rose-500 transition-colors duration-300 mt-6"
            >
              {NO_MESSAGES[noCount]}
            </motion.button>
          </motion.div>
        )}

        {hasAccepted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-rose-400 font-medium italic animate-pulse mt-4"
          >
            Entering your special surprise...
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default ValentineQuestion;