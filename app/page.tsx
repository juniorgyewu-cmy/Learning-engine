"use client";
import { useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [lyrics, setLyrics] = useState("");

  const generateLyrics = async () => {
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes }),
      });

      const data = await res.json();

      if (data.error) {
        setLyrics("Error: " + data.error);
        return;
      }

      setLyrics(data.lyrics);
    } catch (err) {
      setLyrics("Something went wrong");
    }
  };

  return (
    <main className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-4">🎧 LearnTune AI</h1>
      <p className="mb-4">
        Turn your study notes into lyrics for easy learning.
      </p>

      <textarea
        className="border p-3 w-full max-w-xl"
        rows={4}
        placeholder="Paste your notes..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <br />

      <button
        onClick={generateLyrics}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
      >
        Generate Lyrics
      </button>

      {lyrics && (
        <div className="mt-6 border p-4 max-w-xl mx-auto">
          <h2 className="font-bold mb-2">Generated Lyrics:</h2>
          <p>{lyrics}</p>
        </div>
      )}
    </main>
  );
}