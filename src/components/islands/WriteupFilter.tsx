import { useState, useEffect, useMemo } from 'preact/hooks';
import { withBase } from '../../data/paths';

export interface WriteupItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  formattedDate: string;
  event: string;
  category: 'reverse' | 'forensics' | 'misc' | 'crypto' | 'web' | 'pwn';
  difficulty: 'easy' | 'medium' | 'hard' | 'insane';
  points?: number;
  tools: string[];
}

interface WriteupFilterProps {
  initialWriteups: WriteupItem[];
}

const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'reverse', label: 'Reverse Engineering' },
  { id: 'forensics', label: 'Digital Forensics' },
  { id: 'pwn', label: 'Binary Exploitation' },
  { id: 'crypto', label: 'Cryptography' },
  { id: 'web', label: 'Web Security' },
  { id: 'misc', label: 'Misc' },
];

const DIFFICULTIES = [
  { id: 'all', label: 'All Difficulties' },
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
  { id: 'insane', label: 'Insane' },
];

export default function WriteupFilter({ initialWriteups }: WriteupFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  // Read initial query params from window.location on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      const diff = params.get('difficulty');
      const q = params.get('q');
      if (cat) setSelectedCategory(cat);
      if (diff) setSelectedDifficulty(diff);
      if (q) setSearchQuery(q);
    }
  }, []);

  // Sync state to URL params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.set('category', selectedCategory);
      if (selectedDifficulty !== 'all') params.set('difficulty', selectedDifficulty);
      if (searchQuery.trim()) params.set('q', searchQuery.trim());
      const queryString = params.toString();
      const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  // Filtered writeup collection
  const filteredWriteups = useMemo(() => {
    return initialWriteups.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && item.difficulty !== selectedDifficulty) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = item.title.toLowerCase().includes(query);
        const inDesc = item.description.toLowerCase().includes(query);
        const inEvent = item.event.toLowerCase().includes(query);
        const inTools = item.tools.some((t) => t.toLowerCase().includes(query));

        if (!inTitle && !inDesc && !inEvent && !inTools) {
          return false;
        }
      }

      return true;
    });
  }, [initialWriteups, selectedCategory, selectedDifficulty, searchQuery]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy':
        return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'medium':
        return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      case 'hard':
        return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
      case 'insane':
        return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
      default:
        return 'text-slate-400 border-slate-500/30 bg-slate-500/10';
    }
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'reverse':
        return { label: 'REVERSE', color: 'text-[var(--color-accent)] border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10' };
      case 'forensics':
        return { label: 'FORENSICS', color: 'text-[var(--color-accent-2)] border-[var(--color-accent-2)]/30 bg-[var(--color-accent-2)]/10' };
      default:
        return { label: cat.toUpperCase(), color: 'text-slate-300 border-slate-700 bg-slate-800' };
    }
  };

  return (
    <div class="space-y-6">
      {/* Controls Container */}
      <div class="cyber-panel p-4 sm:p-6 space-y-4">
        {/* Search Bar Input */}
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[var(--color-text-muted)]">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={searchQuery}
            onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
            placeholder="Search writeups by keyword, tool (Ghidra, Volatility), CVE, technique..."
            class="w-full pl-10 pr-4 py-2.5 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] placeholder-[var(--color-text-dim)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] text-sm font-mono transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Categories Pills */}
        <div class="space-y-2">
          <div class="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
            Category
          </div>
          <div class="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  class={`px-3 py-1 text-xs font-mono rounded-md border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[var(--color-accent)] text-[#0b0f14] border-[var(--color-accent)] font-bold shadow-sm'
                      : 'bg-[var(--color-surface-hover)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-border-glow)]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div class="space-y-2 pt-2 border-t border-[var(--color-border)]">
          <div class="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] font-semibold">
            Difficulty
          </div>
          <div class="flex flex-wrap gap-1.5">
            {DIFFICULTIES.map((diff) => {
              const isActive = selectedDifficulty === diff.id;
              return (
                <button
                  key={diff.id}
                  type="button"
                  onClick={() => setSelectedDifficulty(diff.id)}
                  class={`px-2.5 py-1 text-xs font-mono rounded border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[var(--color-accent-2)] text-[#0b0f14] border-[var(--color-accent-2)] font-bold'
                      : 'bg-[var(--color-surface-hover)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {diff.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Filter Summary Bar */}
        {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
          <div class="flex items-center justify-between pt-3 border-t border-[var(--color-border)] text-xs font-mono">
            <span class="text-[var(--color-text-muted)]">
              Showing <strong class="text-[var(--color-accent)]">{filteredWriteups.length}</strong> of {initialWriteups.length} writeups
            </span>
            <button
              type="button"
              onClick={resetFilters}
              class="text-[var(--color-danger)] hover:underline font-semibold cursor-pointer"
            >
              Reset All Filters ✕
            </button>
          </div>
        )}
      </div>

      {/* Writeup Cards Grid */}
      {filteredWriteups.length === 0 ? (
        <div class="cyber-panel p-12 text-center space-y-3">
          <div class="text-3xl font-mono text-[var(--color-text-dim)]">[!] NO_RESULTS</div>
          <p class="text-sm text-[var(--color-text-muted)] max-w-md mx-auto">
            No CTF writeups matched your current search filters. Try broadening your query or clearing filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            class="mt-2 px-4 py-2 bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/25 text-[var(--color-accent)] text-xs font-mono font-semibold rounded cursor-pointer transition-colors"
          >
            Clear Filter Parameters
          </button>
        </div>
      ) : (
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredWriteups.map((w) => {
            const catBadge = getCategoryBadge(w.category);
            const diffColor = getDifficultyColor(w.difficulty);

            return (
              <a
                key={w.id}
                href={withBase(`/writeups/${w.slug}`)}
                class="group cyber-panel p-5 flex flex-col justify-between hover:border-[var(--color-accent)]/50 transition-all duration-200 hover:-translate-y-1 block"
              >
                <div>
                  {/* Top Metadata Badges */}
                  <div class="flex items-center justify-between gap-2 mb-3">
                    <div class="flex items-center gap-2">
                      <span class={`px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider rounded border ${catBadge.color}`}>
                        {catBadge.label}
                      </span>
                      <span class={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded border ${diffColor}`}>
                        {w.difficulty}
                      </span>
                    </div>
                    {w.points && (
                      <span class="text-xs font-mono font-bold text-[var(--color-accent)]">
                        {w.points} pts
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 class="font-mono font-bold text-base text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2 mb-2">
                    {w.title}
                  </h3>

                  {/* Description */}
                  <p class="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-3 mb-4">
                    {w.description}
                  </p>
                </div>

                <div>
                  {/* Tools */}
                  <div class="flex flex-wrap gap-1 mb-3">
                    {w.tools.map((tool) => (
                      <span key={tool} class="px-1.5 py-0.5 text-[10px] font-mono bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)] rounded">
                        ⚙️ {tool}
                      </span>
                    ))}
                  </div>

                  {/* Footer Event & Date */}
                  <div class="flex items-center justify-between text-[11px] font-mono text-[var(--color-text-dim)] pt-3 border-t border-[var(--color-border)]">
                    <span class="truncate max-w-[60%] text-[var(--color-text-muted)]">
                      🏆 {w.event}
                    </span>
                    <span>{w.formattedDate}</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
