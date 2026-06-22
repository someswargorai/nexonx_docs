"use client";

import React from "react";
import { CodeBlock, SectionHead, DocsTable } from "@/components/DocsShared";

const inputVariants = [
  ["default",  "Standard input styling. Clean border with subtle shadow and focus rings."],
  ["error",    "Red accented state for validation failures and error messages."],
  ["success",  "Emerald green accented state for successful operations or valid entries."],
];

export default function InputSection() {
  return (
    <section id="input">
      <SectionHead
        eyebrow="Input"
        title="Form controls, search inputs, and text fields"
        desc="A fully-featured text field component with automatic labels, helper/error text layout, leading/trailing icons, clearable fields, and password visibility toggles."
      />

      <div className="nx-grid-2 r-4060" style={{ marginBottom: 16 }}>
        <div className="nx-preview-pane">
          <div className="nx-preview-label">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2"/><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" opacity=".3"/></svg>
            Preview
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "8px 0" }}>
            
            {/* Email Input with Leading Icon */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Email Address</label>
              <div className="relative flex h-10 w-full items-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3! text-sm gap-2 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 ease-out">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 dark:text-zinc-500 shrink-0">
                  <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  className="h-full w-full bg-transparent text-zinc-900 placeholder:text-zinc-400 dark:text-zinc-50 dark:placeholder:text-zinc-500 outline-none" 
                  defaultValue="test@nexonx.com"
                />
                <button type="button" className="flex items-center justify-center rounded-md p-0.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-white/10 transition-colors shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Password Input with Show/Hide toggle */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Password</label>
              <div className="relative flex h-10 w-full items-center rounded-md border border-red-500/50 dark:border-red-500/40 bg-white dark:bg-zinc-950 px-3! text-sm gap-2 shadow-sm hover:border-red-500/80 dark:hover:border-red-500/60 transition-all duration-200 ease-out">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 dark:text-zinc-500 shrink-0">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input 
                  type="password" 
                  defaultValue="12345" 
                  className="h-full w-full bg-transparent text-zinc-900 dark:text-zinc-50 outline-none" 
                />
                <button type="button" className="flex items-center justify-center rounded-md p-0.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-white/10 transition-colors shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>
                  </svg>
                </button>
              </div>
              <p className="flex items-center gap-1 text-[11px] font-medium text-red-600 dark:text-red-400">Invalid username or password</p>
            </div>

            {/* Quick Search */}
            <div className="flex flex-col gap-1.5 w-full">
              <div className="relative flex h-12 w-full items-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3! text-base gap-2 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 ease-out">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 dark:text-zinc-500 shrink-0">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Search components..." 
                  className="h-full w-full bg-transparent text-zinc-900 placeholder:text-zinc-400 dark:text-zinc-50 dark:placeholder:text-zinc-500 outline-none" 
                />
              </div>
            </div>

          </div>
        </div>

        <CodeBlock
          filename="login-form.tsx"
          code={`import { Input } from "@/components/input";
import { Mail, Lock, Search } from "lucide-react";

export function LoginForm() {
  return (
    <div className="space-y-4 max-w-sm">
      {/* Email Input with Leading Icon */}
      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        leadingIcon={<Mail />}
        clearable
      />

      {/* Password Input with Show/Hide toggle */}
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        leadingIcon={<Lock />}
        passwordToggle
        errorText="Invalid username or password"
      />

      {/* Quick Search */}
      <Input
        placeholder="Search components..."
        leadingIcon={<Search />}
        size="lg"
      />
    </div>
  );
}`}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <DocsTable
          headers={["Prop", "Values", "Default"]}
          rows={[
            ["label",               "string - form field label element",                     "—"],
            ["size",                "sm (36px) · md (40px) · lg (48px)",                     "md"],
            ["state",               "default · error · success",                              "default"],
            ["success",             "boolean - force success outline state",                 "false"],
            ["helperText",          "string - helper information caption",                   "—"],
            ["errorText",           "string - error description / validation text",          "—"],
            ["leadingIcon",         "ReactNode - element placed inside left margin",         "—"],
            ["trailingIcon",        "ReactNode - element placed inside right margin",        "—"],
            ["clearable",           "boolean - show clear button when input has value",     "false"],
            ["passwordToggle",      "boolean - show password visibility control button",      "false"],
            ["containerClassName",  "string - style wrappers classes",                        "—"],
            ["labelClassName",      "string - style label element classes",                  "—"],
          ]}
        />
        <DocsTable headers={["State", "Description"]} rows={inputVariants} />
      </div>
    </section>
  );
}
