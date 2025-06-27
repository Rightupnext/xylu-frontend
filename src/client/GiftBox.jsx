import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import giftbottom1 from "../assets/gift/bottom box.png";
import giftbottom2 from "../assets/gift/bottom box1.png";
import giffttop from "../assets/gift/top box 3.png";
import timer from "../assets/gift/timer 1.png";
import tab from "../assets/gift/tap.png";
const GiftBox = ({ timeLeft }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rearranged, setRearranged] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [tapKey, setTapKey] = useState(0); // used to re-trigger tab animation
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [showCountdownDigits, setShowCountdownDigits] = useState(false);

  const handleClick = () => {
    if (isOpen) {
      // Close process
      setShowTimer(false);
      setTimeout(() => {
        setIsOpen(false);
        setRearranged(false);
      }, 500);
      setTapKey((prev) => prev + 1);
    } else {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setIsOpen(true);
        setHasOpenedOnce(true); // 👈 mark as opened
      }, 400);
    }
  };

  // Rearrange lid after it's in the air
  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        setRearranged(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Timer reveal after rearranged is done
  useEffect(() => {
    if (rearranged) {
      const delay = setTimeout(() => {
        setShowTimer(true);
        setTimeout(() => {
          setShowCountdownDigits(true); // Show digits AFTER timer image reveals
        }, 1000); // wait for image animation (~1s)
      }, 300); // delay timer image start
      return () => clearTimeout(delay);
    }
  }, [rearranged]);

  const formatTime = (value) => String(value).padStart(2, "0");

  return (
    <section className="absolute mx-auto w-full mt-[190px] backdrop:blur-2xl my-auto">
      <div className="relative w-[400px] sm:w-[377px] h-[450px] sm:mx-auto cursor-pointer mx-[50px]">
        {/* Lid Animation */}
        <motion.div
          className="absolute sm:top-[19px] sm:left-[1px] left-[4px] z-50 cursor-pointer w-[220px] sm:w-[900px] top-[30px] rotate-[2deg] sm:rotate-0 "
          onClick={handleClick}
          initial={{ opacity: 0, y: -100 }}
          animate={
            isOpen
              ? rearranged
                ? {
                    x: 100,
                    y: 200,
                    rotate: 190,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 80,
                      damping: 12,
                    },
                  }
                : {
                    x: [0, 80, 180, 300],
                    y: [0, -80, -40, 200],
                    rotate: [0, -20, 60, 190],
                    opacity: 1,
                    transition: {
                      duration: 1,
                      ease: "easeInOut",
                    },
                  }
              : {
                  x: 0,
                  y: 0,
                  rotate: 0,
                  opacity: 1,
                  transition: { duration: 0.5 },
                }
          }
        >
          <img src={giffttop} alt="Gift Lid" />
        </motion.div>

        {/* Bottom Box - Closed with Shake */}
        {!isOpen && (
          <motion.img
            src={giftbottom1}
            className="absolute sm:bottom-0 left-[10px] z-10 w-[200px] sm:w-[700px] bottom-[200px] "
            alt="Gift Bottom 1"
            animate={
              isShaking
                ? {
                    x: [0, -10, 10, -8, 8, -4, 4, 0],
                  }
                : {}
            }
            transition={{ duration: 0.4 }}
          />
        )}

        {/* Bottom Box - Open */}
        {isOpen && (
          <motion.img
            onClick={handleClick}
            src={giftbottom2}
            className="absolute bottom-0 left-[10px] z-10 w-[200px] sm:w-[700px]"
            alt="Gift Bottom 2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Timer Reveal */}
        <AnimatePresence>
          {showTimer && (
            <motion.img
              onClick={handleClick}
              src={timer}
              key="timer"
              className="absolute bottom-[230px] z-[60] sm:w-full w-[250px]"
              alt="Timer"
              initial={{ y: 100, x: 0, scale: 0.4, opacity: 0 }}
              animate={{
                y: [200, 60, 30, 0],
                x: [0, 0, 0, 0], // slight sway like a kite
                scale: [0.5, 0.6, 0.9, 1],
                opacity: [10, 0.4, 0.8, 1],
              }}
              exit={{
                y: 100,
                x: 0,
                scale: 0.4,
                opacity: 0,
                transition: { duration: 0.4, ease: "easeIn" },
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
                type: "tween",
              }}
            />
          )}
        </AnimatePresence>
        {/* Tap Hint Image Animation */}
        <AnimatePresence>
          {!isOpen && !hasOpenedOnce && (
            <motion.img
              onClick={handleClick}
              key={tapKey}
              src={tab}
              alt="Tap to open"
              className="absolute  sm:top-[90px] top-[60px] sm:left-[170px] left-[80px] w-[60px] z-[900]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0, 1, 0.7, 1],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          )}
          {showCountdownDigits && (
            <div className="flex gap-[20px] z-[900] sm:text-6xl text-3xl absolute sm:ml-[30px] ml-[30px] mt-[-20px] sm:mt-[-150px] font-extrabold">
              {[
                timeLeft.days,
                timeLeft.hours,
                timeLeft.minutes,
                timeLeft.seconds,
              ].map((unit, idx) => (
                <motion.h1
                  key={idx}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 * idx, duration: 0.3 }}
                >
                  {formatTime(unit)}
                </motion.h1>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default GiftBox;
