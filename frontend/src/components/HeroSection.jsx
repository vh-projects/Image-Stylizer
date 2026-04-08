// "use client";

// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const HeroSection = () => {
//   const navigate = useNavigate();

//   return (
//     <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-[#050505] overflow-hidden">

//       {/* subtle glow */}
//       <div className="absolute w-[700px] h-[700px] bg-cyan-500/10 blur-[160px] top-[-200px] left-1/2 -translate-x-1/2" />

//       <div className="relative z-10 max-w-7xl w-full px-6 grid md:grid-cols-2 gap-12 items-center">

//         {/* LEFT CONTENT */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <p className="text-cyan-400 uppercase tracking-[0.25em] text-sm">
//             AI Image Stylizer
//           </p>

//           <h1 className="mt-4 text-5xl md:text-6xl font-bold text-white leading-tight">
//             Your Photo,{" "}
//             <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
//               Reimagined
//             </span>
//           </h1>

//           <p className="mt-6 text-gray-400 text-lg max-w-lg">
//             Turn any image into artwork inspired by iconic styles. No skills needed — just upload and transform.
//           </p>

//           <div className="mt-8 flex gap-4">
//             <button
//               onClick={() => navigate("/stylize")}
//               className="px-7 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:scale-105 transition"
//             >
//               Try it now →
//             </button>

//             <button className="px-7 py-3 rounded-full border border-white/10 text-gray-300 hover:bg-white/5 transition">
//               View demo
//             </button>
//           </div>
//         </motion.div>

//         {/* RIGHT VISUAL (BEFORE → AFTER) */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//           className="relative flex items-center justify-center"
//         >
//           <div className="relative w-full max-w-md">

//             {/* BEFORE */}
//             <div className="absolute -left-10 top-6 w-[220px] h-[300px] rounded-2xl overflow-hidden border border-white/10 rotate-[-6deg] shadow-xl">
//               <img
//                 src="/demo/before.jpg"
//                 className="w-full h-full object-cover"
//               />
//               <span className="absolute bottom-2 left-2 text-xs bg-black/60 px-2 py-1 rounded">
//                 Original
//               </span>
//             </div>

//             {/* AFTER (MAIN) */}
//             <div className="relative w-[260px] h-[340px] rounded-2xl overflow-hidden border border-cyan-400/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
//               <img
//                 src="/demo/after.jpg"
//                 className="w-full h-full object-cover"
//               />
//               <span className="absolute bottom-2 left-2 text-xs bg-cyan-500/80 px-2 py-1 rounded">
//                 Stylized
//               </span>
//             </div>

//             {/* floating glow */}
//             <div className="absolute inset-0 bg-cyan-500/10 blur-2xl -z-10" />
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


// -----------------------


"use client";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center bg-[#050505] overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-[700px] h-[700px] bg-cyan-500/10 blur-[160px] top-[-200px] left-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-7xl w-full px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-cyan-400 uppercase tracking-[0.25em] text-sm">
            AI Image Stylizer
          </p>

          <h1 className="mt-4 text-5xl md:text-6xl font-bold text-white leading-tight">
            Watch Your Image{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text italic font-light text-transparent">
              Transform
            </span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg max-w-lg">
            Upload once. Instantly generate multiple artistic styles with AI.
          </p>

          <button
            onClick={() => navigate("/stylize")}
            className="mt-8 px-7 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-105 transition"
          >
            Try Stylizing →
          </button>
        </motion.div>

        {/* RIGHT - ANIMATED STACK */}
        <div className="relative flex items-center justify-center h-[420px]">

          {/* CENTER IMAGE (MAIN) */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[260px] h-[340px] rounded-2xl overflow-hidden border border-cyan-400/30 shadow-xl z-20"
          >
            <img src="/demo-2.jpg" className="w-full h-full object-cover" />
          </motion.div>

          {/* LEFT FLOATING */}
          <motion.div
            animate={{ y: [0, 15, 0], rotate: [-6, -8, -6] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute left-0 w-[200px] h-[260px] rounded-2xl overflow-hidden border border-white/10 opacity-80"
          >
            <img src="/out-3-d-van.jpg" className="w-full h-full object-cover" />
          </motion.div>

          {/* RIGHT FLOATING */}
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [6, 8, 6] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute right-0 w-[200px] h-[260px] rounded-2xl overflow-hidden border border-white/10 opacity-80"
          >
            <img src="/out-2-c-van.jpg" className="w-full h-full object-cover" />
          </motion.div>

          {/* BACK IMAGE */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute w-[240px] h-[320px] rounded-2xl overflow-hidden border border-white/5 opacity-40 blur-[1px]"
          >
            <img src="/demo/before.jpg" className="w-full h-full object-cover" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;