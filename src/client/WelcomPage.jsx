import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Doll from "../assets/welcome/doll.png";
import Speak1 from "../assets/welcome/speak1.png";
import Speak2 from "../assets/welcome/speak2.png";
import Speak3 from "../assets/welcome/speak3.png";

const starSizes = new Array(11).fill("text-2xl");
const radius = 120;

function WelcomPage({onComplete }) {
  const [showDoll, setShowDoll] = useState(false);
  const [speakStage, setSpeakStage] = useState(0); // 0 = nothing, 1 = speak1, 2 = speak2, 3 = speak3

  useEffect(() => {
    const dollTimer = setTimeout(() => {
      setShowDoll(true);
    }, 4000);

    const speechSequence = setTimeout(() => {
      setSpeakStage(1); // Show Speak1

      setTimeout(() => {
        setSpeakStage(2); // Show Speak2

        setTimeout(() => {
          setSpeakStage(3); // Show Speak3

          setTimeout(() => {
            setSpeakStage(0); // Hide all
          }, 7000); // Speak3 visible for 1s
        }, 5000); // Speak2 visible for 700ms
      }, 2000); // Speak1 visible for 500ms
    }, 5200);

    return () => {
      clearTimeout(dollTimer);
      clearTimeout(speechSequence);
    };
  }, []);

  const getSpeakImage = () => {
    if (speakStage === 1) return Speak1;
    if (speakStage === 2) return Speak2;
    if (speakStage === 3) return Speak3;
    return null;
  };

  return (
    <div className="z-[900] flex items-center container mx-auto  justify-center h-screen relative overflow-hidden">
      {/* Rotating Star Circle */}
      <AnimatePresence>
        {!showDoll && (
          <motion.div
            className="absolute w-60 h-60 md:w-80 md:h-80 rounded-full"
            initial={{ rotate: 0, opacity: 1 }}
            animate={{ rotate: 360 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 4, ease: "easeInOut" }}
          >
            {starSizes.map((size, index) => {
              const angle = (360 / starSizes.length) * index;
              const x = radius * Math.cos((angle * Math.PI) / 180);
              const y = radius * Math.sin((angle * Math.PI) / 180);
              return (
                <motion.div
                  key={index}
                  className={`absolute text-yellow-500 ${size}`}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  ★
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Doll and Speech */}
      <AnimatePresence>
        {showDoll && (
          <motion.div
            className="relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Doll Image */}
            <img src={Doll} alt="Doll" className="w-50 md:w-80" />

            {/* Dynamic Speak Bubble */}
            <AnimatePresence>
              {speakStage > 0 && (
                <motion.img
                  key={speakStage}
                  src={getSpeakImage()}
                  alt={`Speak${speakStage}`}
                  className="absolute w-full top-[-70px] sm:left-[-200px] left-[-120px]"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default WelcomPage;
