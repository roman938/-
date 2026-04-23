import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

// A romantic, simple Typewriter effect component
const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 150);
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [text, delay]);

  return <span>{displayText}</span>;
};

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-10 px-4">
      {/* Cinematic Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover scale-105"
          style={{ filter: "brightness(0.6) contrast(1.1) saturate(1.2)" }}
        >
          {/* User's uploaded video */}
          <source src="https://storage.googleapis.com/aistudio-chat-blobs-prod/5s6sryx81y/Snaptik.app_7408794101898743058.mp4" type="video/mp4" />
          {/* Fallback romantic videos */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-romantic-couple-walking-on-a-sandy-beach-in-the-sunset-420-large.mp4" type="video/mp4" />
          <source src="https://cdn.pixabay.com/video/2016/09/21/5305-182369640_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm text-center space-y-8 mt-20">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-full inline-block shadow-lg"
        >
          <p className="text-pink-100 text-sm font-bold tracking-wide">
            قررت افرحك العيد دا بطريقتي ❤️✨
          </p>
        </motion.div>

        <motion.h1 
          className="text-5xl font-bold font-serif text-white tracking-widest my-6 text-glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Typewriter text="Dody ❤️❤️" delay={1500} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 3.5 }}
          className="text-2xl text-pink-100 font-bold bg-black/20 px-4 py-2 rounded-xl backdrop-blur-sm"
        >
          كل سنة وانتي منورة حياتي ❤️
        </motion.p>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-12"
        >
          <div className="w-[3px] h-16 bg-gradient-to-b from-pink-400/0 via-pink-400/80 to-pink-400/0 rounded-full animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}
