"use client";

import { CodeBlock, SectionHead, DocsTable } from "@/components/DocsShared";

const copiedFiles = [
  ["avatar",          "components/avatar.tsx"],
  ["badge",           "components/badge.tsx"],
  ["button",          "components/button.tsx"],
  ["card",            "components/card.tsx"],
  ["input",           "components/input.tsx"],
  ["icon",            "components/icon.tsx"],
  ["loader",          "components/loader.tsx"],
  ["separator",       "components/separator.tsx"],
  ["typography",      "components/typography.tsx"],
  ["shared utility",  "lib/utils/cn.tsx"],
  ["Tailwind config", "postcss.config.mjs (checks configuration on load)"],
  ["Global CSS",      "app/globals.css, src/app/globals.css, or styles/globals.css"],
];

const registryJson = `{
  "card": {
    "files": ["components/card.tsx"]
  },
  "button": {
    "files": ["components/button.tsx"]
  },
  "loader": {
    "files": ["components/loader.tsx"]
  },
  "avatar": {
    "files": ["components/avatar.tsx"]
  },
  "separator": {
    "files": ["components/separator.tsx"]
  },
  "typography": {
    "files": ["components/typography.tsx"]
  },
  "icon": {
    "files": ["components/icon.tsx"]
  },
  "badge": {
    "files": ["components/badge.tsx"]
  },
  "input": {
    "files": ["components/input.tsx"]
  },
}`;

export default function RegistrySection() {
  return (
    <section id="registry">
      <SectionHead
        eyebrow="Registry"
        title="What the package copies"
        desc={<>Components are registered in <code>registry/components.json</code>. Each entry points to the files the CLI copies into the consuming project.</>}
      />

      <div className="nx-grid-2 r-6040">
        <CodeBlock
          filename="registry/components.json"
          code={registryJson}
        />
        <DocsTable headers={["Item", "Path or behavior"]} rows={copiedFiles} />
      </div>
    </section>
  );
}
