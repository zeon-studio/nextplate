"use client";

import { motion } from "framer-motion";

interface ColorSquareProps {
  color: string;
  hex: string;
  name: string;
  description: string;
  delay: number;
}

const ColorSquare = ({
  color,
  hex,
  name,
  description,
  delay,
}: ColorSquareProps) => {
  const squareVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const isColorLight = (hexColor: string) => {
    const rgb = parseInt(hexColor.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  };

  const textColor = isColorLight(hex) ? "text-brown" : "text-white";

  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        className={`w-36 h-36 rounded ${color} border-2 border-silver flex flex-col justify-center items-center ${textColor}`}
        variants={squareVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay }}
      >
        <span className="font-semibold">{name}</span>
        <span className="text-sm">{hex}</span>
      </motion.div>
      <p className="mt-4">{description}</p>
    </div>
  );
};

export default ColorSquare;
