"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const navItems = [
  { id: "overview",  label: "Overview" },
  { id: "install",   label: "Install" },
  { id: "cli",       label: "CLI" },
  { id: "button",    label: "Button" },
  { id: "card",      label: "Card" },
  { id: "registry",  label: "Registry" },
  { id: "customize", label: "Customize" },
];

const stats = [
  { id: "version",    value: "1.0.6",   label: "Version" },
  { id: "components", value: "2",       label: "Components" },
  { id: "source",     value: "Source",  label: "Copy Model" },
  { id: "styling",    value: "Tailwind", label: "Styling" },
];

const commands = [
  { title: "List templates",  cmd: "npx nexonx list",         detail: "Shows every component registered in registry/components.json." },
  { title: "Add button",      cmd: "npx nexonx add button",   detail: "Copies components/button.tsx and creates shared utilities when needed." },
  { title: "Add card",        cmd: "npx nexonx add card",     detail: "Copies components/card.tsx for content previews, panels, and media cards." },
];

const buttonVariants = [
  ["default",     "Primary action with dark fill and elevated hover state."],
  ["secondary",   "Quiet action for lower-priority interface controls."],
  ["outline",     "Bordered action for neutral flows and toolbars."],
  ["ghost",       "Minimal action for dense navigation and icon rows."],
  ["destructive", "Danger action for delete, remove, and irreversible tasks."],
];

const cardVariants = [
  ["default",     "White surface with subtle border and soft shadow."],
  ["secondary",   "Muted surface for grouped settings or related content."],
  ["destructive", "Warning surface for risky workflows and alerts."],
  ["outline",     "Transparent bordered card for low-noise layouts."],
  ["ghost",       "Borderless card for list-like compositions."],
  ["elevated",    "Lifted surface for product, feature, and dashboard cards."],
];

const installSteps = [
  "Run the CLI inside a React, Vite, or Next.js project.",
  "Choose a component from the registry.",
  "Nexonx installs missing helpers and copies source files into your app.",
  "Edit the copied component like normal application code.",
];

const copiedFiles = [
  ["button",          "components/button.tsx"],
  ["card",            "components/card.tsx"],
  ["shared utility",  "lib/utils/cn.tsx"],
  ["Tailwind config", "postcss.config.mjs (when missing)"],
  ["Global CSS",      "app/globals.css, src/app/globals.css, or styles/globals.css"],
];

const IconSun = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);

const IconMoon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
);

const IconCopy = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
  </svg>
);

const IconCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const IconTerminal = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5"/>
    <line x1="12" y1="19" x2="20" y2="19"/>
  </svg>
);

const IconZap = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>
);

const IconPackage = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7.5 4.27 9 5.15M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
    <path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>
  </svg>
);

const IconLayers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
  </svg>
);

const IconBox = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  </svg>
);

const IconPuzzle = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.236 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.567a2.402 2.402 0 0 1-.706-1.705 2.4 2.4 0 0 1 .706-1.704l1.61-1.61a.98.98 0 0 1 .837-.276c.47.07.802.48.968.925a2.501 2.501 0 1 0 3.214-3.214c-.446-.166-.855-.497-.925-.968a.979.979 0 0 1 .276-.837l1.61-1.61A2.402 2.402 0 0 1 12 2.1a2.4 2.4 0 0 1 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 0 1 4.459 2.304c-.181.464-.527.894-1.02.968z"/>
  </svg>
);

const IconGrid = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="7" x="3" y="3" rx="1"/>
    <rect width="7" height="7" x="14" y="3" rx="1"/>
    <rect width="7" height="7" x="14" y="14" rx="1"/>
    <rect width="7" height="7" x="3" y="14" rx="1"/>
  </svg>
);

const IconSettings = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconGitHub = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const navIcons: Record<string, React.FC> = {
  overview:  IconPackage,
  install:   IconBox,
  cli:       IconTerminal,
  button:    IconGrid,
  card:      IconLayers,
  registry:  IconPuzzle,
  customize: IconSettings,
};

const statIcons: Record<string, React.FC> = {
  version:    IconPackage,
  components: IconLayers,
  source:     IconCopy,
  styling:    IconGrid,
};


type Token = { text: string; cls?: string };

function hl(raw: string): Token[] {
 
  const tokens: Token[] = [];
  const patterns: [RegExp, string][] = [
    [/^(\/\/[^\n]*)/, "t-cm"],                           
    [/^(import|export|from|return|function|const|let|var|default|type|interface)\b/, "t-kw"],
    [/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/, "t-str"],
    [/^(<\/?[A-Z][A-Za-z]*|<\/[a-z]+>)/, "t-tag"],          
    [/^([A-Z][A-Za-z]*)(?=\s*[\(\{<])/, "t-fn"],            
    [/^([a-z][A-Za-z]*)(?=\s*\()/, "t-fn"],                  
    [/^(\d+)/, "t-num"],
    [/^([{}()\[\]<>;,.:=+\-/|?!])/, "t-op"],
  ];

  let s = raw;
  while (s.length) {
    let matched = false;
    for (const [re, cls] of patterns) {
      const m = s.match(re);
      if (m) {
        tokens.push({ text: m[0], cls });
        s = s.slice(m[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Accumulate plain text
      const last = tokens[tokens.length - 1];
      if (last && !last.cls) { last.text += s[0]; }
      else { tokens.push({ text: s[0] }); }
      s = s.slice(1);
    }
  }
  return tokens;
}

function CodeBlock({ code, filename }: { code: string; filename?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tokens = hl(code);

  return (
    <div className="nx-code-wrap">
      <div className="nx-code-header">
        <div className="nx-code-dots">
          <div className="nx-code-dot" />
          <div className="nx-code-dot" />
          <div className="nx-code-dot" />
        </div>
        {filename && <span className="nx-code-filename">{filename}</span>}
        <button className={`nx-code-copy${copied ? " copied" : ""}`} onClick={copy}>
          {copied ? <IconCheck /> : <IconCopy />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="nx-code-body">
        <pre>
          <code>
            {tokens.map((t, i) =>
              t.cls
                ? <span key={i} className={t.cls}>{t.text}</span>
                : t.text
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, desc }: { eyebrow: string; title: string; desc: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p className="nx-eyebrow">
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--c-accent)", display: "inline-block" }} />
        {eyebrow}
      </p>
      <h2 className="nx-section-title">{title}</h2>
      <p className="nx-section-desc">{desc}</p>
    </div>
  );
}

function DocsTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="nx-table-wrap">
      <table className="nx-table">
        <thead>
          <tr>{headers.map(h => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td key={i}>{i === 0 ? <code>{cell}</code> : cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") setTimeout(()=>setTheme(attr),0);
    setTimeout(()=>setMounted(true),0);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("nx-theme", next); } catch (_) {}
  };

  return (
    <div className="nx-page">

      <header className="nx-header">
        <div className="nx-header-inner">

          <a href="#overview" className="nx-logo">
            <div className="nx-logo-mark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" opacity=".95">
                <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <div className="nx-logo-text flex gap-2 items-center">
              <span className="nx-logo-name">Nexonx</span>
              <span className="nx-logo-sub">Component Library</span>
            </div>
          </a>

          <div className="nx-spacer" />

          <nav className="nx-nav">
            
          </nav>

          <div className="nx-header-actions">
            <a
              href="https://github.com/someswargorai/nexonx_lib.git"
              target="_blank"
              rel="noreferrer"
              className="nx-theme-btn"
              aria-label="GitHub Repository"
            >
              <IconGitHub />
            </a>
            <button
              className="nx-theme-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              suppressHydrationWarning
            >
              {mounted ? (theme === "dark" ? <IconSun /> : <IconMoon />) : <IconSun />}
            </button>
            <a href="#install" className="nx-btn-cta">
              Get started <IconArrow />
            </a>
          </div>
        </div>
      </header>

      <div className="nx-body">

        {/* Sidebar */}
        <aside className="nx-sidebar">
          <div className="nx-sidebar-inner">
            <p className="nx-sidebar-label">On this page</p>
            <nav className="nx-sidebar-nav">
              {navItems.map(item => {
                const Icon = navIcons[item.id];
                return (
                  <a key={item.id} href={`#${item.id}`} className="nx-sidebar-link">
                    <Icon />
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="nx-content">

          <section id="overview">

            {/* Hero card */}
            <div className="nx-hero-card">
              <div className="nx-hero-left">
                <div className="nx-hero-badges">
                  <span className="nx-badge">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    nexonx@1.0.6
                  </span>
                  <span className="nx-badge">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    React + TypeScript
                  </span>
                  <span className="nx-badge">Tailwind CSS</span>
                </div>

                <h1 className="nx-hero-title">
                  Source-first docs<br />
                  for{" "}
                  <span className="nx-gradient-text">Nexonx</span>{" "}
                  UI.
                </h1>

                <p className="nx-hero-desc">
                  Nexonx copies clean component source into your app — no hidden package APIs.
                  Install only what you need, own the files, and customize freely.
                </p>

                <div className="nx-hero-actions">
                  <a href="#install" className="nx-btn-primary">
                    Get started <IconArrow />
                  </a>
                  <a href="#button" className="nx-btn-secondary">
                    View components
                  </a>
                </div>
              </div>

              <div className="nx-hero-right">
                <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "300px", transform: "translateY(-4px)" }}>
                  <div className="nx-img-card" style={{ transform: "rotate(-2deg)", boxShadow: "0 24px 48px rgba(0,0,0,0.12), 0 0 0 1px var(--c-border)", border: "none" }}>
                    <Image 
                      src="https://res.cloudinary.com/dpacclyw4/image/upload/v1781975840/banner_in7wjs.png" 
                      width={500}
                      height={500}
                      alt="Nexonx component preview" 
                      style={{ width: "100%", height: "140px", objectFit: "cover", display: "block" }} 
                    />
                    <div className="nx-img-card-body">
                      <p className="nx-img-card-title">Nexonx UI Kit</p>
                      <p className="nx-img-card-desc">A copied component ready to customize inside your app.</p>
                    </div>
                  </div>
                  
                  <div className="nx-feat-card" style={{ transform: "rotate(1deg) translateX(24px)", border: "none", zIndex: 2 }}>
                    <div className="nx-feat-icon"><IconZap /></div>
                    <p className="nx-feat-title">Build faster</p>
                    <p className="nx-feat-desc">Add content, actions, icons, and nested layouts as children.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="nx-stats" style={{ marginTop: 14 }}>
              {stats.map(({ id, value, label }) => {
                const Icon = statIcons[id];
                return (
                  <div key={label} className="nx-stat-card">
                    <div className="nx-stat-icon">
                      <Icon />
                    </div>
                    <div className="nx-stat-value">{value}</div>
                    <div className="nx-stat-label">{label}</div>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="install">
            <SectionHead
              eyebrow="Install"
              title="Add Nexonx to any Tailwind project"
              desc="Start from the CLI. It detects your package manager, checks Tailwind setup, installs missing dependencies, and copies the requested component into source."
            />

            <div className="nx-grid-2 r-6040">
              <div>
              <CodeBlock
                filename="terminal"
                code={`npx nexonx list\nnpx nexonx add button\nnpx nexonx add card`}
              />
              </div>
              <div className="nx-card nx-card-p">
                <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "var(--c-text-3)", marginBottom: 16 }}>
                  How it works
                </p>
                <div className="nx-steps">
                  {installSteps.map((step, i) => (
                    <div key={i} className="nx-step">
                      <div className="nx-step-center">
                        <div className="nx-step-num">{i + 1}</div>
                       
                      </div>
                      <p className="nx-step-text">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="cli">
            <SectionHead
              eyebrow="CLI"
              title="Command reference"
              desc={<>The package exposes a binary named <code>nexonx_cli</code> and supports direct execution via <code>npx nexonx</code>.</>}
            />

            <div className="nx-cmd-grid">
              {commands.map(item => (
                <div key={item.cmd} className="nx-cmd-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, rgba(var(--c-accent-rgb),.15), rgba(var(--c-accent-rgb),.06))", border: "1px solid rgba(var(--c-accent-rgb),.2)", display: "grid", placeItems: "center", color: "var(--c-accent)", flexShrink: 0 }}>
                      <IconTerminal />
                    </div>
                    <h3 className="nx-cmd-title" style={{ margin: 0 }}>{item.title}</h3>
                  </div>
                  <div className="nx-cmd-pill">
                    <span >$</span>
                    {item.cmd}
                  </div>
                  <p className="nx-cmd-detail">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>
 
          <section id="button">
            <SectionHead
              eyebrow="Button"
              title="Actions, links, and icon-sized controls"
              desc={<>The button uses class-variance-authority variants, Radix Slot for <code>asChild</code>, and a shared <code>cn</code> helper for class merging.</>}
            />

            <div className="nx-grid-2 r-4060" style={{ marginBottom: 16 }}>
              <div className="nx-preview-pane">
                <div className="nx-preview-label">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2"/><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" opacity=".3"/></svg>
                  Preview
                </div>
                <div className="nx-btn-row">
                  <button className="pb-primary">Get started</button>
                  <button className="pb-secondary">Preview</button>
                  <button className="pb-outline">Learn more</button>
                  <button className="pb-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                  </button>
                  <button className="pb-danger">
                  
                    Delete
                  </button>
                </div>
              </div>

              <CodeBlock
                filename="actions.tsx"
                code={`import { Button } from "@/components/button";

export function Actions() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>Get started</Button>
      <Button variant="secondary">Preview</Button>
      <Button variant="outline" size="sm">
        Learn more
      </Button>
      <Button variant="destructive">Delete</Button>
    </div>
  );
}`}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <DocsTable
                headers={["Prop", "Values", "Default"]}
                rows={[
                  ["variant",   "default · secondary · outline · ghost · destructive", "default"],
                  ["size",      "sm · md · lg · icon",                                  "md"],
                  ["asChild",   "boolean — renders Radix Slot when true",               "false"],
                  ["className", "Any Tailwind class string",                            "—"],
                ]}
              />
              <DocsTable headers={["Variant", "Use case"]} rows={buttonVariants} />
            </div>
          </section>

          <section id="card">
            <SectionHead
              eyebrow="Card"
              title="Panels, previews, media blocks, feature cards"
              desc="Supports title/description line clamping, optional icons and images, children, three sizes, and six surface variants."
            />

           
            <div className="nx-grid-2 r-4060" style={{ marginBottom: 16 }}>

             
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
               
                <div className="nx-img-card">
                  <Image 
                    src="https://res.cloudinary.com/dpacclyw4/image/upload/v1781975840/banner_in7wjs.png"
                    width={500}
                    height={500}
                    alt="Nexonx component preview" 
                    style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }} 
                  />
                  <div className="nx-img-card-body">
                    <p className="nx-img-card-title">Nexonx UI Kit</p>
                    <p className="nx-img-card-desc">A copied component ready to customize inside your app, giving you a production-ready starting point without building from scratch. It comes with clean, readable code, consistent styling, and a modular structure so you can easily modify logic, layout, and design as needed.</p>
                  </div>
                </div>

               
                <div className="nx-feat-card">
                  <div className="nx-feat-icon"><IconZap /></div>
                  <p className="nx-feat-title">Build faster</p>
                  <p className="nx-feat-desc">Add content, actions, icons, and nested layouts as children.</p>
                  <button className="nx-upgrade-btn">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    Upgrade
                  </button>
                </div>
              </div>

         
              <CodeBlock
                filename="upgrade-card.tsx"
                code={`import { Card } from "@/components/card";
import { Button } from "@/components/button";

export function UpgradeCard() {
  return (
    <Card
      title="Build faster"
      description="Start with a polished base."
      variant="default"
      size="md"
    >
      <div className="mt-4">
        <Button size="sm">Upgrade</Button>
      </div>
    </Card>
  );
}`}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <DocsTable
                headers={["Prop", "Values", "Default"]}
                rows={[
                  ["variant",          "default · secondary · destructive · outline · ghost · elevated", "default"],
                  ["size",             "sm · md · lg",           "md"],
                  ["imageSrc",         "string path or URL",     "—"],
                  ["imageAspectRatio", "CSS aspect-ratio value", "16/9"],
                  ["titleLines",       "1 · 2 · 3",              "1"],
                  ["descriptionLines", "1 · 2 · 3 · 4",          "2"],
                ]}
              />
              <DocsTable headers={["Variant", "Use case"]} rows={cardVariants} />
            </div>
          </section>

         
          <section id="registry">
            <SectionHead
              eyebrow="Registry"
              title="What the package copies"
              desc={<>Components are registered in <code>registry/components.json</code>. Each entry points to the files the CLI copies into the consuming project.</>}
            />

            <div className="nx-grid-2 r-6040">
              <CodeBlock
                filename="registry/components.json"
                code={`{
  "card": {
    "files": ["components/card.tsx"]
  },
  "button": {
    "files": ["components/button.tsx"]
  }
}`}
              />
              <DocsTable headers={["Item", "Path or behavior"]} rows={copiedFiles} />
            </div>
          </section>


          <section id="customize">
            <SectionHead
              eyebrow="Contribute & Customize"
              title="Extend Nexonx with your own components"
              desc={<>You can easily contribute to Nexonx! By doing so, you help expand the library for everyone. Add a component file, register it, then test the CLI before submitting a PR to the <a href="https://github.com/someswargorai/nexonx_lib.git" target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>repository</a>.</>}
            />

            <div className="nx-grid-2">
              <CodeBlock
                filename="registry/components.json"
                code={`// Add a new component
{
  "badge": {
    "files": ["components/badge.tsx"]
  }
}`}
              />
              <div className="nx-card nx-card-p">
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--c-text-1)", marginBottom: 14 }}>
                  Recommended checklist
                </p>
                <ul className="nx-checklist">
                  {[
                    "Keep props typed and export the prop interface.",
                    <>Use Tailwind utilities so consumers can edit styles quickly.</>,
                    <>Use the shared <code>cn</code> helper for className overrides.</>,
                    "Document variants, sizes, and composition examples.",
                    <>Run <code>node cli/cli.js list</code> and add from another app.</>,
                  ].map((item, i) => (
                    <li key={i} className="nx-check-item">
                      <span className="nx-check-icon">
                        <IconCheck />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

        </main>
      </div>

      <footer className="nx-footer">
        <div className="nx-footer-brand">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          Built with <strong>Nexonx</strong>
        </div>
        <div className="nx-footer-links">
          <a href="https://github.com/someswargorai/nexonx_lib.git" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/someswar-gorai-3a12582b3/" target="_blank" rel="noreferrer">Linkedin</a>
        </div>
      </footer>
    </div>
  );
}
