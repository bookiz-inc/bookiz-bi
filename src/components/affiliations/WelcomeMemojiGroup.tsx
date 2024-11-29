'use client';

import { motion } from 'framer-motion';

const emojis = ['👋', '🎉', '✨', '🌟'];

export function WelcomeMemojiGroup() {
  return (
    <div className="relative h-24 w-full max-w-[280px] mx-auto mb-8">
      {emojis.map((emoji, index) => (
        <motion.div
          key={emoji}
          className="absolute"
          style={{
            left: `${25 * index}%`,
            zIndex: emojis.length - index
          }}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
          transition={{
            delay: index * 0.2,
            duration: 0.5,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <span className="text-4xl md:text-5xl filter drop-shadow-md cursor-pointer">
            {emoji}
          </span>
        </motion.div>
      ))}
    </div>
  );
} 