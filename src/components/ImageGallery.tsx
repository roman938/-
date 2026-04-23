import { motion } from 'motion/react';

const photos = [
  { src: "/photo1.jpg", caption: "بحبك يا نور عيني ❤️" },
  { src: "/photo2.jpg", caption: "بنتي قبل ماتكوني حبيبتي ❤️" },
  { src: "/photo3.jpg", caption: "انتي العيد وانتي فرحتي ❤️" },
  { src: "/photo4.jpg", caption: "ببص ف عينيك بنسى الدنيا 🤗😍" },
  { src: "/photo5.jpg", caption: "ماهو مفيش جمال كدا بردو 💕🤔" },
  { src: "/photo6.mp4", caption: "اكسچين ياجدعان 😍🤤" },
  { src: "/photo7.jpg", caption: "موزتي حقها تدلع ❤️💪🏻" },
  { src: "/photo8.jpg", caption: "بحبك دي قليلة أوي عليكي انا بعشقك ❤️" },
];

export default function ImageGallery() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-24 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative rounded-2xl overflow-hidden glass-panel aspect-[4/5] cursor-pointer"
          >
            <div className="w-full h-full overflow-hidden">
              {photo.src.endsWith('.mp4') ? (
                <video 
                  src={photo.src} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <img 
                  src={photo.src} 
                  alt="Memory" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <p className="text-white text-center font-bold text-shadow text-lg">{photo.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
