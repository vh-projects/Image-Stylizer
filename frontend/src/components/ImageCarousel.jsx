
// // -------------------------------------------------- 2. -----------------------------------------------------------


// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Card } from "@heroui/react";

// const images = [
//   "/carousel-images/carousel-1.jpg",
//   "/carousel-images/carousel-2.jpg",
//   "/carousel-images/carousel-3.jpg",
//   "/carousel-images/carousel-4.jpg",
//   "/carousel-images/carousel-5.jpg",
//   "/carousel-images/carousel-6.jpg",
//   "/carousel-images/carousel-7.jpg",
// ];

// const ImageCarousel = () => {
//   const [index, setIndex] = useState(0);

//   const next = () => setIndex((prev) => (prev + 1) % images.length);
//   const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

//   // Auto-slide every 5s
//   useEffect(() => {
//     const interval = setInterval(next, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full max-w-5xl h-[450px] flex items-center justify-center overflow-hidden rounded-3xl bg-black/40 backdrop-blur-md">
//       <AnimatePresence initial={false} mode="wait">
//         <motion.div
//           key={index}
//           initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
//           animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
//           exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
//           transition={{ duration: 1.2, ease: [0.45, 0, 0.55, 1] }}
//           className="absolute w-full h-full"
//         >
//           <Card className="w-full h-full rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
//             <img
//               src={images[index]}
//               alt={`Slide ${index}`}
//               className="w-full h-full object-cover object-center transition-transform duration-[4000ms] ease-linear hover:scale-105"
//             />
//           </Card>
//         </motion.div>
//       </AnimatePresence>

//       {/* Overlay gradient for cinematic feel */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

//       {/* Controls */}
//       <button
//         onClick={prev}
//         className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-lg rounded-full text-white text-3xl font-light hover:bg-white/20 transition"
//       >
//         ‹
//       </button>
//       <button
//         onClick={next}
//         className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-lg rounded-full text-white text-3xl font-light hover:bg-white/20 transition"
//       >
//         ›
//       </button>

//       {/* Indicator dots */}
//       <div className="absolute bottom-6 flex gap-2">
//         {images.map((_, i) => (
//           <motion.div
//             key={i}
//             className={`w-2.5 h-2.5 rounded-full ${
//               i === index ? "bg-white" : "bg-white/30"
//             }`}
//             animate={{ scale: i === index ? 1.4 : 1 }}
//             transition={{ duration: 0.3 }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageCarousel;





























"use client";

import { motion } from "framer-motion";
import { Card } from "@heroui/react";

const images = [
  "/carousel-images/carousel-1.jpg",
  "/carousel-images/carousel-2.jpg",
  "/carousel-images/carousel-3.jpg",
  "/carousel-images/carousel-4.jpg",
  "/carousel-images/carousel-5.jpg",
  "/carousel-images/carousel-6.jpg",
  "/carousel-images/carousel-7.jpg",
];

const ImageCarousel = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black/40 backdrop-blur-md rounded-3xl">
      {/* Outer wrapper to clip content */}
      <div className="flex items-center justify-center w-full h-[450px]">
        {/* Motion container with infinite horizontal movement */}
        <motion.div
          className="flex gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 25, // adjust speed here (lower = faster)
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {/* We duplicate the list twice to make the loop seamless */}
          {[...images, ...images].map((img, idx) => (
            <Card
              key={idx}
              className="min-w-[400px] h-[450px] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex-shrink-0"
            >
              <img
                src={img}
                alt={`Carousel ${idx}`}
                className="w-full h-full object-cover object-center"
              />
            </Card>
          ))}
        </motion.div>
      </div>

      {/* Overlay gradient for cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />
    </div>
  );
};

export default ImageCarousel;
