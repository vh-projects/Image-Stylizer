// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@heroui/react";

// const artworks = [
//   {
//     artist: "Vincent van Gogh",
//     title: "Starry Night",
//     year: "1889",
//     location: "MoMA, New York",
//     img: "/art-images/art-image1.jpg",
//     description:
//       "One of the most recognized paintings in the world, capturing the swirling night sky over Saint-Rémy.",
//   },
//   {
//     artist: "Leonardo da Vinci",
//     title: "Mona Lisa",
//     year: "1503",
//     location: "Louvre, Paris",
//     img: "/art-images/art-image4.jpg",
//     description:
//       "Famous for her enigmatic smile, the Mona Lisa is a masterpiece of Renaissance portrait art.",
//   },
//   {
//     artist: "Claude Monet",
//     title: "Water Lilies",
//     year: "1916",
//     location: "Musée de l'Orangerie, Paris",
//     img: "/art-images/art-image2.jpg",
//     description:
//       "Part of Monet’s large series, Water Lilies represents his fascination with light and nature.",
//   },
//   {
//     artist: "Edvard Munch",
//     title: "The Scream",
//     year: "1893",
//     location: "National Gallery, Oslo",
//     img: "/art-images/art-image3.jpg",
//     description:
//       "An iconic symbol of human anxiety and existential dread, painted with bold expressionist strokes.",
//   },
// ];

// const ArtShowcase = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   // Close details on Escape key
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape") setOpenIndex(null);
//     };
//     window.addEventListener("keydown", handleEsc);
//     return () => window.removeEventListener("keydown", handleEsc);
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-20 space-y-16">
//       {artworks.map((art, index) => {
//         const isOpen = openIndex === index;
//         const reversed = index % 2 === 1;

//         return (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="relative"
//           >
//             <div
//               className={`flex flex-col md:flex-row ${
//                 reversed ? "md:flex-row-reverse" : ""
//               } bg-gradient-to-br from-gray-900/60 to-black/70 rounded-3xl overflow-hidden border border-white/10 shadow-[0_10px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl`}
//             >
//               {/* Image Section */}
//               <motion.div
//                 whileHover={{ scale: 1.02, rotateY: reversed ? -5 : 5 }}
//                 transition={{ type: "spring", stiffness: 120, damping: 14 }}
//                 className="md:w-1/2 relative overflow-hidden"
//               >
//                 <img
//                   src={art.img}
//                   alt={art.title}
//                   className="w-full h-[400px] object-cover transform transition-all duration-700 hover:scale-105"
//                   draggable="false"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
//                 <p className="absolute bottom-4 left-4 bg-white/10 px-3 py-1 rounded-full text-sm text-gray-200 border border-white/20 backdrop-blur-md">
//                   {art.year}
//                 </p>
//               </motion.div>

//               {/* Info Section */}
//               <div className="md:w-1/2 p-8 flex flex-col justify-center">
//                 <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
//                   {art.title} <span className="text-gray-400 text-xl">({art.year})</span>
//                 </h2>

//                 <div className="mt-6">
//                   <Button
//                     onClick={() => setOpenIndex(isOpen ? null : index)}
//                     className="bg-white/10 hover:bg-white/20 text-white rounded-full px-5 py-2 transition-all"
//                   >
//                     {isOpen ? "Hide details" : "View details"}
//                   </Button>
//                 </div>

//                 <AnimatePresence>
//                   {isOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       transition={{ duration: 0.4 }}
//                       className="overflow-hidden mt-6"
//                     >
//                       <div className="bg-white/5 p-5 rounded-xl border border-white/10 text-gray-200">
//                         <p className="text-lg font-semibold">{art.artist}</p>
//                         <p className="text-sm text-gray-400 italic">{art.location}</p>
//                         <p className="mt-4 leading-relaxed">{art.description}</p>
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>
//           </motion.div>
//         );
//       })}
//     </div>
//   );
// };

// export default ArtShowcase;












"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/react";

const artworks = [
  {
    artist: "Vincent van Gogh",
    title: "Starry Night",
    year: "1889",
    location: "MoMA, New York",
    img: "/art-images/art-image1.jpg",
    description:
      "One of the most recognized paintings in the world, capturing the swirling night sky over Saint-Rémy.",
  },
  {
    artist: "Leonardo da Vinci",
    title: "Mona Lisa",
    year: "1503",
    location: "Louvre, Paris",
    img: "/art-images/art-image4.jpg",
    description:
      "Famous for her enigmatic smile, the Mona Lisa is a masterpiece of Renaissance portrait art.",
  },
  {
    artist: "Claude Monet",
    title: "Water Lilies",
    year: "1916",
    location: "Musée de l'Orangerie, Paris",
    img: "/art-images/art-image2.jpg",
    description:
      "Part of Monet’s large series, Water Lilies represents his fascination with light and nature.",
  },
  {
    artist: "Edvard Munch",
    title: "The Scream",
    year: "1893",
    location: "National Gallery, Oslo",
    img: "/art-images/art-image3.jpg",
    description:
      "An iconic symbol of human anxiety and existential dread, painted with bold expressionist strokes.",
  },
];

const ArtShowcase = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-16">
      {artworks.map((art, index) => {
        const isOpen = openIndex === index;
        const reversed = index % 2 === 1;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className={`flex flex-col md:flex-row ${
                reversed ? "md:flex-row-reverse" : ""
              } bg-gradient-to-br from-gray-900/60 to-black/70 rounded-3xl overflow-hidden border border-white/10 shadow-[0_10px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl`}
            >
              {/* Image Section */}
              <motion.div
                whileHover={{ scale: 1.02, rotateY: reversed ? -5 : 5 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                className="md:w-1/2 flex items-center justify-center p-6 bg-gradient-to-b from-gray-950/80 to-black/60"
              >
                <div className="relative w-full max-w-lg aspect-[3/4] md:aspect-[4/3] rounded-2xl border border-white/10 overflow-hidden bg-white/5 shadow-2xl">
                  <img
                    src={art.img}
                    alt={art.title}
                    className="w-full h-full object-contain rounded-2xl select-none"
                    draggable="false"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                  <p className="absolute top-3 left-3 bg-white/10 px-3 py-1 rounded-full text-sm text-gray-200 border border-white/20 backdrop-blur-md">
                    {art.year}
                  </p>
                </div>
              </motion.div>

              {/* Info Section */}
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                  {art.title}{" "}
                  <span className="text-gray-400 text-xl font-light">
                    ({art.year})
                  </span>
                </h2>

                <div className="mt-6">
                  <Button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="bg-white/10 hover:bg-white/20 text-white rounded-full px-5 py-2 transition-all"
                  >
                    {isOpen ? "Hide details" : "View details"}
                  </Button>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden mt-6"
                    >
                      <div className="bg-white/5 p-5 rounded-xl border border-white/10 text-gray-200">
                        <p className="text-lg font-semibold">{art.artist}</p>
                        <p className="text-sm text-gray-400 italic">
                          {art.location}
                        </p>
                        <p className="mt-4 leading-relaxed">
                          {art.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ArtShowcase;
