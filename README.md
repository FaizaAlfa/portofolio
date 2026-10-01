# FAZer0 // Cybersecurity Portfolio & CTF Writeup Archive

> Personal cybersecurity portfolio and CTF writeup archive for **Faiza (FAZer0)** — Informatics Engineering undergraduate at Universitas Brawijaya specializing in **Reverse Engineering** and **Digital Forensics**.

Built with **Astro 5+**, **TypeScript (Strict)**, **Tailwind CSS**, **MDX**, and **Preact Islands**.

---

## 🚀 Key Features

- **Dark Terminal Aesthetics**: Sleek obsidian dark mode with matrix emerald (`#39ff88`) and cyber cyan (`#22d3ee`) accents, monospace typography, and cyber-panel card system.
- **Interactive Writeup Archive**: Real-time multi-facet filtering (Category, Difficulty, Tags/Techniques, Keywords) via Preact interactive island.
- **Interactive Flag Reveal**: Click-to-decrypt masked CTF flags (`CTF{••••••••}`) with 1-click clipboard copying.
- **Syntax Highlighting**: Shiki engine (`tokyo-night`) with support for C/C++, Assembly, Python, Bash, and automated copy-code buttons.
- **Content Collections**: Type-safe Zod-validated schemas for Writeups, Projects, and CTF tournament records.
- **Security Defaults**: Strict CSP headers, `security.txt` (RFC 9116), bot-protected email de-obfuscation, zero trackers.
- **SEO & Metadata**: JSON-LD `Person` schema, OpenGraph, Twitter Cards, canonical links, RSS feed, and XML sitemap.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Framework** | [Astro](https://astro.build) (Static Output) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) + CSS Custom Properties |
| **Content** | Astro Content Layer with Zod schemas |
| **Interactive** | Preact (`client:visible`) |
| **Code Highlighting** | Shiki (`tokyo-night`) |
| **SEO** | `@astrojs/rss`, `@astrojs/sitemap`, JSON-LD |

---

## 📁 Project Structure

```
├── public/
│   ├── .well-known/security.txt  # RFC 9116 Security Disclosure
│   ├── _headers                  # Edge CSP and security headers
│   ├── favicon.svg               # SVG favicon
│   ├── robots.txt                # SEO crawler directives
│   └── resume.pdf                # Downloadable PDF CV
├── src/
│   ├── components/
│   │   ├── Callout.astro         # MDX Note/Warning/Tip banners
│   │   ├── Footer.astro          # Site footer
│   │   ├── Navbar.astro          # Responsive navigation bar
│   │   └── islands/
│   │       ├── FlagReveal.tsx    # Click-to-reveal flag component
│   │       └── WriteupFilter.tsx # Dynamic search & category filter
│   ├── content/
│   │   ├── ctf/                  # CTF tournament history entries
│   │   ├── projects/             # Project showcase entries
│   │   └── writeups/             # CTF writeup MDX documents
│   ├── data/
│   │   ├── site.ts               # Central site configuration
│   │   ├── skills.ts             # Technical skills inventory
│   │   └── socials.ts            # Social links & profiles
│   ├── layouts/
│   │   ├── BaseLayout.astro      # Master layout with SEO & scripts
│   │   └── WriteupLayout.astro   # Article layout with TOC sidebar
│   ├── pages/
│   │   ├── 404.astro             # Terminal-style 404 page
│   │   ├── about.astro           # Bio, skill matrix & learning roadmap
│   │   ├── contact.astro         # Contact endpoints & PGP key
│   │   ├── ctf.astro             # CTF competition timeline
│   │   ├── index.astro           # Main portfolio page
│   │   ├── projects.astro        # Projects gallery
│   │   ├── resume.astro          # Print-optimized web CV
│   │   ├── rss.xml.ts            # RSS feed generator
│   │   └── writeups/
│   │       ├── index.astro       # Searchable writeup archive
│   │       └── [...slug].astro   # Dynamic MDX writeup renderer
│   └── styles/
│       └── global.css            # Color tokens, fonts, panel styles
├── astro.config.mjs
├── content.config.ts
├── package.json
└── tsconfig.json
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- pnpm (recommended) or npm

### Installation
```bash
# Clone the repository
git clone https://github.com/FaizaAlfa/portofolio.git
cd portofolio

# Install dependencies
pnpm install
```

### Development Server
```bash
pnpm dev
```
Open [http://localhost:4321](http://localhost:4321) in your browser.

### Build & Preview
```bash
# Typecheck
pnpm check

# Build static production bundle
pnpm build

# Preview production build locally
pnpm preview
```

---

## 📝 How to Add Content

### 1. Adding a CTF Writeup
Create a new `.mdx` file in `src/content/writeups/` using the template at `src/content/writeups/writeup-template.mdx`:

```mdx
---
title: "Challenge Title: Subtitle"
description: "Brief summary of the vulnerability and approach."
date: 2025-10-01
event: "Event Name 2025"
category: "reverse" # reverse | forensics | misc | crypto | web | pwn
difficulty: "hard"  # easy | medium | hard | insane
points: 450
tags: ["anti-debug", "ptrace", "bytecode"]
tools: ["Ghidra", "GDB", "Python"]
draft: false
---

import Callout from '../../components/Callout.astro';
import FlagReveal from '../../components/islands/FlagReveal';

## 1. Initial Triage
Your analysis here...

<Callout type="tip" title="Pro Tip">
Always inspect the entrypoint before setting breakpoints.
</Callout>

## 2. Flag Recovery
<FlagReveal flag="CTF{your_flag_here}" />
```

### 2. Adding a Project
Create a new `.md` file in `src/content/projects/` using the template at `src/content/projects/project-template.md`:

```markdown
---
title: "Tool Name"
description: "What this security tool does."
stack: ["Python", "Ghidra API", "C++"]
repo: "https://github.com/FaizaAlfa/my-tool"
demo: "https://demo-link.com" # optional
featured: true
status: "active" # active | wip | archived
---

Detailed description...
```

### 3. Adding a CTF Tournament Record
Create a new `.md` file in `src/content/ctf/`:

```markdown
---
event: "National CTF 2025"
year: 2025
team: "BrawijayaCyber"
rank: 5
totalTeams: 150
categoriesSolved: ["Reverse Engineering", "Digital Forensics"]
link: "https://ctftime.org/event/..."
featured: true
---
Brief tournament highlights...
```

---

## ⚙️ Customization

1. **Owner Profile & Links**: Edit `src/data/site.ts` for email, handle, social URLs.
2. **Skills & Tools**: Edit `src/data/skills.ts` to customize your tool inventory.
3. **PGP Public Key**: Edit `src/pages/contact.astro` and paste your real GPG key.
4. **Resume PDF**: Replace `public/resume.pdf` with your actual CV.

---

## 🌐 Deployment

### Cloudflare Pages (Recommended)
1. Link your GitHub repository in the Cloudflare Pages Dashboard.
2. Build Settings:
   - **Framework preset**: `Astro`
   - **Build command**: `pnpm build`
   - **Build output directory**: `dist`
   - **Node.js version**: `NODE_VERSION=20`

### Vercel
1. Import your GitHub repository into Vercel.
2. Vercel auto-detects Astro. Output directory: `dist`.

### Netlify
1. Create a `netlify.toml` with `publish = "dist"` and `command = "pnpm build"`.

---

## 🔒 Security & Privacy
- **No Third-Party Analytics / Trackers**
- **CSP Headers**: Configured via `public/_headers`
- **Security Contact**: Published at `/.well-known/security.txt` per RFC 9116
