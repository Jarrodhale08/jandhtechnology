"use client";

import Link from "next/link";
import { useId, useMemo, useRef, useState } from "react";

type SearchEntry = { term: string; slug: string; key: string };

const MAX_RESULTS = 40;

function fold(value: string): string {
  return value.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

export default function SlangSearch({ total }: { total: number }) {
  const [query, setQuery] = useState("");
  const [folded, setFolded] = useState<SearchEntry[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const loading = useRef(false);
  const inputId = useId();
  const statusId = useId();
  const needle = fold(query);

  function load() {
    if (folded || loading.current) return;
    loading.current = true;
    fetch("/slang-index.json")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((rows: [string, string][]) => {
        setLoadError(false);
        setFolded(rows.map(([term, slug]) => ({ term, slug, key: fold(term) })));
      })
      .catch(() => {
        loading.current = false;
        setLoadError(true);
      });
  }

  const matches = useMemo(() => {
    if (!needle || !folded) return [];
    const starts = folded.filter((e) => e.key.startsWith(needle));
    const contains = folded.filter((e) => !e.key.startsWith(needle) && e.key.includes(needle));
    return [...starts, ...contains];
  }, [folded, needle]);
  const shown = matches.slice(0, MAX_RESULTS);

  let status = `Type to search ${total.toLocaleString("en-US")} slang term names.`;
  if (needle && loadError) {
    status = "Search could not load. Browse the A–Z letters below instead.";
  } else if (needle && !folded) {
    status = "Loading terms…";
  } else if (needle) {
    status =
      matches.length === 0
        ? `No terms match “${query.trim()}”.`
        : `${matches.length} ${matches.length === 1 ? "term matches" : "terms match"} “${query.trim()}”${
            matches.length > MAX_RESULTS ? `. Showing the first ${MAX_RESULTS}.` : "."
          }`;
  }

  return (
    <div role="search" aria-label="Slang terms" className="mb-10">
      <label htmlFor={inputId} className="block text-sm font-medium text-white mb-2">
        Search slang terms
      </label>
      <input
        id={inputId}
        type="search"
        value={query}
        onFocus={load}
        onChange={(e) => {
          load();
          setQuery(e.target.value);
        }}
        placeholder="Try “rizz” or “skibidi”"
        autoComplete="off"
        spellCheck={false}
        aria-describedby={statusId}
        className="w-full rounded-lg bg-white/[0.04] border border-white/40 px-4 py-3 text-white placeholder:text-[#a4a4ae]"
      />
      <p id={statusId} role="status" aria-live="polite" className="mt-2 text-sm text-[#c4c4cc]">
        {status}
      </p>
      {shown.length > 0 && (
        <ul aria-label="Matching slang terms" className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1">
          {shown.map((e) => (
            <li key={e.slug} className="min-w-0">
              <Link
                href={`/slang/${e.slug}`}
                prefetch={false}
                className="inline-flex min-h-8 items-center break-words text-[#e2e2e8] underline underline-offset-2 decoration-white/30 hover:text-white hover:decoration-white"
              >
                {e.term}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
