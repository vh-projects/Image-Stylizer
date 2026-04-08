
"use client";

import { motion } from "framer-motion";

const artworks = [
  {
    artist: "Vincent van Gogh",
    title: "Starry Night",
    year: "1889",
    img: "/art-images/art-image1.jpg",
    description:
      "A powerful interpretation of motion and emotion. The swirling skies and bold brush strokes create a sense of depth and movement rarely seen in traditional imagery.",
    details: [
      "Captures expressive motion and dramatic contrast",
      "Enhances textures while preserving structure",
      "Ideal for emotional and dynamic compositions",
    ],
  },
  {
    artist: "Claude Monet",
    title: "Water Lilies",
    year: "1916",
    img: "/art-images/art-image2.jpg",
    description:
      "Soft transitions of light and color define this style. It transforms images into calm, dreamlike scenes with subtle gradients and painterly textures.",
    details: [
      "Focus on light diffusion and reflections",
      "Creates smooth and calming visual tones",
      "Perfect for landscapes and nature imagery",
    ],
  },
  {
    artist: "Edvard Munch",
    title: "The Scream",
    year: "1893",
    img: "/art-images/art-image3.jpg",
    description:
      "An intense and expressive transformation that emphasizes distortion and emotional depth. Colors become more dramatic, and forms more abstract.",
    details: [
      "High contrast and bold color shifts",
      "Adds emotional intensity to visuals",
      "Great for dramatic and abstract outputs",
    ],
  },
];

const ArtShowcase = () => {
  return (
    <section className="w-full py-32 bg-[#050505] text-white">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto px-6 mb-24 text-center">
        <h2 className="text-5xl md:text-6xl font-black tracking-tight">
          Beyond <span className="italic font-light">Filters</span>
        </h2>
        <p className="text-gray-400 mt-6 max-w-2xl mx-auto leading-relaxed">
          Each transformation is inspired by iconic artistic movements.
          The model doesn’t just recolor images — it reinterprets them
          through texture, structure, and stylistic depth.
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 space-y-32">

        {artworks.map((art, i) => {
          const reverse = i % 2 !== 0;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-16 ${
                reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* IMAGE */}
              <div className="relative flex-shrink-0">

                <img
                  src={art.img}
                  className={`
                    ${i === 0 ? "w-[340px] h-[440px] rounded-[20%]" : ""}
                    ${i === 1 ? "w-[420px] h-[260px] rounded-[40px]" : ""}
                    ${i === 2 ? "w-[300px] h-[300px] rounded-full" : ""}
                    object-cover border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]
                  `}
                />

                {/* label */}
                {/* <div className="absolute bottom-4 left-4 bg-black/70 px-12 py-1 text-xs rounded-full border border-white/10">
                  Arts
                </div> */}
              </div>

              {/* TEXT */}
              <div className="max-w-lg">

                <p className="text-xs text-gray-500 uppercase tracking-widest">
                  {art.artist} • <span className="rounded-[5px] text-[#FFCF99] bg-[#0077B6] px-2">{art.year}</span>
                </p>

                <h3 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight">
                  {art.title.split(" ")[0]}{" "}
                  <span className="italic font-light">
                    {art.title.split(" ").slice(1).join(" ")}
                  </span>
                </h3>

                <p className="mt-6 text-gray-400 leading-relaxed">
                  {art.description}
                </p>

                {/* DETAILS */}
                <div className="mt-6 space-y-2 text-sm text-gray-300">
                  {art.details.map((d, idx) => (
                    <p key={idx}>• {d}</p>
                  ))}
                </div>

                {/* EXTRA LINE */}
                <p className="mt-6 text-gray-500 text-sm leading-relaxed">
                  This style demonstrates how AI can reinterpret visual
                  elements while maintaining the integrity of the original
                  composition.
                </p>

              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default ArtShowcase;