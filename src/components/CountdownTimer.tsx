import { useState, useEffect } from 'react';

interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [time, setTime] = useState<TimeElapsed>({
    years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    // Start date specified in the prompt: 2021-04-04
    const startDate = new Date('2021-04-04T00:00:00Z');

    const updateTimer = () => {
      const now = new Date();
      
      // Calculate differences
      let diff = now.getTime() - startDate.getTime();
      
      // We'll do an approximation for years/months to keep it simple and stable
      const s = Math.floor(diff / 1000);
      const m = Math.floor(s / 60);
      const h = Math.floor(m / 60);
      const d = Math.floor(h / 24);
      
      // For accurate calendar months and years
      let yearsDiff = now.getFullYear() - startDate.getFullYear();
      let monthsDiff = now.getMonth() - startDate.getMonth();
      let daysDiff = now.getDate() - startDate.getDate();

      if (daysDiff < 0) {
        monthsDiff--;
        // Get days in previous month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        daysDiff += prevMonth.getDate();
      }

      if (monthsDiff < 0) {
        yearsDiff--;
        monthsDiff += 12;
      }

      setTime({
        years: yearsDiff,
        months: monthsDiff,
        days: daysDiff,
        hours: h % 24,
        minutes: m % 60,
        seconds: s % 60,
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: 'سنة', value: time.years },
    { label: 'شهر', value: time.months },
    { label: 'يوم', value: time.days },
    { label: 'ساعة', value: time.hours },
    { label: 'دقيقة', value: time.minutes },
    { label: 'ثانية', value: time.seconds },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto my-16 text-center px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-fuchsia-300 mb-8">
        بداية عمري معاكي ❤️
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4" dir="ltr">
        {timeBlocks.reverse().map((block, i) => (
          <div key={i} className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center hover:-translate-y-1 transition-transform">
            <span className="text-3xl font-black text-white tabular-nums mb-1">
              {block.value.toString().padStart(2, '0')}
            </span>
            <span className="text-sm font-semibold tracking-wide text-pink-300">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
