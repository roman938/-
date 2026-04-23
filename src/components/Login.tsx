import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowLeft } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase().trim() === 'love') {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent">
      {/* Background blobs for cheerful vibe */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/30 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/30 rounded-full blur-[80px]" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 rounded-[2.5rem] w-full max-w-[340px] relative z-10 mx-5"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-fuchsia-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(236,72,153,0.5)]">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white mb-3 leading-relaxed">
            كل اللي هنا هيفضل بيني وبينك طول العمر ❤️🔒✨
          </h1>
          <p className="text-pink-200 text-sm font-semibold">عشان تدخلي، لازم تكتبي كلمة السر 😉</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة السر..."
                className={`w-full px-5 py-4 rounded-2xl bg-black/20 border-2 ${
                  error ? 'border-red-400 focus:border-red-400' : 'border-white/10 focus:border-pink-400'
                } text-white font-bold placeholder-white/40 focus:outline-none transition-all duration-300 text-center text-lg`}
                dir="ltr"
              />
            </div>
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-300 font-bold text-sm mt-3 text-center"
              >
                غلط يا نودي 😂 جربي تاني!
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 text-white font-bold py-4 px-4 rounded-2xl flex items-center justify-center gap-2 group transition-all shadow-[0_5px_20px_rgba(236,72,153,0.4)]"
          >
            <span className="text-lg">دخول</span>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
