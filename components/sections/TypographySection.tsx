"use client";

import React from "react";
import { CodeBlock, SectionHead, DocsTable } from "@/components/DocsShared";

const tagOptions = [
  ["h1 - h6", "Header components. Automatically configured with heavy tracking weights and accent dark/white text fills."],
  ["p / span / div", "Standard body text elements. Styled in clean, readable zinc-600 (zinc-400 dark) colors."],
  ["label", "Form inputs and metadata labels. Slightly bolder weight (500) and smaller font size (sm)."],
  ["blockquote", "Italic blockquotes with a left border divider for highlight text and callouts."],
];

export default function TypographySection() {
  return (
    <section id="typography">
      <SectionHead
        eyebrow="Typography"
        title="Unified font styles and line-clamping controls"
        desc="Provides standardized typography blocks for headings, paragraphs, and lists. Includes built-in line clamping capabilities for consistent truncation."
      />

      <div className="nx-grid-2 r-4060" style={{ marginBottom: 16 }}>
        <div className="nx-preview-pane">
          <div className="nx-preview-label">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2"/><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" opacity=".3"/></svg>
            Preview
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "8px 0" }}>
            {/* Heading 3 */}
            <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Header Three Title
            </h3>

            {/* Blockquote */}
            <blockquote className="text-sm italic text-zinc-500 dark:text-zinc-400 border-l-2 border-zinc-200 dark:border-white/15 pl-3">
              "Nexonx copies components directly into your app. You own the code."
            </blockquote>

            {/* Paragraph Line Clamping */}
            <div>
              <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">Truncated text (2 lines limit)</p>
              <p className="text-xs font-normal text-zinc-600 dark:text-zinc-400 line-clamp-2 break-words leading-relaxed">
                This is a very long paragraph of description text that demonstrates how the Typography component can automatically apply line clamp styling. By setting the line count parameter, this text is truncated with ellipses if it exceeds the lines constraint, preventing design overflow.
              </p>
            </div>
          </div>
        </div>

        <CodeBlock
          filename="text-blocks.tsx"
          code={`import { Typography } from "@/components/typography";

export function TextBlocks() {
  return (
    <div className="space-y-4">
      {/* Heavy Title Header */}
      <Typography as="h3">Header Three Title</Typography>

      {/* Custom Blockquote */}
      <Typography as="blockquote">
        "Nexonx copies components directly into your app. You own the code."
      </Typography>

      {/* Automatically clamped text (2 lines max) */}
      <Typography as="p" lines={2}>
        This is a very long paragraph of description text that demonstrates how
        the Typography component can automatically apply line clamp styling.
        By setting the line count parameter, this text is truncated with
        ellipses if it exceeds the lines constraint.
      </Typography>
    </div>
  );
}`}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <DocsTable
          headers={["Prop", "Values", "Default"]}
          rows={[
            ["as",        "h1 · h2 · h3 · h4 · h5 · h6 · p · span · div · label · blockquote", "p"],
            ["lines",     "1 · 2 · 3 · 4 - Truncates with ellipses after N lines",            "—"],
            ["className", "Any Tailwind class string",                                        "—"],
          ]}
        />
        <DocsTable headers={["Element", "Description"]} rows={tagOptions} />
      </div>
    </section>
  );
}
