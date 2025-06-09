// components/CursorFollower.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CursorImage from "../assets/welcome/cursor.png"; // Replace with your image

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.img
      src={CursorImage}
      alt="Cursor"
      className="pointer-events-none fixed z-[9999] w-[90px] h-[90px]"
      initial={{ opacity: 0 }}
      animate={{ x: position.x, y: position.y, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  );
};

export default CursorFollower;
