import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState("Pink");
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("color", color);

    const response = await axios.post("https://boulder-hold-isolater-backend.onrender.com", formData, {
      responseType: "blob",
    });

    const imageUrl = URL.createObjectURL(response.data);
    setResult(imageUrl);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Climbing Hold Isolator</h1>
      <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
      <select value={color} onChange={e => setColor(e.target.value)} className="my-4 block">
        {["Pink", "Green", "Blue", "Black", "White", "Yellow"].map(c => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
        Process Image
      </button>
      {result && (
        <div className="mt-4">
          <img src={result} alt="Processed" className="rounded border" />
        </div>
      )}
    </div>
  );
}
