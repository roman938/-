import { motion } from 'motion/react';
import FloatingHearts from './FloatingHearts';
import Hero from './Hero';
import Counters from './Counters';
import InteractiveButtons from './InteractiveButtons';
import InteractiveCards from './InteractiveCards';
import ImageGallery from './ImageGallery';
import FloatingMessages from './FloatingMessages';
import FinalModal from './FinalModal';
import MusicPlayer from './MusicPlayer';

export default function MainPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative min-h-screen overflow-x-hidden"
    >
      <FloatingHearts />
      
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-rose-950/40 to-black/80 z-0" />

      <div className="relative z-10 pb-32">
        <Hero />
        <Counters />
        <InteractiveButtons />
        <InteractiveCards />
        <ImageGallery />
        
        <div className="flex justify-center mt-20 mb-12 px-4">
          <FinalModal />
        </div>
      </div>

      <FloatingMessages />
      <MusicPlayer />
    </motion.div>
  );
}
