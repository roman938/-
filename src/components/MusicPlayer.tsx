import { useState, useRef, useEffect, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!audioRef.current) return;
    
    const updateProgress = () => {
      const audio = audioRef.current;
      if (audio && audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audioRef.current.addEventListener('timeupdate', updateProgress);
    return () => audioRef.current?.removeEventListener('timeupdate', updateProgress);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
          }).catch(error => {
            console.error("Audio play error:", error);
            setIsPlaying(false);
          });
        } else {
          setIsPlaying(true);
        }
      }
    }
  };

  const handleProgressBarClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const bar = e.currentTarget;
    const clickPosition = e.clientX - bar.getBoundingClientRect().left;
    const newProgress = (clickPosition / bar.offsetWidth) * 100;
    const newTime = (newProgress / 100) * audioRef.current.duration;
    
    audioRef.current.currentTime = newTime;
    setProgress(newProgress);
  };

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", delay: 1 }}
      className="fixed bottom-4 right-4 left-4 p-4 bg-black/60 backdrop-blur-xl rounded-3xl z-50 flex flex-col shadow-[0_10px_40px_rgba(236,72,153,0.3)] border border-white/10"
    >
      <audio ref={audioRef} loop preload="auto">
        {/* Primary Pixabay CDN link (not download endpoint) */}
        <source src="https://cdn.pixabay.com/audio/2022/02/07/audio_4a0e980556.mp3" type="audio/mpeg" />
        {/* Fallback romantic song (Chopin) */}
        <source src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Frederic_Chopin_-_Nocturne_in_E_flat_major%2C_Op._9_no._2.ogg" type="audio/ogg" />
      </audio>
      
      <div className="flex items-center gap-4 mb-3">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shrink-0 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
          <Music className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-bold text-[15px]">Our Song ❤️</h4>
          <p className="text-pink-300 text-xs" dir="ltr">Playing your favourite tune</p>
        </div>
        
        <div className="flex items-center gap-3 shrink-0" dir="ltr">
          <button 
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white text-pink-600 flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
          </button>
        </div>
      </div>

      <div 
        className="h-1.5 bg-white/20 rounded-full w-full cursor-pointer overflow-hidden relative"
        onClick={handleProgressBarClick}
      >
        <div 
          className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-pink-400 to-fuchsia-500 transition-all rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}
