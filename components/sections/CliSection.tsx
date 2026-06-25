"use client";

import React from "react";
import { SectionHead, IconTerminal } from "@/components/DocsShared";

const commands = [
  { title: "Add all components",  cmd: "npx nexonx add all",         detail: "Adds every component registered in registry." },
  { title: "List templates",  cmd: "npx nexonx list",         detail: "Shows every component registered in registry/components.json." },
  { title: "Add button",      cmd: "npx nexonx add button",   detail: "Copies components/button.tsx and creates shared utilities when needed." },
  { title: "Add card",        cmd: "npx nexonx add card",     detail: "Copies components/card.tsx for content previews, panels, and media cards." },
  { title: "Add avatar",      cmd: "npx nexonx add avatar",   detail: "Copies components/avatar.tsx for circular/square avatars with status dots." },
  { title: "Add badge",       cmd: "npx nexonx add badge",    detail: "Copies components/badge.tsx for inline status badges and tags." },
  { title: "Add loader",      cmd: "npx nexonx add loader",   detail: "Copies components/loader.tsx for inline spinner loading indicators." },
  { title: "Add separator",   cmd: "npx nexonx add separator",detail: "Copies components/separator.tsx for dividing visual containers and text lines." },
  { title: "Add typography",  cmd: "npx nexonx add typography",detail: "Copies components/typography.tsx for unified type sizing and line-clamping." },
  { title: "Add slider",  cmd: "npx nexonx add slider",detail: "Copies components/slider.tsx for unified Interactive sliders for adjusting values, ranges, and settings with smooth dragging and visual feedback." },
  { title: "Add input",  cmd: "npx nexonx add input",detail: "Copies components/typography.tsx for Flexible input fields for forms, search bars, authentication flows, and data entry with consistent styling and validation support." },
];

export default function CliSection() {
  return (
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
              <span>$</span>
              {item.cmd}
            </div>
            <p className="nx-cmd-detail">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
