import { useEffect, useState } from 'react';

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: string; left: number; size: number; duration: number; delay: number; color: string }[]>([]);

  useEffect(() => {
    // Generate an initial set of hearts
    const colors = ['text-pink-500', 'text-rose-400', 'text-fuchsia-400', 'text-pink-300', 'text-rose-500'];
    const newHearts = Array.from({ length: 60 }).map((_, i) => ({
      id: `heart-${i}-${Math.random()}`,
      left: Math.random() * 100,
      size: Math.random() * 1.2 + 0.4, // Slightly smaller for mobile
      duration: Math.random() * 10 + 10, // Slower
      delay: Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={`absolute ${heart.color} opacity-0 animate-float`}
          style={{
            left: `${heart.left}%`,
            bottom: '-10%',
            fontSize: `${heart.size}rem`,
            animationName: 'float-up',
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            textShadow: '0 0 10px currentColor'
          }}
        >
          ❤️
        </div>
      ))}
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-110vh) scale(1.5) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
