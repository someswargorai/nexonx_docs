"use client";

import React from "react";
import { CodeBlock, SectionHead, DocsTable } from "@/components/DocsShared";

const badgeVariants = [
  ["default",     "Clean gray background for neutral labels, categories, or stats."],
  ["primary",     "Indigo tint background for important information, updates, or highlights."],
  ["success",     "Emerald green tint for completed actions, successful state, or active status."],
  ["warning",     "Amber yellow tint for warnings, alerts, or pending actions."],
  ["danger",      "Red tint for failures, errors, or critical alerts."],
  ["outline",     "Transparent background with thin border outline for low emphasis tags."],
];

export default function BadgeSection() {
  return (
    <section id="badge">
      <SectionHead
        eyebrow="Badge"
        title="Compact status labels and category tags"
        desc="Renders compact inline tags representing categories, counts, or status states. Includes options for status dots and multiple sizing variants."
      />

      <div className="nx-grid-2 r-4060" style={{ marginBottom: 16 }}>
        <div className="nx-preview-pane">
          <div className="nx-preview-label">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2"/><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" opacity=".3"/></svg>
            Preview
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", padding: "10px 0" }}>
            {/* Default */}
            <span className="w-[70px] inline-flex justify-center items-center gap-1.5 rounded-full font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-200/80 dark:hover:bg-zinc-700 h-7 px-5 text-xs transition-colors">
              Default
            </span>

            {/* Primary with dot */}
            <span className="w-[70px] inline-flex justify-center items-center gap-1.5 rounded-full font-medium bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100/80 dark:hover:bg-indigo-500/25 h-7 px-4 pl-3 text-xs transition-colors">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600 dark:bg-indigo-400 opacity-70" />
              Active
            </span>

            {/* Success */}
            <span className="w-[70px] inline-flex justify-center items-center gap-1.5 rounded-full font-medium bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100/80 dark:hover:bg-emerald-500/25 h-7 px-5 text-xs transition-colors">
              Success
            </span>

            {/* Warning with dot */}
            <span className="w-[78px] inline-flex justify-center items-center gap-1.5 rounded-full font-medium bg-amber-50 dark:bg-amber-500/15 text-amber-700 dark:text-amber-300 hover:bg-amber-100/80 dark:hover:bg-amber-500/25 h-7 px-4 pl-3 text-xs transition-colors">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600 dark:bg-amber-400 opacity-70" />
              Attention
            </span>

            {/* Danger */}
            <span className="w-[70px] inline-flex justify-center items-center gap-1.5 rounded-full font-medium bg-red-50 dark:bg-red-500/15 text-red-700 dark:text-red-300 hover:bg-red-100/80 dark:hover:bg-red-500/25 h-7 px-5 text-xs transition-colors">
              Failed
            </span>

            {/* Outline */}
            <span className="w-[70px] inline-flex justify-center items-center gap-1.5 rounded-full font-medium bg-transparent text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 h-7 px-5 text-xs transition-colors">
              Pending
            </span>
          </div>
        </div>

        <CodeBlock
          filename="status-tags.tsx"
          code={`import { Badge } from "@/components/badge";

export function StatusTags() {
  return (
    <div className="flex items-center gap-2">
      <Badge>Default</Badge>
      
      {/* Primary Status Badge with Dot */}
      <Badge variant="primary" dot>
        Active
      </Badge>

      <Badge variant="success">Success</Badge>
      
      <Badge variant="danger" size="lg">
        Critical Error
      </Badge>

      <Badge variant="outline" size="sm">
        Archived
      </Badge>
    </div>
  );
}`}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <DocsTable
          headers={["Prop", "Values", "Default"]}
          rows={[
            ["variant",   "default · primary · success · warning · danger · outline", "default"],
            ["size",      "sm · md · lg",                                             "md"],
            ["dot",       "boolean - displays indicator dot when true",               "false"],
            ["className", "Any Tailwind class string",                                 "—"],
          ]}
        />
        <DocsTable headers={["Variant", "Use case"]} rows={badgeVariants} />
      </div>
    </section>
  );
}
