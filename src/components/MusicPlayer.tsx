import { useState, useRef, useEffect, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';

const playlist = [
  { src: '/song1.mp3', title: 'الأغنية الأولى 🎵', artist: 'إهداء من كل قلبي ❤️' },
  { src: '/song2.mp3', title: 'الأغنية الثانية 🎵', artist: 'يا أجمل صدفة في حياتي' },
  { src: '/song3.mp3', title: 'الأغنية الثالثة 🎵', artist: 'صوتك بيطمني' },
  { src: '/song4.mp3', title: 'الأغنية الرابعة 🎵', artist: 'ديما في بالي' }
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    // Attempt to automatically play when the component mounts and to bypass browser autoplay policy
    const attemptPlay = () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
           setIsPlaying(true);
        }).catch(() => {
           // Browsers intentionally block autoplay without interaction
           setIsPlaying(false);
           
           // Automatically re-attempt play on first interaction 
           const handleInteraction = () => {
              if (audioRef.current && !isPlaying) {
                 audioRef.current.play();
                 setIsPlaying(true);
                 document.removeEventListener('click', handleInteraction);
                 document.removeEventListener('touchstart', handleInteraction);
              }
           };
           document.addEventListener('click', handleInteraction);
           document.addEventListener('touchstart', handleInteraction);
        });
      }
    };
    attemptPlay();
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    
    // Auto play when track changes
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (!audioRef.current) return;
    
    const updateProgress = () => {
      const audio = audioRef.current;
      if (audio && audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      handleNext();
    };

    audioRef.current.addEventListener('timeupdate', updateProgress);
    audioRef.current.addEventListener('ended', handleEnded);
    
    return () => {
      audioRef.current?.removeEventListener('timeupdate', updateProgress);
      audioRef.current?.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex]);

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

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
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
      <audio ref={audioRef} src={currentTrack.src} preload="auto" autoPlay />
      
      <div className="flex items-center gap-4 mb-3">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center shrink-0 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
          <Music className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-bold text-[15px] drop-shadow-md">{currentTrack.title}</h4>
          <p className="text-pink-300 text-xs mt-1" dir="rtl">{currentTrack.artist}</p>
        </div>
        
        <div className="flex items-center gap-3 shrink-0" dir="ltr">
          <button 
            onClick={handlePrev}
            className="text-white hover:text-pink-400 transition-colors"
          >
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button 
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white text-pink-600 flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          >
            {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
          </button>
          <button 
            onClick={handleNext}
            className="text-white hover:text-pink-400 transition-colors"
          >
            <SkipForward size={20} fill="currentColor" />
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
