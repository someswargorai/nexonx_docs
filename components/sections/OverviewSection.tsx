"use client";

import React from "react";
import Image from "next/image";
import { IconArrow, IconZap, IconPackage, IconLayers, IconCopy, IconGrid } from "@/components/DocsShared";

const stats = [
  { id: "version",    value: "1.1.0",   label: "Version" },
  { id: "components", value: "10",       label: "Components" }, // Updated components count to 9
  { id: "source",     value: "Source",  label: "Copy Model" },
  { id: "styling",    value: "Tailwind", label: "Styling" },
];

const statIcons: Record<string, React.FC> = {
  version:    IconPackage,
  components: IconLayers,
  source:     IconCopy,
  styling:    IconGrid,
};

export default function OverviewSection() {
  return (
    <section id="overview">
      {/* Hero card */}
      <div className="nx-hero-card">
        <div className="nx-hero-left">
          <div className="nx-hero-badges">
            <span className="nx-badge">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              nexonx@1.1.0
            </span>
            <span className="nx-badge">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              React + TypeScript
            </span>
            <span className="nx-badge">Tailwind CSS</span>
          </div>

          <h1 className="nx-hero-title">
            Source-first docs<br />
            for{" "}
            <span className="nx-gradient-text">Nexonx</span>{" "}
            UI.
          </h1>

          <p className="nx-hero-desc">
            Nexonx copies clean component source into your app — no hidden package APIs.
            Install only what you need, own the files, and customize freely.
          </p>

          <div className="nx-hero-actions">
            <a href="#install" className="nx-btn-primary">
              Get started <IconArrow />
            </a>
            <a href="#avatar" className="nx-btn-secondary">
              View components
            </a>
          </div>
        </div>

        <div className="nx-hero-right">
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "16px", width: "100%", maxWidth: "300px", transform: "translateY(-4px)" }}>
            <div className="nx-img-card" style={{ transform: "rotate(-2deg)", boxShadow: "0 24px 48px rgba(0,0,0,0.12), 0 0 0 1px var(--c-border)", border: "none" }}>
              <Image 
                src="https://res.cloudinary.com/dpacclyw4/image/upload/v1781975840/banner_in7wjs.png" 
                width={500}
                height={500}
                loading="eager"
                alt="Nexonx component preview" 
                style={{ width: "100%", height: "140px", objectFit: "cover", display: "block" }} 
              />
              <div className="nx-img-card-body">
                <p className="nx-img-card-title">Nexonx UI Kit</p>
                <p className="nx-img-card-desc">A copied component ready to customize inside your app.</p>
              </div>
            </div>
            
            <div className="nx-feat-card" style={{ transform: "rotate(1deg) translateX(24px)", border: "none", zIndex: 2 }}>
              <div className="nx-feat-icon"><IconZap /></div>
              <p className="nx-feat-title">Build faster</p>
              <p className="nx-feat-desc">Add content, actions, icons, and nested layouts as children.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="nx-stats" style={{ marginTop: 14 }}>
        {stats.map(({ id, value, label }) => {
          const Icon = statIcons[id];
          return (
            <div key={label} className="nx-stat-card">
              <div className="nx-stat-icon">
                <Icon />
              </div>
              <div className="nx-stat-value">{value}</div>
              <div className="nx-stat-label">{label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
