"use client";

import { useState } from "react";

export default function SlangSearch({ targetId, total }: { targetId: string; total: number }) {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(total);

  function applyFilter(value: string) {
    setQuery(value);
    const needle = value.trim().toLowerCase();
    const root = document.getElementById(targetId);
    if (!root) return;
    let shown = 0;
    root.querySelectorAll<HTMLElement>("[data-slang-section]").forEach((section) => {
      let sectionShown = 0;
      section.querySelectorAll<HTMLElement>("[data-slang-term]").forEach((item) => {
        const match = !needle || (item.dataset.slangTerm ?? "").includes(needle);
        item.hidden = !match;
        if (match) sectionShown++;
      });
      section.hidden = sectionShown === 0;
      shown += sectionShown;
    });
    setVisible(shown);
  }

  return (
    <div role="search" className="mb-8">
      <label htmlFor="slang-search" className="block text-sm font-medium text-white mb-2">
        Search slang terms
      </label>
      <input
        id="slang-search"
        type="search"
        value={query}
        onChange={(e) => applyFilter(e.target.value)}
        placeholder="Try “rizz” or “skibidi”"
        autoComplete="off"
        className="w-full rounded-lg bg-white/[0.04] border border-white/15 px-4 py-3 text-white placeholder:text-[#8a8a94] focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
      />
      <p role="status" aria-live="polite" className="mt-2 text-sm text-[#ababab]">
        {query.trim()
          ? `${visible} ${visible === 1 ? "term matches" : "terms match"} “${query.trim()}”`
          : `${total} terms`}
      </p>
    </div>
  );
}
