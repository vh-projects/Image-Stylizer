
// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="mt-20 w-full border-t border-white/10 bg-white/5 backdrop-blur-xl">

//       <div className="max-w-6xl mx-auto px-6 py-10">

//         {/* TOP SECTION */}
//         <div className="grid md:grid-cols-3 gap-10 text-sm">

//           {/* BRAND */}
//           <div>
//             <h2 className="text-white text-lg font-semibold">
//               AI Image Stylizer
//             </h2>
//             <p className="text-gray-400 mt-3 leading-relaxed">
//               Transform everyday images into artistic visuals using
//               AI-powered style transfer models trained on different domains.
//             </p>
//           </div>

//           {/* NAVIGATION */}
//           <div>
//             <h3 className="text-white font-medium mb-3">Explore</h3>
//             <ul className="space-y-2 text-gray-400">
//               <li>
//                 <a href="/" className="hover:text-white transition">
//                   Home
//                 </a>
//               </li>
//               <li>
//                 <a href="/stylize" className="hover:text-white transition">
//                   Stylize
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* SOCIAL / CONTACT */}
//           <div>
//             <h3 className="text-white font-medium mb-3">Connect</h3>
//             <div className="flex flex-col gap-2 text-gray-400">
//               <a
//                 href="https://github.com/your-username/your-repo"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-white transition"
//               >
//                 GitHub
//               </a>
//               <a
//                 href="https://www.linkedin.com/in/your-profile/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-white transition"
//               >
//                 LinkedIn
//               </a>
//               <a
//                 href="mailto:your@email.com"
//                 className="hover:text-white transition"
//               >
//                 Contact
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* DIVIDER */}
//         <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

//         {/* BOTTOM */}
//         <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">

//           <p>
//             © {new Date().getFullYear()} AI Image Stylizer
//           </p>

//           <p className="mt-2 md:mt-0">
//             Built with <span className="text-pink-400">♥</span> using FastAPI & React
//           </p>

//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;








import React from "react";
import { motion } from "framer-motion";

const GIT = import.meta.env.VITE_GITHUB_REPO;
const LINKED = import.meta.env.VITE_LINKEDIN_SOURCE;



const Footer = () => {

  return (
    <footer className="relative mt-2 w-full overflow-hidden border-t border-white/10">

      {/* BACKGROUND FLOATING WORDS */}
      <div className="absolute inset-0 flex flex-wrap justify-center items-center gap-6 opacity-5 text-white text-lg pointer-events-none">
        {["texture", "color", "depth", "style", "transform", "light"].map(
          (word, i) => (
            <span key={i}>{word}</span>
          )
        )}
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-16 text-center">

        {/* MAIN LINE */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-semibold text-white leading-relaxed"
        >
          Every image has a hidden style. <br />
          <span className="text-gray-400">
            You just bring it out.
          </span>
        </motion.h2>

        {/* SUBTEXT */}
        <p className="text-gray-500 mt-6 max-w-xl mx-auto text-sm">
          Built to explore how AI can reinterpret visuals through artistic
          transformations trained across different domains.
        </p>

        {/* LINKS */}
        <div className="mt-8 flex justify-center gap-8 text-sm text-gray-400">
          <a
            href={GIT}
            target="_blank"
            className="hover:text-white transition"
          >
            GitHub
          </a>

          <a
            href={LINKED}
            target="_blank"
            className="hover:text-white transition"
          >
            LinkedIn
          </a>

          <a
            href="/"
            className="hover:text-white transition"
          >
            Contact
          </a>
        </div>

        {/* BOTTOM LINE */}
        <p className="mt-10 text-xs text-gray-600">
          © {new Date().getFullYear()} AI Image Stylizer
        </p>
      </div>
    </footer>
  );
};

export default Footer;  

