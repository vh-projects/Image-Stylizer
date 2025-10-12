
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Hero animations
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

const HeroSection = () => {
  

  const navigate = useNavigate();


  return (
    // <section className="relative w-full h-[73vh]  flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
       <section className="relative w-full h-[75vh] flex flex-col items-center justify-center text-center bg-gradient-to-b from-black via-gray-900 to-black">

      {/* Background Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-deepsea-steel/20 blur-[200px]"></div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 px-6 max-w-3xl"
      >
        {/* Tagline */}
        <motion.p
          variants={item}
          className="text-deepsea-slate tracking-widest uppercase text-sm md:text-base font-semibold"
        >
          AI Image Stylizer
        </motion.p>

        {/* Heading */}
        <motion.h1
          variants={item}
          className="mt-4 text-4xl md:text-6xl font-bold text-white leading-tight font-['Unbounded']"
        >
          Transform Your Images <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-navy to-accent-red">
            Into Masterpieces
          </span>
        </motion.h1>
 
        {/* Subtitle */}
        <motion.p
          variants={item}
          className="mt-6 text-lg md:text-xl text-gray-300 font-light  font-['Unbounded']"
        >
          Upload your photo, pick a style, and let the model turn it into art inspired by
          <span className="text-primary-teal font-medium"> Van Gogh, Monet, and more.</span>
        </motion.p>

        {/* CTA Button */}
        <motion.button
          variants={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/stylize")}
          className="mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-button-1 to-button-2 text-white font-semibold shadow-lg hover:shadow-xl"
        >
          Get Started
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;