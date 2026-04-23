import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';

const MESSAGES = [
  "بحبك ❤️",
  "انتي حياتي",
  "انا محظوظ بيكي",
  "انتي الأمان",
  "مقدرش اعيش من غيرك",
  "احلى حاجة حصلتلي",
  "روحي وعمري",
  "ربنا يخليكي ليا",
];

interface FloatingMessage {
  id: string;
  text: string;
}

export default function FloatingMessages() {
  const [activeMessages, setActiveMessages] = useState<FloatingMessage[]>([]);

  useEffect(() => {
    const showNewMessage = () => {
      // Keep max 2 messages
      setActiveMessages(prev => {
        if (prev.length >= 2) return prev;
        
        const newMsg: FloatingMessage = {
          id: `${Date.now()}-${Math.random()}`,
          text: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
        };
        
        // Remove this message slower (after 8 seconds)
        setTimeout(() => {
          setActiveMessages(current => current.filter(m => m.id !== newMsg.id));
        }, 8000);
        
        return [...prev, newMsg];
      });
    };

    // Staggered long interval (7 to 14 seconds between new messages)
    let timeoutId: NodeJS.Timeout;
    
    const scheduleNext = () => {
      const delay = Math.random() * 7000 + 7000;
      timeoutId = setTimeout(() => {
        showNewMessage();
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    
    // Initial message
    const initialTimeoutId = setTimeout(showNewMessage, 3000);
    
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialTimeoutId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 pointer-events-none z-[100] p-4 flex flex-col gap-3 items-center w-full max-w-[90%] mx-auto">
      <AnimatePresence>
        {activeMessages.map((msg) => (
          <motion.div
            key={msg.id}
            layout
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
            className="w-full"
          >
            <div className="bg-white/95 backdrop-blur-xl border border-pink-200/50 px-4 py-3 rounded-2xl shadow-[0_15px_30px_rgba(236,72,153,0.3)] flex items-center gap-3 w-full">
              <div className="bg-pink-100 rounded-full p-2 shrink-0">
                <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
              </div>
              <div className="flex-1 text-right">
                <p className="text-pink-900 font-bold text-sm tracking-wide">{msg.text}</p>
                <p className="text-pink-500/70 text-[10px] mt-0.5">رسالة ليكي 💌</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
