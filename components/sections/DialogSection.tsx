"use client";

import React, { useState } from "react";
import { CodeBlock, SectionHead, DocsTable } from "@/components/DocsShared";

/* ── Tiny inline SVG icons ── */
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
);

const AlertTriangle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" />
  </svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
  </svg>
);

const CheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
  </svg>
);

/* ── Shared inline‑preview dialog chrome (no portal, pure visual) ── */
function InlineDialogShell({
  title,
  description,
  children,
  footer,
  hideClose,
  headerIcon,
  headerIconBg,
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  hideClose?: boolean;
  headerIcon?: React.ReactNode;
  headerIconBg?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 360,
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid var(--c-border, rgba(255,255,255,0.08))",
        boxShadow: "0 12px 40px -6px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)",
      }}
      className="bg-white dark:bg-zinc-900"
    >
      {/* Header */}
      {(title || !hideClose) && (
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            padding: "20px 24px 18px",
            borderBottom: "1px solid var(--c-border, rgba(255,255,255,0.08))",
          }}
        >
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            {headerIcon && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: headerIconBg || "rgba(255,255,255,0.06)",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                {headerIcon}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {title && (
                <p className="text-[14px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {title}
                </p>
              )}
              {description && (
                <p className="text-[13px] text-zinc-500 dark:text-zinc-400" style={{ lineHeight: 1.55 }}>
                  {description}
                </p>
              )}
            </div>
          </div>
          {!hideClose && (
            <button
              type="button"
              className="flex shrink-0 items-center justify-center rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-white/10 dark:hover:text-zinc-300"
              style={{ marginTop: 1 }}
            >
              <XIcon />
            </button>
          )}
        </div>
      )}

      {/* Body */}
      {children && (
        <div className="text-sm text-zinc-600 dark:text-zinc-300" style={{ padding: "20px 24px" }}>
          {children}
        </div>
      )}

      {/* Footer */}
      {footer && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            padding: "14px 24px",
            borderTop: "1px solid var(--c-border, rgba(255,255,255,0.08))",
          }}
          className="bg-zinc-50 dark:bg-white/[0.025]"
        >
          {footer}
        </div>
      )}
    </div>
  );
}

/* ── Mini button helpers ── */
function Btn({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "destructive";
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-[13px] font-medium transition-colors cursor-pointer";
  const variants: Record<string, string> = {
    default:
      "bg-zinc-900 text-white! hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100",
    secondary:
      "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-white/10 dark:text-zinc-300 dark:hover:bg-white/15",
    outline:
      "border border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500/90 dark:hover:bg-red-500",
  };
  return <button className={`${base} ${variants[variant]}`}>{children}</button>;
}

/* ── Field mock ── */
function FieldMock({
  label,
  value,
  type = "text",
}: {
  label?: string;
  value: string;
  type?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {label && (
        <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300">
          {label}
        </label>
      )}
      <div className="flex h-10 w-full items-center rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-sm" style={{ padding: "0 14px" }}>
        <span className="text-zinc-500 dark:text-zinc-400">
          {type === "password" ? "••••••••••" : value}
        </span>
      </div>
    </div>
  );
}

export default function DialogSection() {
  const [activeTab, setActiveTab] = useState<
    "basic" | "confirm" | "delete" | "form" | "info" | "success"
  >("basic");

  const tabs = [
    { id: "basic" as const, label: "Basic" },
    { id: "confirm" as const, label: "Confirm" },
    { id: "delete" as const, label: "Destructive" },
    { id: "form" as const, label: "Form" },
    { id: "info" as const, label: "Info" },
    { id: "success" as const, label: "Success" },
  ];

  return (
    <section id="dialog">
      <SectionHead
        eyebrow="Dialog"
        title="Modals, confirmations, and overlays"
        desc="An accessible, animated dialog component with portal rendering, keyboard handling, backdrop dismiss, and flexible layout slots for headers, body content, and footers."
      />

      <div className="nx-grid-2 r-4060" style={{ marginBottom: 32 }}>
        {/* ── Preview Pane ── */}
        <div
          className="nx-preview-pane"
          style={{ padding: "24px 24px 28px" }}
        >
          <div className="nx-preview-label">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="2" />
              <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" opacity=".3" />
            </svg>
            Preview
          </div>

          {/* Tab bar */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 28,
            }}
          >
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className="transition-colors"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  padding: "6px 13px",
                  borderRadius: 8,
                  border: activeTab === t.id ? "1px solid transparent" : "1px solid var(--c-border-2)",
                  cursor: "pointer",
                  background:
                    activeTab === t.id
                      ? "var(--c-accent, #7c6aef)"
                      : "transparent",
                  color:
                    activeTab === t.id
                      ? "#fff"
                      : "var(--c-text-2)",
                  transition: "background 0.15s, color 0.15s, border-color 0.15s",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Dialog preview area — centred with generous top/bottom breathing room */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 260,
              padding: "8px 0 4px",
            }}
          >
            {/* ─── Basic ─── */}
            {activeTab === "basic" && (
              <InlineDialogShell
                title="Edit Profile"
                description="Make changes to your profile here. Click save when you're done."
                footer={
                  <>
                    <Btn variant="outline">Cancel</Btn>
                    <Btn>Save Changes</Btn>
                  </>
                }
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <FieldMock label="Display Name" value="John Doe" />
                  <FieldMock label="Username" value="@johndoe" />
                </div>
              </InlineDialogShell>
            )}

            {/* ─── Confirmation ─── */}
            {activeTab === "confirm" && (
              <InlineDialogShell
                title="Unsaved Changes"
                description="You have unsaved changes. Do you want to save them before leaving this page?"
                footer={
                  <>
                    <Btn variant="outline">Discard</Btn>
                    <Btn >Save Changes</Btn>
                  </>
                }
              />
            )}

            {/* ─── Destructive / Delete ─── */}
            {activeTab === "delete" && (
              <InlineDialogShell
                title="Delete Project"
                description="This action cannot be undone. All associated data, files, and collaborators will be permanently removed."
                headerIcon={
                  <span className="text-red-500">
                    <AlertTriangle />
                  </span>
                }
                headerIconBg="rgba(239,68,68,0.12)"
                footer={
                  <>
                    <Btn variant="outline">Cancel</Btn>
                    <Btn variant="destructive">Delete Forever</Btn>
                  </>
                }
              />
            )}

            {/* ─── Form Dialog ─── */}
            {activeTab === "form" && (
              <InlineDialogShell
                title="Invite Team Members"
                description="Send invitations to collaborate on this workspace."
                footer={
                  <>
                    <Btn variant="outline">Cancel</Btn>
                    <Btn>Send Invites</Btn>
                  </>
                }
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <FieldMock label="Email Addresses" value="team@company.com" />
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300">
                      Role
                    </label>
                    <div className="flex h-10 w-full items-center justify-between rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-sm" style={{ padding: "0 14px" }}>
                      <span className="text-zinc-500 dark:text-zinc-400">Editor</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-400">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-300">
                      Message <span className="font-normal opacity-60">(optional)</span>
                    </label>
                    <div
                      className="flex w-full rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-sm"
                      style={{ minHeight: 72, alignItems: "flex-start", padding: "12px 14px" }}
                    >
                      <span className="text-zinc-400 dark:text-zinc-500">Add a personal note...</span>
                    </div>
                  </div>
                </div>
              </InlineDialogShell>
            )}

            {/* ─── Info / Announcement ─── */}
            {activeTab === "info" && (
              <InlineDialogShell
                title="What's New in v2.4"
                description="Check out the latest improvements to your workflow."
                headerIcon={
                  <span className="text-blue-500">
                    <InfoIcon />
                  </span>
                }
                headerIconBg="rgba(59,130,246,0.12)"
                footer={<Btn>Got it</Btn>}
              >
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    paddingLeft: 0,
                    listStyle: "none",
                  }}
                >
                  {[
                    "Keyboard shortcuts for quick navigation",
                    "Dark mode auto-detection from OS settings",
                    "Improved dialog animations and focus trapping",
                  ].map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span className="mt-0.5 text-blue-500 shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </InlineDialogShell>
            )}

            {/* ─── Success ─── */}
            {activeTab === "success" && (
              <InlineDialogShell
                title="Payment Successful"
                description="Your subscription has been activated. You now have access to all Pro features."
                headerIcon={
                  <span className="text-emerald-500">
                    <CheckCircle />
                  </span>
                }
                headerIconBg="rgba(16,185,129,0.12)"
                footer={
                  <>
                    <Btn variant="outline">View Receipt</Btn>
                    <Btn>Go to Dashboard</Btn>
                  </>
                }
              />
            )}
          </div>
        </div>

        <CodeBlock
          filename="dialog-examples.tsx"
          code={`import { Dialog } from "@/components/dialog";
import { useState } from "react";
import { Button } from "@/components/button";

export function BasicDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Edit Profile
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Edit Profile"
        description="Make changes to your profile."
        footer={
          <>
            <Button variant="outline"
              onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </>
        }
      >
        <form className="space-y-4">
          <Input label="Name" defaultValue="John" />
          <Input label="Username" defaultValue="@johndoe" />
        </form>
      </Dialog>
    </>
  );
}

// Destructive confirmation
export function DeleteDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      size="sm"
      title="Delete Project"
      description="This cannot be undone."
      footer={
        <>
          <Button variant="outline"
            onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive">
            Delete Forever
          </Button>
        </>
      }
    />
  );
}

// Non-dismissible (modal)
export function BlockingDialog() {
  return (
    <Dialog
      open={true}
      onOpenChange={() => {}}
      closeOnBackdropClick={false}
      closeOnEscape={false}
      hideCloseButton
      title="Processing..."
      size="sm"
    >
      <p>Please wait while we save…</p>
    </Dialog>
  );
}`}
        />
      </div>

      {/* ── Size comparison strip ── */}
      <div
        style={{
          marginBottom: 32,
          padding: "24px",
          borderRadius: 12,
          border: "1px solid var(--c-border)",
          background: "var(--c-surface)",
        }}
      >
        <p
          className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400"
          style={{ marginBottom: 18 }}
        >
          Size Variants
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "flex-start",
          }}
        >
          {(["sm", "md", "lg", "xl"] as const).map((sz) => {
            const widths = { sm: 200, md: 250, lg: 310, xl: 370 };
            const maxWLabels = {
              sm: "max-w-xs  — 320px",
              md: "max-w-sm  — 384px",
              lg: "max-w-md  — 448px",
              xl: "max-w-lg  — 512px",
            };
            return (
              <div
                key={sz}
                style={{
                  width: widths[sz],
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid var(--c-border, rgba(255,255,255,0.08))",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                }}
                className="bg-white dark:bg-zinc-900"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    borderBottom:
                      "1px solid var(--c-border, rgba(255,255,255,0.08))",
                  }}
                >
                  <p className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-50">
                    size={" "}
                    <code className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-white/10 text-zinc-600 dark:text-zinc-300">
                      {sz}
                    </code>
                  </p>
                  <span className="text-zinc-400 dark:text-zinc-500">
                    <XIcon />
                  </span>
                </div>
                <div
                  className="text-[12px] text-zinc-500 dark:text-zinc-400"
                  style={{ padding: "10px 16px 12px" }}
                >
                  {maxWLabels[sz]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Tables ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <DocsTable
          headers={["Prop", "Type / Values", "Default"]}
          rows={[
            ["open",                 "boolean — controls dialog visibility (controlled)",           "—"],
            ["onOpenChange",         "(open: boolean) => void — called when state changes",         "—"],
            ["title",                "ReactNode — rendered in the header",                           "—"],
            ["description",          "ReactNode — subtitle beneath the title",                       "—"],
            ["children",             "ReactNode — main body content",                                "—"],
            ["footer",               "ReactNode — content in the bottom footer bar",                 "—"],
            ["size",                 "sm · md · lg · xl — max-width of the panel",                   "md"],
            ["closeOnBackdropClick", "boolean — close when clicking backdrop overlay",               "true"],
            ["closeOnEscape",        "boolean — close on Escape key press",                          "true"],
            ["hideCloseButton",      "boolean — hide the X close button in header",                  "false"],
            ["className",            "string — classes on the dialog panel",                         "—"],
            ["overlayClassName",     "string — classes on the backdrop overlay",                     "—"],
            ["headerClassName",      "string — classes on the header container",                     "—"],
            ["titleClassName",       "string — classes on the title element",                        "—"],
            ["descriptionClassName", "string — classes on the description element",                  "—"],
            ["bodyClassName",        "string — classes on the body content area",                    "—"],
            ["footerClassName",      "string — classes on the footer container",                    "—"],
            ["closeButtonClassName",  "string — classes on the close X button",                      "—"],
          ]}
        />

        <DocsTable
          headers={["Feature", "Description"]}
          rows={[
            ["Portal rendering",   "Dialog is rendered via createPortal to document.body to avoid z-index/overflow issues."],
            ["Animate in/out",     "Smooth scale + opacity transitions on open and close with transitionEnd cleanup."],
            ["Keyboard handling",  "Escape key closes the dialog. Focus is trapped to the panel on open."],
            ["Scroll lock",        "document.body overflow is set to hidden while the dialog is open."],
            ["Backdrop dismiss",   "Clicking the overlay closes the dialog (configurable via closeOnBackdropClick)."],
            ["Accessible",         "Uses role=\"dialog\", aria-modal, aria-labelledby, and aria-describedby attributes."],
          ]}
        />
      </div>
    </section>
  );
}
