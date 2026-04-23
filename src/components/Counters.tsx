import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CalendarHeart } from 'lucide-react';

export default function Counters() {
  const [loveScore, setLoveScore] = useState(0);
  const [timePassed, setTimePassed] = useState({
    years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0
  });

  // Love Counter (increases every 0.5s)
  useEffect(() => {
    const interval = setInterval(() => {
      setLoveScore(prev => prev + Math.floor(Math.random() * 10) + 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Duration Counter (since 2024-10-06)
  useEffect(() => {
    const startDate = new Date('2024-10-06T00:00:00');
    
    const calculateTime = () => {
      const now = new Date();
      const diffStr = now.getTime() - startDate.getTime();
      
      const seconds = Math.floor((diffStr / 1000) % 60);
      const minutes = Math.floor((diffStr / 1000 / 60) % 60);
      const hours = Math.floor((diffStr / (1000 * 60 * 60)) % 24);
      const days = Math.floor(diffStr / (1000 * 60 * 60 * 24));
      
      const years = Math.floor(days / 365);
      const remainingDays = days % 365;
      const months = Math.floor(remainingDays / 30);
      const exactDays = remainingDays % 30;

      setTimePassed({ years, months, days: exactDays, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const CounterItem = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center justify-center py-2 px-1 bg-white/10 backdrop-blur-sm shadow-xl rounded-xl border border-white/20 min-w-[55px]">
      <span className="text-xl font-bold text-pink-300 font-mono text-glow">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] text-white/90 mt-1 font-semibold">{label}</span>
    </div>
  );

  return (
    <div className="w-full px-4 py-8 space-y-16 relative z-10 box-border">

      {/* Duration Counter (Now First) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center space-y-5 bg-rose-950/40 p-5 rounded-3xl border border-pink-500/20 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full pointer-events-none" />

        <div className="flex flex-col items-center gap-2.5">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-pink-300/30 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            <CalendarHeart className="w-4 h-4 text-pink-300" />
            <span className="text-pink-100 font-bold tracking-wider pt-1 text-sm">6/10/2024</span>
          </div>
          <p className="text-pink-200 text-[13px] font-bold text-center">
            اول يوم اتقابلنا فيه وعيني شافتك 🥹♥
          </p>
        </div>

        <h2 className="text-lg font-bold text-white text-center leading-relaxed px-2">
          عداد عمرنا اللي هيفضل يزيد طول ما احنا معا بعض ❤️
        </h2>
        
        <div className="grid grid-cols-3 gap-2 w-full pt-2" dir="ltr">
          <CounterItem value={timePassed.years} label="سنين" />
          <CounterItem value={timePassed.months} label="شهور" />
          <CounterItem value={timePassed.days} label="أيام" />
          <CounterItem value={timePassed.hours} label="ساعات" />
          <CounterItem value={timePassed.minutes} label="دقائق" />
          <CounterItem value={timePassed.seconds} label="ثواني" />
        </div>
      </motion.div>

      {/* Love Counter (Now Second) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-col items-center space-y-4 px-2"
      >
        <h2 className="text-xl font-bold text-white mb-2 text-center">قد ايه بحبك؟ 🤔❤️</h2>
        
        <div className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-pink-400/30 shadow-[0_0_20px_rgba(236,72,153,0.2)] w-full relative overflow-hidden">
          <div className="text-3xl font-bold font-mono text-pink-200 tracking-wider">
            {loveScore.toLocaleString()}
          </div>
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-2xl"
          >
            ❤️
          </motion.div>
        </div>
        
        <p className="text-sm text-pink-200 font-semibold bg-black/20 px-4 py-1.5 rounded-full">
          ومش مكفيين ❤️
        </p>
      </motion.div>

    </div>
  );
}
