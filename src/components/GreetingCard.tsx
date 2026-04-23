import FloatingHearts from './FloatingHearts';
import MusicPlayer from './MusicPlayer';
import CountdownTimer from './CountdownTimer';
import InteractiveButtons from './InteractiveButtons';
import InteractiveCards from './InteractiveCards';
import ImageGallery from './ImageGallery';
import FinalModal from './FinalModal';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';

export default function GreetingCard() {
  return (
    <div className="min-h-screen relative overflow-x-hidden bg-slate-950 font-sans selection:bg-pink-500/30">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-fuchsia-950/30" />
      
      <FloatingHearts />

      <main className="relative z-10 pt-16 pb-32">
        {/* Hero Section */}
        <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex glass-button py-2 px-6 rounded-full border border-pink-500/30 text-pink-300 font-bold mb-8 items-center gap-2"
          >
            <span>قررت افرحك العيد دا بطريقتي</span>
            <span className="text-xl">❤️✨</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
            className="flex items-center gap-4 mb-4"
          >
            <Heart className="w-8 h-8 md:w-12 md:h-12 text-pink-500 fill-pink-500 animate-pulse" />
            <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400 tracking-wider">
              NODY
            </h1>
            <Heart className="w-8 h-8 md:w-12 md:h-12 text-pink-500 fill-pink-500 animate-pulse" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-2xl md:text-3xl font-semibold text-slate-200 mt-2"
          >
            كل سنة وانتي منورة حياتي ❤️
          </motion.h2>
        </section>

        <CountdownTimer />
        <InteractiveButtons />
        <InteractiveCards />
        <ImageGallery />
        <FinalModal />
      </main>

      <MusicPlayer />
    </div>
  );
}
