"use client";

import React from "react";
import { CodeBlock, SectionHead, DocsTable } from "@/components/DocsShared";

const sizeOptions = [
  ["xs", "h-3 w-3 (12px) - For tight inline layouts or small buttons."],
  ["sm", "h-4 w-4 (16px) - Default size for inline icons and label groups."],
  ["md", "h-5 w-5 (20px) - Great for navigation links and buttons."],
  ["lg", "h-6 w-6 (24px) - For section headers or feature lists."],
  ["xl", "h-8 w-8 (32px) - Massive size for dashboard hero widgets."],
];

export default function IconSection() {
  return (
    <section id="icon">
      <SectionHead
        eyebrow="Icon"
        title="Unified Lucide Icon wrapper and sizing API"
        desc="A consistent wrapper for Lucide React icons. Standardizes sizing bounds, stroke weights, and brand/accent color fills."
      />

      <div className="nx-grid-2 r-4060" style={{ marginBottom: 16 }}>
        <div className="nx-preview-pane">
          <div className="nx-preview-label">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2"/><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" opacity=".3"/></svg>
            Preview
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px", padding: "10px 0" }}>
            {/* Sparkles Primary LG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>

            {/* Zap Success XL */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400">
              <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>

            {/* Terminal Muted MD */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 dark:text-zinc-500">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>

            {/* Shield Danger SM */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 dark:text-red-500">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>

            {/* Settings Warning XS */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 dark:text-amber-400">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        </div>

        <CodeBlock
          filename="icon-demo.tsx"
          code={`import { Icon } from "@/components/icon";
import { Sparkles, Zap, Terminal } from "lucide-react";

export function IconDemo() {
  return (
    <div className="flex items-center gap-4">
      {/* Indigo Accented Large Sparkles Icon */}
      <Icon icon={Sparkles} color="primary" size="lg" />

      {/* Emerald Accented Extra Large Zap Icon */}
      <Icon icon={Zap} color="success" size="xl" />

      {/* Medium Muted Terminal Icon */}
      <Icon icon={Terminal} color="muted" strokeWidth={2} />
    </div>
  );
}`}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <DocsTable
          headers={["Prop", "Values", "Default"]}
          rows={[
            ["icon",        "LucideIcon - from lucide-react library",            "—"],
            ["size",        "xs · sm · md · lg · xl",                             "sm"],
            ["color",       "default · muted · primary · success · warning · danger · current", "default"],
            ["strokeWidth", "number - CSS stroke-width value",                     "1.75"],
            ["label",       "string - accessibility label for screenreaders",     "—"],
            ["className",   "Any Tailwind class string",                          "—"],
          ]}
        />
        <DocsTable headers={["Size", "Description"]} rows={sizeOptions} />
      </div>
    </section>
  );
}
