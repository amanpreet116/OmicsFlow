"use client";

import React, { useState } from "react";
import { Trash2, ArrowRight } from "lucide-react";

const mockHistory = [
  {
    id: "1",
    title: "Discussed gene analysis results",
    preview: "Let's look deeper into the omics pathway data...",
    date: "2024-06-28 15:22",
  },
  {
    id: "2",
    title: "Pharma literature summary",
    preview: "Can you summarize key drug trials for condition X...",
    date: "2024-06-27 19:08",
  },
  // ...more items
];

export default function HistoryPage() {
  const [history, setHistory] = useState(mockHistory);

  const handleDelete = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRead = (id: string) => {
    // e.g., route to `/chat/${id}` or open modal
    alert("Read chat: " + id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e0e11] via-[#131417] to-[#232313] p-4 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold bg-gradient-to-r from-yellow-400 to-yellow-100 bg-clip-text text-transparent tracking-wide">
          History
        </h1>
        <button
          className="text-xs px-3 py-1.5 bg-black/25 border border-yellow-400/30 text-yellow-200 rounded-md hover:bg-yellow-400/10"
          disabled={history.length === 0}
          onClick={() => setHistory([])}
        >
          Delete All
        </button>
      </div>

      {/* History List */}
      <div className="space-y-3">
        {history.length > 0 ? (
          history.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-2 p-4 rounded-xl border border-yellow-400/15 bg-[rgba(30,30,35,0.68)] backdrop-blur-md shadow hover:shadow-lg transition group"
            >
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-yellow-100 text-[13px] font-medium truncate">{item.title}</span>
                <span className="text-yellow-100/70 text-[12px] truncate">{item.preview}</span>
                <span className="text-yellow-100/40 text-[11px] mt-1">{item.date}</span>
              </div>
              <div className="flex items-center gap-2 ml-3">
               
                <button
                  className="p-2 rounded-md hover:bg-yellow-400/20 transition"
                  aria-label="Delete history"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 size={14} className="text-yellow-300 hover:text-yellow-400" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-yellow-100/70 text-[14px] text-center mt-20">
            No chat history found.
          </div>
        )}
      </div>
    </div>
  );
}
