
// // UploadForm.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

// const UploadForm = () => {
//   const [file, setFile] = useState(null);
//   const [stylizedUrl, setStylizedUrl] = useState(null); // object URL for display/download
//   const [loading, setLoading] = useState(false);
//   const [category, setCategory] = useState("defaultCategory"); // change to your real categories
//   const [style, setStyle] = useState("defaultStyle");       // change to your real styles

//   // cleanup object URL on unmount or when replaced
//   useEffect(() => {
//     return () => {
//       if (stylizedUrl) URL.revokeObjectURL(stylizedUrl);
//     };
//   }, [stylizedUrl]);

//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return alert("Choose a file");

//     const fd = new FormData();
//     fd.append("file", file);
//     fd.append("category", category);
//     fd.append("style", style);

//     setLoading(true);
//     try {
//       // 1) send file -> backend
//       const res = await axios.post(`${API_BASE}/api/stylize`, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       // backend returns an absolute URL -> fetch as blob so we get real image bytes
//       const imageUrl = res.data.image_url;
//       const blobRes = await axios.get(imageUrl, { responseType: "blob" });

//       // object URL for display & reliable download
//       const objectUrl = URL.createObjectURL(blobRes.data);

//       // release previous URL if exists
//       if (stylizedUrl) URL.revokeObjectURL(stylizedUrl);

//       setStylizedUrl(objectUrl);
//     } catch (err) {
//       console.error("Upload or fetch failed:", err);
//       alert("Error processing image. Check console for details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold mb-4">Image Stylizer</h1>

//       <form onSubmit={handleUpload} className="flex flex-col items-center gap-3 p-6 bg-white shadow rounded-xl w-80">
//         <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="border p-2 rounded w-full" />

//         {/* Replace these selects with actual values from your models.json */}
//         <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded w-full">
//           <option value="defaultCategory">defaultCategory</option>
//           {/* map categories */}
//         </select>

//         <select value={style} onChange={(e) => setStyle(e.target.value)} className="border p-2 rounded w-full">
//           <option value="defaultStyle">defaultStyle</option>
//           {/* map styles */}
//         </select>

//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
//           {loading ? "Processing..." : "Stylize"}
//         </button>
//       </form>

//       {stylizedUrl && (
//         <div className="mt-6 text-center">
//           <img src={stylizedUrl} alt="Stylized" className="rounded-xl shadow-lg max-w-sm mx-auto" />
//           <a href={stylizedUrl} download="stylized.jpg" className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//             Download Image
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadForm;










// UploadForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // 🟢 for animation
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [stylizedUrl, setStylizedUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("defaultCategory");
  const [style, setStyle] = useState("defaultStyle");

  useEffect(() => {
    return () => {
      if (stylizedUrl) URL.revokeObjectURL(stylizedUrl);
    };
  }, [stylizedUrl]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Choose a file");

    const fd = new FormData();
    fd.append("file", file);
    fd.append("category", category);
    fd.append("style", style);

    setStylizedUrl(null);
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/stylize`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = res.data.image_url;
      const blobRes = await axios.get(imageUrl, { responseType: "blob" });
      const objectUrl = URL.createObjectURL(blobRes.data);

      if (stylizedUrl) URL.revokeObjectURL(stylizedUrl);
      setStylizedUrl(objectUrl);
    } catch (err) {
      console.error("Upload or fetch failed:", err);
      alert("Error processing image. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Image Stylizer</h1>

      <form
        onSubmit={handleUpload}
        className="flex flex-col items-center gap-3 p-6 bg-white shadow rounded-xl w-80"
      >
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded w-full"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="defaultCategory">defaultCategory</option>
        </select>

        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="defaultStyle">defaultStyle</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded w-full transition`}
        >
          {loading ? "Processing..." : "Stylize"}
        </button>
      </form>

      {/* 👇 Animated generation area */}
      {loading && (
        <div className="mt-6 flex flex-col items-center justify-center text-center">
          <motion.div
            className="w-64 h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl shadow-lg"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "400% 400%",
            }}
          />
          <motion.p
            className="mt-4 text-gray-600 text-lg font-medium"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Generating your stylized image...
          </motion.p>
        </div>
      )}

      {/* Show stylized image after generation */}
      {stylizedUrl && !loading && (
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={stylizedUrl}
            alt="Stylized"
            className="rounded-xl shadow-lg max-w-sm mx-auto"
          />
          <a
            href={stylizedUrl}
            download="stylized.jpg"
            className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Download Image
          </a>
        </motion.div>
      )}
    </div>
  );
};

export default UploadForm;
