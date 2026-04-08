// StylizePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_BASE = import.meta.env.VITE_API_URL;

const StylizePage = () => {
  const [file, setFile] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [styleOptions, setStyleOptions] = useState([]);
  const [stylizedImg, setStylizedImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");

  // 🔥 Generate descriptions based on category + style
  const generateDescription = (category, style) => {
    const descriptions = {
      "human-face": {
        "van-gogh":
          "Enhances facial features with bold brush strokes and deep emotional contrast, creating a dramatic portrait-like effect.",
        "claude-monet":
          "Softens skin tones with gentle lighting and pastel hues, giving a calm, impressionist portrait feel.",
      },

      cars: {
        "van-gogh":
          "Transforms vehicles with dynamic strokes and vivid colors, adding energy and motion to metallic surfaces.",
        "claude-monet":
          "Applies soft reflections and diffused lighting, creating a dreamy, atmospheric automotive scene.",
      },

      cats: {
        "van-gogh":
          "Adds rich texture to fur with expressive strokes, highlighting depth and intensity in feline features.",
        "claude-monet":
          "Blends soft tones and light, giving cats a calm, painterly and serene appearance.",
      },

      dogs: {
        "van-gogh":
          "Emphasizes fur texture and expression with bold strokes, giving dogs a lively and emotional character.",
        "claude-monet":
          "Smoothens details with gentle light and color blending, creating a warm and peaceful visual tone.",
      },

      landscape: {
        "van-gogh":
          "Enhances scenery with dramatic skies and swirling textures, bringing energy and movement to landscapes.",
        "claude-monet":
          "Applies soft light and natural color blending, creating a tranquil and impressionist landscape effect.",
      },
    };

    return (
      descriptions[category]?.[style] ||
      "AI-powered artistic transformation tailored for this style."
    );
  };


  const generateShortLabel = (category, style) => {
    const styleMap = {
      "van-gogh": "VG",
      "claude-monet": "CM",
    };

    const categoryMap = {
      "human-face": "H-F",
      "cars": "C",
      "cats": "CT",
      "dogs": "D",
      "landscape": "L",
    };

    return `${styleMap[style] || style} ${categoryMap[category] || category}`;
  };

  const simulateProgress = () => {
    let value = 0;

    const stages = [
      { at: 15, text: "Uploading image..." },
      { at: 35, text: "Loading AI model..." },
      { at: 65, text: "Applying style..." },
      { at: 90, text: "Refining details..." },
    ];

    const interval = setInterval(() => {
      value += Math.random() * 4;

      const current = stages.find((s) => value < s.at);
      if (current) setStage(current.text);

      if (value >= 95) value = 95;

      setProgress(Math.floor(value));
    }, 500);

    return interval;
  };

  // 🔥 Fetch + flatten backend JSON
  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/styles`);
        const data = res.data;

        const flattened = [];

        Object.keys(data).forEach((category) => {
          Object.keys(data[category]).forEach((style) => {
            flattened.push({
              id: `${category}-${style}`,
              category,
              style,
              // label: `${style.replace("-", " ")} (${category})`,
              label: generateShortLabel(category, style),
              description: generateDescription(category, style),
            });
          });
        });

        setStyleOptions(flattened);
        setSelectedStyle(flattened[0]);
      } catch (err) {
        setError("Failed to load styles.");
      }
    };

    fetchStyles();
  }, []);

  // Upload
  // const handleUpload = async () => {
  //   if (!file || !selectedStyle) return;

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("category", selectedStyle.category);
  //   formData.append("style", selectedStyle.style);

  //   setLoading(true);
  //   setError("");

  //   try {
  //     const res = await axios.post(`${API_BASE}/api/stylize`, formData);
  //     setStylizedImg(res.data.image_url);
  //   } catch (err) {
  //     setError("Model not available or error occurred.");
  //   }

  //   setLoading(false);
  // };


  const handleUpload = async () => {
    if (!file || !selectedStyle) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", selectedStyle.category);
    formData.append("style", selectedStyle.style);

    setLoading(true);
    setStylizedImg(null);
    setError("");

    setProgress(0);
    setStage("Starting...");

    const interval = simulateProgress();

    try {
      const res = await axios.post(`${API_BASE}/api/stylize`, formData);

      clearInterval(interval);
      setProgress(100);
      setStage("Finalizing...");

      setTimeout(() => {
        setStylizedImg(res.data.image_url);
        setLoading(false);
      }, 800);
    } catch (err) {
      clearInterval(interval);
      setLoading(false);
      setError("Something went wrong.");
    }
  };


  // Download image
  const handleDownload = async () => {
    try {
      const response = await fetch(stylizedImg);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "stylized-image.jpg";

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Download failed", err);
    }
  };



  return (
    <div className="min-h-screen bg-[#050505] text-white px-6 py-20">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto text-center mt-5 mb-16">


        <h2 className="text-5xl md:text-6xl font-black tracking-tight"> Stylize{" "}
          <span className="text-5xl mt-5 font-bold">Your </span>
          <span className="italic font-light">Images </span>
        </h2>



        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Choose a preset tailored for your image type. Each model is trained
          specifically for different subjects to produce better results.
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="max-w-4xl mx-auto mb-6 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400">
          {error}
        </div>
      )}

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* LEFT */}
        <div className="space-y-8">

          {/* UPLOAD */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg mb-3">Upload Image</h2>

            <label className="flex items-center justify-center h-20 border border-dashed border-white/20 rounded-xl cursor-pointer hover:border-cyan-400 transition">
              <p className="text-gray-400 text-sm">
                Click or drag image here
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>

          {/* STYLE PRESETS */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg mb-4">Choose Style</h2>

            <div className="grid grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1">
              {styleOptions.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => setSelectedStyle(opt)}
                  className={`p-3 rounded-xl border cursor-pointer transition ${selectedStyle?.id === opt.id
                    ? "border-cyan-400 bg-cyan-500/10"
                    : "border-white/10 hover:border-white/30"
                    }`}
                >
                  <span className="text-sm px-[7px] rounded-[5px] bg-[#4381C1] font-medium capitalize">
                    {opt.label}
                  </span>
                  <p className="text-xs text-gray-500">
                    {opt.style.replace("-", " ")} • {opt.category}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {opt.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:scale-[1.02] cursor-pointer transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Generate Image"}
          </button>
        </div>

        {/* RIGHT */}
        {/* <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

          <h2 className="text-lg mb-4">Preview</h2>

          <div className="space-y-6">


            <div>
              <p className="text-xs text-gray-500 mb-2">Original</p>
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  className="rounded-xl w-full max-h-[250px] object-contain"
                />
              ) : (
                <p className="text-gray-500 text-sm">No image uploaded</p>
              )}
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-2">Stylized</p>
              {stylizedImg ? (
                <motion.img
                  src={stylizedImg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl w-full max-h-[250px] object-contain"
                />
              ) : (
                <p className="text-gray-500 text-sm">Not generated yet</p>
              )}
            </div>

          </div>


          {stylizedImg && (
            <button
              onClick={handleDownload}
              className="mt-6 w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 cursor-pointer text-white hover:scale-[1.02]"
            >
              Download Image
            </button>
          )}

        </div> */}






        {/* RIGHT */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

          <h2 className="text-lg mb-4">Preview</h2>

          <div className="space-y-6">

            {/* ORIGINAL */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Original</p>
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  className="rounded-xl w-full max-h-[250px] object-contain"
                />
              ) : (
                <p className="text-gray-500 text-sm">No image uploaded</p>
              )}
            </div>

            {/* STYLIZED */}
            <div>
              <p className="text-xs text-gray-500 mb-2">Stylized</p>

              {/* 🔥 LOADING STATE */}
              {loading && (
                <div className="space-y-4">

                  {/* Animated placeholder */}
                  <motion.div
                    className="w-full h-[200px] rounded-xl bg-white/5"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                      animate={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Stage text */}
                  <p className="text-sm text-gray-400 text-center">
                    {stage} ({progress}%)
                  </p>
                </div>
              )}

              {/* 🔥 RESULT */}
              {!loading && stylizedImg && (
                <motion.img
                  src={stylizedImg}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.8 }}
                  className="rounded-xl w-full max-h-[250px] object-contain"
                />
              )}

              {/* EMPTY */}
              {!loading && !stylizedImg && (
                <p className="text-gray-500 text-sm">Not generated yet</p>
              )}
            </div>

          </div>

          {/* DOWNLOAD */}
          {stylizedImg && (
            <button
              onClick={handleDownload}
              className="mt-6 w-full py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-[1.02]"
            >
              Download Image
            </button>
          )}
        </div>




      </div>
    </div>
  );
};

export default StylizePage;