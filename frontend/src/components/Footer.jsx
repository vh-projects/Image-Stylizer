import React from "react";

const Footer = () => {
  return (
    <footer className="mt-12 pb-2 w-full border-t border-white/10 pt-6 text-center text-gray-400 text-sm">
      <p>
        © {new Date().getFullYear()} AI Image Stylizer · Built with{" "}
        <span className="text-pink-400">♥</span> using FastAPI + React
      </p>
      <div className="mt-2 flex justify-center gap-6">
        <a
          href="https://github.com/your-username/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/your-profile/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition"
        >
          LinkedIn
        </a>
        <a
          href="mailto:your@email.com"
          className="hover:text-white transition"
        >
          Contact
        </a>
      </div>
    </footer>
  );
};

export default Footer;
