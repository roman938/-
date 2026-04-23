import { motion } from 'motion/react';

const photos = [
  { src: "/photo1.jpg", caption: "بحبك يا نور عيني ❤️" },
  { src: "/photo2.jpg", caption: "بنتي قبل ماتكوني حبيبتي ❤️" },
  { src: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=600&q=80", caption: "انتي العيد وانتي فرحتي ❤️" },
  { src: "https://images.unsplash.com/photo-1501901609772-df0848060b33?w=600&q=80", caption: "ببص ف عينيك بنسى الدنيا 🤗😍" },
  { src: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=600&q=80", caption: "ماهو مفيش جمال كدا بردو 💕🤔" },
  { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80", caption: "اكسچين ياجدعان 😍🤤" },
  { src: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=600&q=80", caption: "موزتي حقها تدلع ❤️💪🏻" },
  { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80", caption: "بحبك دي قليلة أوي عليكي انا بعشقك ❤️" },
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
              <img 
                src={photo.src} 
                alt="Memory" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
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
