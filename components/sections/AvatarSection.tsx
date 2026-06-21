"use client";

import React from "react";
import { CodeBlock, SectionHead, DocsTable } from "@/components/DocsShared";

const avatarVariants = [
  ["circle", "Standard circular avatar, ideal for user profiles."],
  ["square", "Soft square avatar with rounded corners, perfect for organizations, teams, or integrations."],
];

export default function AvatarSection() {
  return (
    <section id="avatar">
      <SectionHead
        eyebrow="Avatar"
        title="Visual representation of users and organizations"
        desc="Features automatic name initials fallback, status badge indicators (online, offline, busy, away), and smooth loading states."
      />

      <div className="nx-grid-2 r-4060" style={{ marginBottom: 16 }}>
        <div className="nx-preview-pane">
          <div className="nx-preview-label">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2"/><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" opacity=".3"/></svg>
            Preview
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyCenter: "center", gap: "16px", padding: "10px 0" }}>
            {/* Circular Image with Online Status */}
            <span className="relative inline-flex shrink-0 items-center justify-center overflow-hidden select-none bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full h-12 w-12 border border-zinc-200/50 dark:border-zinc-800">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" 
                className="h-full w-full object-cover" 
                alt="Jane Doe" 
              />
              <span className="absolute rounded-full ring-2 ring-white dark:ring-zinc-950 bg-emerald-500 h-3.5 w-3.5 bottom-0 right-0" />
            </span>

            {/* Initials with Away Status */}
            <span className="relative inline-flex shrink-0 items-center justify-center overflow-hidden select-none bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-full h-10 w-10 font-semibold text-xs border border-zinc-200 dark:border-zinc-700">
              SG
              <span className="absolute rounded-full ring-2 ring-white dark:ring-zinc-950 bg-amber-500 h-2.5 w-2.5 bottom-0 right-0" />
            </span>

            {/* Square Avatar */}
            <span className="relative inline-flex shrink-0 items-center justify-center overflow-hidden select-none bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-lg h-10 w-10 font-semibold text-xs border border-zinc-200 dark:border-zinc-700">
              NX
            </span>

            {/* Fallback Placeholder (User Icon) */}
            <span className="relative inline-flex shrink-0 items-center justify-center overflow-hidden select-none bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 rounded-full h-8 w-8 border border-zinc-200 dark:border-zinc-800">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>
          </div>
        </div>

        <CodeBlock
          filename="user-profile.tsx"
          code={`import { Avatar } from "@/components/avatar";

export function UserProfile() {
  return (
    <div className="flex items-center gap-4">
      {/* Circle Image Avatar with Status */}
      <Avatar
        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
        name="Jane Doe"
        status="online"
      />

      {/* Initials Fallback Avatar */}
      <Avatar name="Someswar Gorai" status="away" />

      {/* Square Team Avatar */}
      <Avatar shape="square" name="Nexonx" />
    </div>
  );
}`}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <DocsTable
          headers={["Prop", "Values", "Default"]}
          rows={[
            ["shape",      "circle · square",                                    "circle"],
            ["size",       "xs · sm · md · lg · xl",                             "md"],
            ["src",        "string - image source url",                          "—"],
            ["alt",        "string - image alt description",                     "—"],
            ["name",       "string - generates initials automatically",          "—"],
            ["status",     "online · offline · away · busy",                     "—"],
            ["showStatus", "boolean - whether to display status dot",             "true"],
          ]}
        />
        <DocsTable headers={["Shape", "Use case"]} rows={avatarVariants} />
      </div>
    </section>
  );
}
