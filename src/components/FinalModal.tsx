import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, HeartHandshake } from 'lucide-react';

export default function FinalModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="glass-button px-8 py-4 rounded-full text-xl font-bold text-white bg-gradient-to-r from-pink-600/50 to-fuchsia-600/50 border-pink-400/50 shadow-[0_0_20px_rgba(236,72,153,0.4)] z-10"
      >
        لسه مخلصتش دوسي هنا ❤️😂🙋
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="glass-panel w-full max-w-lg p-8 rounded-3xl relative z-10 box-glow text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500" />
              
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 left-4 p-2 rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="w-20 h-20 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartHandshake className="w-10 h-10 text-pink-400" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-relaxed">
                من الاخر بقى 😂❤️
              </h3>
              
              <p className="text-lg md:text-xl text-pink-100 leading-relaxed font-semibold">
                ربنا يخليكي ليا ومايحرمنيش منك ابدا يا روح قلبي ويارب العمر كله مع بعض انا بحبك ومقدرش اعيش من غيرك ثانية واحده يا اجمل واغلى حاجة في الدنيا ❤️
              </p>

              <motion.button
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold transition-colors"
              >
                بحبك يا روحي ❤️
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
