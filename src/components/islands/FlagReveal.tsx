import { useState } from 'preact/hooks';

interface FlagRevealProps {
  flag: string;
  label?: string;
}

export default function FlagReveal({ flag, label = 'Challenge Flag' }: FlagRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const maskedText = flag.replace(/([^{}])/g, (c, _p1, offset) => {
    // Keep CTF prefix format visible, mask the inside
    const braceIndex = flag.indexOf('{');
    if (braceIndex === -1 || offset <= braceIndex || offset === flag.length - 1) {
      return c;
    }
    return '•';
  });

  const handleCopy = (e: MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(flag);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div class="my-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-lg">
      <div class="flex items-center justify-between gap-2 border-b border-[var(--color-border)] pb-2 mb-3">
        <div class="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-accent)]">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
          </svg>
          <span>{label}</span>
        </div>
        <span class="text-[11px] font-mono text-[var(--color-text-muted)]">
          {revealed ? 'Unlocked' : 'Click to Decrypt'}
        </span>
      </div>

      <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[var(--color-bg)] rounded-md border border-[var(--color-border)] p-3">
        <button
          type="button"
          onClick={() => setRevealed(!revealed)}
          class="flex-1 text-left font-mono text-sm break-all focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] rounded px-1 transition-colors cursor-pointer"
          title={revealed ? 'Click to hide flag' : 'Click to reveal flag'}
        >
          {revealed ? (
            <span class="text-[var(--color-accent)] font-semibold select-all">
              {flag}
            </span>
          ) : (
            <span class="text-[var(--color-text-muted)] hover:text-[var(--color-text)] select-none">
              {maskedText}
            </span>
          )}
        </button>

        <div class="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setRevealed(!revealed)}
            class="px-3 py-1.5 text-xs font-mono rounded border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] text-[var(--color-text)] transition-colors cursor-pointer"
          >
            {revealed ? 'Hide' : 'Reveal'}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            class={`px-3 py-1.5 text-xs font-mono font-semibold rounded border transition-all cursor-pointer ${
              copied
                ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                : 'border-[var(--color-accent)]/50 bg-[var(--color-accent)]/10 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/20'
            }`}
          >
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}
