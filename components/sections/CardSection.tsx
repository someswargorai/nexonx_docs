"use client";

import React from "react";
import Image from "next/image";
import { CodeBlock, SectionHead, DocsTable, IconZap } from "@/components/DocsShared";

const cardVariants = [
  ["default",     "White surface with subtle border and soft shadow."],
  ["secondary",   "Muted surface for grouped settings or related content."],
  ["destructive", "Warning surface for risky workflows and alerts."],
  ["outline",     "Transparent bordered card for low-noise layouts."],
  ["ghost",       "Borderless card for list-like compositions."],
  ["elevated",    "Lifted surface for product, feature, and dashboard cards."],
];

export default function CardSection() {
  return (
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
              loading="eager"
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
  );
}
