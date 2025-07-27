// components/PayloadForm.tsx
"use client";

import { useState } from "react";

export default function PayloadForm() {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState<"Beginner" | "Advanced">("Beginner");
  const [payloads, setPayloads] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const res = await fetch("/api/generate-payload", {
      method: "POST",
      body: JSON.stringify({ prompt, mode }),
    });
    const data = await res.json();
    setPayloads(data.payloads);
    setLoading(false);
  };

  const saveToFile = () => {
    const blob = new Blob([payloads.join("\n")], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "payloadsmith-output.txt";
    link.click();
  };

  return (
    <div className="w-full max-w-xl space-y-5 p-4 bg-[#111] border border-gray-700 rounded-xl shadow-md">
      <textarea
        placeholder="💬 e.g. Reflected XSS on login form"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-full h-24 p-3 bg-black text-green-400 border border-gray-600 rounded-md font-mono placeholder:text-gray-500 resize-none"
      />
      <div className="flex justify-between items-center">
        <label className="text-sm text-gray-300 flex items-center gap-2">
          <input
            type="checkbox"
            checked={mode === "Advanced"}
            onChange={() =>
              setMode((prev) => (prev === "Beginner" ? "Advanced" : "Beginner"))
            }
          />
          {mode} Mode
        </label>
        <button
          onClick={generate}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 transition-all text-white px-4 py-2 rounded-md font-bold shadow-sm"
        >
          {loading ? "Generating..." : "🎯 Generate Payloads"}
        </button>
      </div>

      <div className="bg-black p-4 rounded-md border border-gray-700 overflow-y-auto max-h-64">
        {payloads.length === 0 && (
          <p className="text-gray-500 italic">Your payloads will appear here...</p>
        )}
        <ul className="list-decimal pl-5 text-green-400 font-mono space-y-1 text-sm">
          {payloads.map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      </div>

      {payloads.length > 0 && (
        <div className="text-right">
          <button
            onClick={saveToFile}
            className="mt-2 text-xs text-gray-400 hover:text-white underline"
          >
            💾 Save to file
          </button>
        </div>
      )}
    </div>
  );
}
