"use client";

import React from "react";
import { CodeBlock, SectionHead, DocsTable } from "@/components/DocsShared";

const buttonVariants = [
  ["default",     "Primary action with dark fill and elevated hover state."],
  ["secondary",   "Quiet action for lower-priority interface controls."],
  ["outline",     "Bordered action for neutral flows and toolbars."],
  ["ghost",       "Minimal action for dense navigation and icon rows."],
  ["destructive", "Danger action for delete, remove, and irreversible tasks."],
];

export default function ButtonSection() {
  return (
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
            <button className="pb-danger">Delete</button>
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
  );
}
