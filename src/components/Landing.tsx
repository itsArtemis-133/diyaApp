import { useState } from "react";
import ValentineQuestion from "./ValentineQuestion";
import ValentineGame from "./Valentinegame";

const Landing = () => {
  const [showGame, setShowGame] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);

  const handleAccept = () => {
    setHasAccepted(true);
    // Delay to let confetti fall before starting the quest
    setTimeout(() => {
      setShowGame(true);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-rose-50">
      {showGame ? (
        <ValentineGame />
      ) : (
        <ValentineQuestion onAccept={handleAccept} hasAccepted={hasAccepted} />
      )}
    </div>
  );
};

export default Landing;