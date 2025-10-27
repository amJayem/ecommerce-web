"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchProducts } from "@/hooks/useSearchProducts";
import { SearchResultsModal } from "./search-results-modal";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { results, isLoading, hasResults } = useSearchProducts(query, 500);

  // Open dropdown when there are results and query is not empty
  useEffect(() => {
    // Only show results if query is meaningful (at least 2 characters)
    if (query.trim().length >= 2 && (hasResults || isLoading)) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [hasResults, query, isLoading]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !hasResults) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            router.push(`/products/${results[selectedIndex].id}`);
            handleClose();
          }
          break;
        case "Escape":
          handleClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, hasResults, selectedIndex, results, router]);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleChange = (value: string) => {
    setQuery(value);
    setSelectedIndex(-1);
  };

  const handleFocus = () => {
    if (query.trim().length >= 2 && (hasResults || isLoading)) {
      setIsOpen(true);
    }
  };

  const handleClear = () => {
    setQuery("");
    handleClose();
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query)}`);
      handleClose();
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`relative ${className}`}
        role="search"
      >
        <div ref={containerRef} className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 
          text-gray-400 h-4 w-4 z-10"
          />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={handleFocus}
            className="pl-10 pr-10 rounded-full border-gray-300 focus-visible:ring-0
             focus-visible:ring-offset-0 text-sm bg-white h-9 w-full min-w-0 
             rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] 
             outline-none"
            aria-label="Search products"
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-controls="search-results"
            role="combobox"
          />
          <div id="search-results" className="sr-only">
            Search results for {query}
          </div>
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 
              text-gray-400 hover:text-gray-600 z-10"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {/* Dropdown Results */}
      <SearchResultsModal
        query={query}
        results={results}
        isLoading={isLoading}
        isOpen={isOpen}
        onClose={handleClose}
        selectedIndex={selectedIndex}
        parentRef={containerRef as React.RefObject<HTMLDivElement>}
      />
    </>
  );
}
