"use client";

import React from "react";
import { CodeBlock, SectionHead, DocsTable } from "@/components/DocsShared";

const orientationOptions = [
  ["horizontal", "Default divider. Span across 100% of the parent width, 1px height."],
  ["vertical",   "Dividers for headers, status bars, and navigation links. Span 100% height of parent container, 1px width."],
];

export default function SeparatorSection() {
  return (
    <section id="separator">
      <SectionHead
        eyebrow="Separator"
        title="Visual dividers for layouts and text blocks"
        desc="A simple design token wrapper for thin horizontal or vertical divider lines. Supports screenreader hidden/role states."
      />

      <div className="nx-grid-2 r-4060" style={{ marginBottom: 16 }}>
        <div className="nx-preview-pane">
          <div className="nx-preview-label">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2"/><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" opacity=".3"/></svg>
            Preview
          </div>
          <div style={{ padding: "8px 0" }}>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Nexonx UI</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">Source-first React component CLI.</p>
              
              {/* Horizontal Separator */}
              <div className="shrink-0 bg-zinc-200 dark:bg-white/10 h-px w-full my-3" />
              
              <div className="flex h-5 items-center space-x-3 text-xs text-zinc-400 dark:text-zinc-500">
                <div>Docs</div>
                {/* Vertical Separator */}
                <div className="shrink-0 bg-zinc-200 dark:bg-white/10 h-full w-px" />
                <div>Source</div>
                {/* Vertical Separator */}
                <div className="shrink-0 bg-zinc-200 dark:bg-white/10 h-full w-px" />
                <div>Registry</div>
              </div>
            </div>
          </div>
        </div>

        <CodeBlock
          filename="divider-demo.tsx"
          code={`import { Separator } from "@/components/separator";

export function DividerDemo() {
  return (
    <div className="space-y-2">
      <div>
        <h4 className="text-sm font-semibold">Nexonx UI</h4>
        <p className="text-xs text-zinc-500">Source-first React component CLI.</p>
      </div>

      {/* Horizontal Divider */}
      <Separator className="my-3" />

      <div className="flex h-5 items-center space-x-3 text-xs">
        <div>Docs</div>
        
        {/* Vertical Divider */}
        <Separator orientation="vertical" />
        
        <div>Source</div>
        
        <Separator orientation="vertical" />
        
        <div>Registry</div>
      </div>
    </div>
  );
}`}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <DocsTable
          headers={["Prop", "Values", "Default"]}
          rows={[
            ["orientation", "horizontal · vertical",                           "horizontal"],
            ["decorative",  "boolean - sets accessibility role to none",       "true"],
            ["className",   "Any Tailwind class string",                        "—"],
          ]}
        />
        <DocsTable headers={["Orientation", "Description"]} rows={orientationOptions} />
      </div>
    </section>
  );
}
