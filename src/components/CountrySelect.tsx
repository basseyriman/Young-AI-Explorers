"use client";

import { useState, useMemo, useCallback } from "react";
import { ALL_COUNTRIES, mergeCountryLists } from "@/data/countries";

export interface CountryOption {
  code: string;
  name: string;
  flag_emoji: string;
  is_featured?: boolean;
}

interface Props {
  countries: CountryOption[];
  name?: string;
  defaultValue?: string;
  required?: boolean;
  onChange?: (code: string) => void;
}

export function CountrySelect({ countries, name = "countryCode", defaultValue = "GB", required = true, onChange }: Props) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(defaultValue);
  const [listOpen, setListOpen] = useState(false);

  const allCountries = useMemo(
    () => mergeCountryLists(countries),
    [countries]
  );

  const featured = useMemo(() => allCountries.filter((c) => c.is_featured), [allCountries]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return allCountries;
    return allCountries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [allCountries, search]);

  const selectedCountry = allCountries.find((c) => c.code === selected);
  const showResults = listOpen || search.trim().length > 0;
  const visibleResults = search.trim() ? filtered : filtered.slice(0, 12);

  const pickCountry = useCallback((code: string) => {
    setSelected(code);
    setSearch("");
    setListOpen(false);
    onChange?.(code);
  }, [onChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filtered.length > 0) {
      e.preventDefault();
      pickCountry(filtered[0].code);
    }
    if (e.key === "Escape") {
      setSearch("");
      setListOpen(false);
    }
  };

  return (
    <div className="space-y-2">
      <input type="hidden" name={name} value={selected} required={required} />
      <div className="relative">
        <input
          type="text"
          placeholder={`Search ${allCountries.length}+ countries…`}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setListOpen(true);
          }}
          onFocus={() => setListOpen(true)}
          onKeyDown={handleKeyDown}
          className="flex h-12 w-full rounded-xl border-2 border-brand-purple/15 dark:border-brand-cream/25 bg-brand-warm dark:bg-brand-purple-dark px-4 text-sm font-medium text-brand-purple dark:text-brand-cream placeholder:text-brand-purple/40 dark:placeholder:text-brand-cream/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/40 dark:focus-visible:ring-brand-gold/60"
        />
      </div>
      {selectedCountry && !search && (
        <div className="flex items-center gap-2 h-12 px-4 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-sm font-semibold text-brand-purple dark:text-brand-cream">
          <span>{selectedCountry.flag_emoji}</span>
          <span>{selectedCountry.name}</span>
        </div>
      )}

      {showResults && (
        <div className="max-h-48 overflow-y-auto rounded-xl border border-brand-purple/10 dark:border-brand-gold/10 divide-y divide-brand-purple/5 dark:divide-brand-gold/5 bg-brand-surface dark:bg-brand-purple-dark/80 shadow-lg">
          {visibleResults.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => pickCountry(c.code)}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 text-brand-purple dark:text-brand-cream hover:bg-brand-purple/5 dark:hover:bg-brand-gold/5 transition-colors ${
                selected === c.code ? "bg-brand-gold/10 font-semibold" : ""
              }`}
            >
              <span>{c.flag_emoji}</span>
              <span>{c.name}</span>
              <span className="ml-auto text-xs text-brand-purple/40 dark:text-brand-cream/45">{c.code}</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="px-4 py-3 text-sm text-brand-purple/50 dark:text-brand-cream/50">No countries found — try a different spelling</p>
          )}
          {!search.trim() && filtered.length > 12 && (
            <p className="px-4 py-2 text-xs text-brand-purple/45 dark:text-brand-cream/45 border-t border-brand-purple/5 dark:border-brand-gold/5">
              Keep typing to search all {allCountries.length} countries
            </p>
          )}
        </div>
      )}
    </div>
  );
}
