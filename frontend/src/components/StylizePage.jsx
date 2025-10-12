import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";


const StylizePage = () => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [style, setStyle] = useState("");
  const [stylesData, setStylesData] = useState({});
  const [stylizedImg, setStylizedImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 


  // Fetch available categories/styles from backend
  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/styles`);
        setStylesData(res.data);

        // Auto-select first category & style
        const firstCategory = Object.keys(res.data)[0];
        setCategory(firstCategory || "");
        if (firstCategory) {
          const firstStyle = Object.keys(res.data[firstCategory])[0];
          setStyle(firstStyle || "");
        }
      } catch (err) {
        console.error("Error fetching styles:", err);
        setError("Failed to fetch available styles from server.");
      }
    };
    fetchStyles();
  }, []);



const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !category || !style) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", category);
    formData.append("style", style);

    setLoading(true);
    setError(""); // reset error

    try {
      const res = await axios.post(`${API_BASE}/api/stylize`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // setStylizedImg(`${API_BASE}${res.data.image_url}`);
      setStylizedImg(res.data.image_url);
    } 

    catch (err) {
      console.error(err);
      if (err.response?.status === 400 || err.response?.status === 404) {
        setError("Sorry. Model for this style is not available yet.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }

    setLoading(false);
  };



return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center mt-1.9 py-12 px-6">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold mb-10 font-['Unbounded'] text-transparent bg-clip-text bg-gradient-to-r from-secondary-navy to-accent-red">
        Stylize Your Image
      </h1>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 px-4 py-3 rounded-lg bg-red-600/80 text-white font-medium shadow-lg"
        >
          {error}
        </motion.div>
      )}

      {/* First Row: Upload + Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mb-10">
        {/* Upload Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/70 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg flex flex-col items-center"
        >
          <h2 className="text-xl font-semibold mb-4">Upload Image</h2>

          <label
            htmlFor="file-upload"
            className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-primary/80 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-gray-400 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-3 3m3-3l3 3M12 3v9"
              />
            </svg>
            <p className="text-gray-400 text-sm">
              Drag & drop or click to upload
            </p>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          {file && (
            <div className="mt-4 w-full flex flex-col items-center">
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-32 h-32 object-cover rounded-lg border border-white/10 shadow-md"
              />
              <p className="mt-2 text-gray-400 text-sm">{file.name}</p>
            </div>
          )}
        </motion.div>

        {/* Options Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gray-900/70 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-4">Choose Options</h2>

          {/* Category Select */}
          <label className="block mb-3">
            <span className="text-gray-400 text-sm">Category</span>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setStyle(""); // reset style when category changes
              }}
              className="mt-1 w-full p-2 rounded-lg bg-gray-800 border border-white/10 text-white focus:outline-none"
            >
              <option value="" disabled>
                Select Category
              </option>
              {Object.keys(stylesData).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>

          {/* Style Select */}
          <label className="block">
            <span className="text-gray-400 text-sm">Style</span>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="mt-1 w-full p-2 rounded-lg bg-gray-800 border border-white/10 text-white focus:outline-none"
              disabled={!category}
            >
              <option value="" disabled>
                {category ? "Select Style" : "Select category first"}
              </option>
              {category &&
                Object.keys(stylesData[category] || {}).map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
            </select>
          </label>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleUpload}
              disabled={loading || !file}
              className="mt-6 w-50 py-3 rounded-lg bg-gradient-to-r from-button-1 to-button-2 text-white font-semibold shadow-md hover:shadow-lg disabled:opacity-50"
            >
              {loading ? "Stylizing..." : "Stylize Image"}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Second Row: Preview Section */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="w-full max-w-5xl bg-gray-900/70 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Preview</h2>

        {!file && !stylizedImg && (
          <p className="text-gray-400 text-sm">Upload an image to preview</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {file && (
            <div>
              <p className="text-sm text-gray-400 mb-1">Original</p>
              <img
                src={URL.createObjectURL(file)}
                alt="Uploaded"
                className="rounded-lg w-full object-cover border border-white/10"
              />
            </div>
          )}

          {stylizedImg && (
            <div>
              <p className="text-sm text-gray-400 mb-1">Stylized</p>
              <img
                src={stylizedImg}
                alt="Stylized"
                className="rounded-lg w-full object-cover border border-white/10"
              />
              <a
                href={stylizedImg}
                download
                className="mt-3 inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium shadow hover:opacity-90"
              >
                Download Image
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );


  
};

export default StylizePage;
