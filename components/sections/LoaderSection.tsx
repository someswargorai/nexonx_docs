"use client";

import React from "react";
import { CodeBlock, SectionHead, DocsTable } from "@/components/DocsShared";

const loaderVariants = [
  ["default",     "Accent colored spinner (dark zinc in light mode, white in dark mode) for standard operations."],
  ["muted",       "Muted gray spinner, perfect for low-contrast backgrounds or secondary operations."],
  ["destructive", "Red spinner for loading states related to destructive tasks (like file deletion)."],
  ["outline",     "Border/neutral style spinner for dark overlays or custom container setups."],
];

export default function LoaderSection() {
  return (
    <section id="loader">
      <SectionHead
        eyebrow="Loader"
        title="Animated spinners for loading and buffering states"
        desc="Renders an animated spin-state icon to denote background processes. Comes with custom accessibility label properties and responsive variants."
      />

      <div className="nx-grid-2 r-4060" style={{ marginBottom: 16 }}>
        <div className="nx-preview-pane">
          <div className="nx-preview-label">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2"/><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" opacity=".3"/></svg>
            Preview
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px", padding: "10px 0" }}>
            {/* Default Spinner - Size XL */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-spin text-zinc-900 dark:text-zinc-100">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>

            {/* Muted Spinner - Size LG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-spin text-zinc-400 dark:text-zinc-500">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>

            {/* Destructive Spinner - Size MD */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-spin text-red-600 dark:text-red-500">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>

            {/* Outline Spinner - Size SM */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-spin text-zinc-600 dark:text-zinc-400">
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </div>
        </div>

        <CodeBlock
          filename="loading-states.tsx"
          code={`import { Loader } from "@/components/loader";

export function LoadingStates() {
  return (
    <div className="flex items-center gap-4">
      {/* Default Loading Spinner */}
      <Loader size="md" />

      {/* Muted Gray Spinner with custom Screenreader label */}
      <Loader variant="muted" size="lg" label="Saving progress..." />

      {/* Destructive Task Spinner */}
      <Loader variant="destructive" size="sm" />
    </div>
  );
}`}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <DocsTable
          headers={["Prop", "Values", "Default"]}
          rows={[
            ["variant",   "default · muted · destructive · outline",                   "default"],
            ["size",      "xs · sm · md · lg · xl",                                     "sm"],
            ["label",     "string - accessibility label (read out by screenreaders)",  "Loading"],
            ["className", "Any Tailwind class string",                                  "—"],
          ]}
        />
        <DocsTable headers={["Variant", "Use case"]} rows={loaderVariants} />
      </div>
    </section>
  );
}
