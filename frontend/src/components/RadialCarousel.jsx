"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const images = [
  "/carousel-images/carousel-1.jpg",
  "/carousel-images/carousel-2.jpg",
  "/carousel-images/carousel-3.jpg",
  "/carousel-images/carousel-4.jpg",
  "/carousel-images/carousel-5.jpg",
  "/carousel-images/carousel-6.jpg",
];

const RADIUS = 180;

const RadialCarousel = () => {
  const [rotation, setRotation] = useState(0);

  const step = 360 / images.length;

  // 🔁 Auto rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.3); // smaller = smoother
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[320px] h-[400px] flex items-center justify-center relative">

      {/* subtle center glow */}
      <div className="absolute w-[250px] h-[250px] bg-cyan-500/10 blur-[120px]" />

      {images.map((img, i) => {
        const angle = (i * step + rotation) * (Math.PI / 180);

        const x = Math.cos(angle) * RADIUS;
        const y = Math.sin(angle) * RADIUS;

        const scale = (Math.sin(angle) + 1.2) / 2; // depth illusion
        const opacity = (Math.sin(angle) + 1.5) / 2;

        return (
          <motion.div
            key={i}
            animate={{ x, y, scale, opacity }}
            transition={{ type: "tween", ease: "linear", duration: 0.1 }}
            className="absolute top-1/2 left-1/2"
            style={{ translateX: "-50%", translateY: "-50%" }}
          >
            <div className="w-[120px] h-[160px] rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <img
                src={img}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default RadialCarousel;