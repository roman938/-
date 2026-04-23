import { useState, Key } from 'react';
import { motion } from 'motion/react';

interface CardProps {
  key?: Key;
  delay?: number;
  frontIcon: string;
  backText: string;
  isLarge?: boolean;
}

const Card = ({ delay = 0, frontIcon, backText, isLarge = false }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`perspective-1000 w-full cursor-pointer group ${isLarge ? 'col-span-2 aspect-[3/1.5]' : 'aspect-square'}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative transform-style-3d transition-all duration-700"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-xl rounded-3xl flex flex-col items-center justify-center p-4 text-center group-hover:bg-white/20 transition-all">
          <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-3">
            <span className="text-2xl">{frontIcon}</span>
          </div>
          <span className="text-[11px] text-pink-200 mt-2 font-bold bg-black/20 px-3 py-1 rounded-full">دوسي هنا</span>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden glass-panel rounded-3xl flex flex-col items-center justify-center p-4 text-center rotate-y-180 bg-gradient-to-br from-pink-900/80 to-purple-900/80 box-glow border-pink-500/40">
          <p className={`${isLarge ? 'text-lg leading-relaxed' : 'text-xl'} font-bold text-pink-100`}>
            {backText}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function InteractiveCards() {
  const cardsData = [
    { front: "1️⃣", back: "كل ❤️" },
    { front: "2️⃣", back: "سنة ✨" },
    { front: "3️⃣", back: "وانتي 🥺" },
    { front: "4️⃣", back: "معايا ياروح قلبي ونفضل مع بعض العمر كله 👩‍❤️‍👨❤️🔒", isLarge: true },
  ];

  return (
    <div className="w-full py-16 relative z-10 flex flex-col items-center px-4">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-white mb-10 text-center"
      >
        دوسي على الكروت بالترتيب 😉❤️
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        {cardsData.map((card, index) => (
          <Card 
            key={index}
            delay={index * 0.15}
            frontIcon={card.front}
            backText={card.back}
            isLarge={card.isLarge}
          />
        ))}
      </div>
    </div>
  );
}

