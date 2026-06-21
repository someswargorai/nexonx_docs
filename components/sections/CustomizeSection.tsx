"use client";

import React from "react";
import { CodeBlock, SectionHead, IconCheck } from "@/components/DocsShared";

export default function CustomizeSection() {
  return (
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
  );
}
