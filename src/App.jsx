import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState("Pink");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!image) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("color", color);

    try {
      const response = await axios.post(
        "https://YOUR-BACKEND-URL.onrender.com/isolate",
        formData,
        { responseType: "blob" }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setResult(imageUrl);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = result;
    link.download = "climbing-hold-result.png";
    link.click();
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Climbing Hold Isolator</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-4"
      />

      <select
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="mb-4 block mx-auto px-4 py-2 border rounded"
      >
        {["Pink", "Green", "Blue", "Black", "White", "Yellow"].map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Process Image
      </button>

      {loading && (
        <div className="mt-4 text-lg text-gray-700">
          <span className="animate-pulse">Processing image...</span>
        </div>
      )}

      {result && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2 text-lg">Final Image:</h2>
          <img src={result} alt="Processed result" className="rounded border shadow-lg mx-auto" />
          <button
            onClick={handleDownload}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
}
