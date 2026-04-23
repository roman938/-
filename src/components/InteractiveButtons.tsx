import { motion } from 'motion/react';

export default function InteractiveButtons() {
  const buttons = [
    { text: "بحبك ♡", delay: 0 },
    { text: "بموت فيكي ✨", delay: 0.2 },
    { text: "بعشقك 🔒", delay: 0.4 },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center py-24 relative z-10">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-white mb-10"
      >
        اقفي هنا شوية متجريش 😂
      </motion.h2>

      <div className="flex flex-col md:flex-row gap-6">
        {buttons.map((btn, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: btn.delay }}
            whileHover={{ scale: 1.1, translateY: -5 }}
            whileTap={{ scale: 0.95 }}
            className="glass-panel px-8 py-4 rounded-2xl text-xl font-bold text-pink-200 hover:text-white hover:bg-pink-600/30 hover:box-glow transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">{btn.text}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/20 to-pink-500/0 -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none" />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
