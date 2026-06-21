"use client";

import React from "react";
import { CodeBlock, SectionHead } from "@/components/DocsShared";

const installSteps = [
  "Run the CLI inside a React, Vite, or Next.js project.",
  "Choose a component from the registry.",
  "Nexonx installs missing helpers and copies source files into your app.",
  "Edit the copied component like normal application code.",
];

export default function InstallSection() {
  return (
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
  );
}
