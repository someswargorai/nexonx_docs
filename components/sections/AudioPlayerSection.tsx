"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { CodeBlock, SectionHead, DocsTable } from "@/components/DocsShared";

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function fmt(secs: number) {
  if (!isFinite(secs) || isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

/* ─────────────────────────────────────────────
   Inline icon buttons
───────────────────────────────────────────── */
const SkipBackIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M19 20 9 12l10-8v16zm-10 0H7V4h2v16z" />
  </svg>
);
const SkipFwdIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M5 4l10 8-10 8V4zm10 0h2v16h-2V4z" />
  </svg>
);
const PlayIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M8 5v14l11-7L8 5z" />
  </svg>
);
const PauseIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <rect x="6" y="4" width="4" height="16" rx="1" />
    <rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);
const Vol2Icon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);
const VolXIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

/* ─────────────────────────────────────────────
   Track thumb (hover-reveal scrubber handle)
───────────────────────────────────────────── */
function Track({
  ratio,
  onSeek,
  label,
  width,
  accent,
}: {
  ratio: number;
  onSeek: (r: number) => void;
  label: string;
  width?: number | string;
  accent?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);

  const getRatio = useCallback((clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    return clamp((clientX - rect.left) / rect.width, 0, 1);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setDragging(true);
    onSeek(getRatio(e.clientX));
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => onSeek(getRatio(e.clientX));
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, getRatio, onSeek]);

  const fillColor = accent ?? "var(--c-text-1, #111)";

  return (
    <div
      ref={trackRef}
      onPointerDown={onPointerDown}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        position: "relative",
        flex: width ? undefined : 1,
        width: width,
        height: 4,
        borderRadius: 9999,
        background: "var(--c-border-2, rgba(0,0,0,0.12))",
        cursor: "pointer",
        touchAction: "none",
      }}
    >
      {/* fill */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          width: `${ratio * 100}%`,
          borderRadius: 9999,
          background: fillColor,
          transition: dragging ? "none" : "width 60ms linear",
        }}
      />
      {/* thumb */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: `${ratio * 100}%`,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: fillColor,
          opacity: hovering || dragging ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${hovering || dragging ? 1 : 0})`,
          transition: "opacity 150ms, transform 150ms",
          boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   AudioPlayer inline preview — visually exact
   to the real component (no actual audio needed)
───────────────────────────────────────────── */
interface PreviewPlayerProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "elevated" | "ghost";
  imageSrc?: string;
  title?: string;
  subtitle?: string;
  hideSkip?: boolean;
  hideVolume?: boolean;
  accentColor?: string;
  /** 0–1 simulated progress */
  initProgress?: number;
}

function PreviewPlayer({
  size = "md",
  variant = "default",
  imageSrc,
  title,
  subtitle,
  hideSkip = false,
  hideVolume = false,
  accentColor,
  initProgress = 0.38,
}: PreviewPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [seekRatio, setSeekRatio] = useState(initProgress);
  const [volRatio, setVolRatio] = useState(0.72);
  const [muted, setMuted] = useState(false);

  // Simulate playback tick
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (playing) {
      tickRef.current = setInterval(() => {
        setSeekRatio((r) => {
          if (r >= 1) { setPlaying(false); return 0; }
          return r + 0.001;
        });
      }, 50);
    } else if (tickRef.current) {
      clearInterval(tickRef.current);
    }
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [playing]);

  const duration = 213; // 3:33 simulated
  const currentTime = seekRatio * duration;

  const pillarStyles: Record<string, React.CSSProperties> = {
    default: {
      background: "var(--c-surface, #fff)",
      border: "1px solid var(--c-border, rgba(0,0,0,0.08))",
      boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
    },
    elevated: {
      background: "var(--c-surface, #fff)",
      border: "1px solid var(--c-border, rgba(0,0,0,0.06))",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.1)",
    },
    ghost: {
      background: "var(--c-surface-2, #f0f1f7)",
      border: "1px solid var(--c-border, rgba(0,0,0,0.06))",
      boxShadow: "none",
    },
  };

  const hPad = { sm: "8px 20px 8px 8px", md: "12px 24px 12px 12px", lg: "16px 32px 16px 16px" };
  const gap = { sm: 12, md: 16, lg: 20 };
  const imageSize = { sm: 36, md: 40, lg: 44 };
  const playSize = { sm: 32, md: 36, lg: 40 };
  const playIconSize = { sm: 15, md: 17, lg: 19 };
  const skipIconSize = { sm: 13, md: 15, lg: 17 };
  const titleSize = { sm: "11px", md: "12px", lg: "13px" };
  const timeSize = { sm: "10px", md: "11px", lg: "12px" };

  const fill = accentColor ?? "var(--c-text-1, #111)";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        borderRadius: 9999,
        padding: hPad[size],
        gap: gap[size],
        width: "100%",
        userSelect: "none",
        ...pillarStyles[variant],
        paddingLeft:"20px",
        marginBottom:"5px"
      }}
    >
      {/* Cover art */}
      {imageSrc && (
        <div
          style={{
            width: imageSize[size],
            height: imageSize[size],
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            background: "var(--c-surface-2)",
          }}
        >
          <img src={imageSrc} alt="cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}

      {/* Track info + seek bar */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 5 }}>
        {(title || subtitle) && (
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {title && (
              <p style={{ fontSize: titleSize[size], fontWeight: 500, color: "var(--c-text-1)", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {title}
              </p>
            )}
            {subtitle && (
              <p style={{ fontSize: timeSize[size], color: "var(--c-text-3)", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: timeSize[size], color: "var(--c-text-3)", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>
            {fmt(currentTime)}
          </span>
          <Track ratio={seekRatio} onSeek={setSeekRatio} label="Seek" accent={fill} />
          <span style={{ fontSize: timeSize[size], color: "var(--c-text-3)", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>
            {fmt(duration)}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
        {!hideSkip && (
          <button
            onClick={() => setSeekRatio((r) => clamp(r - 0.01, 0, 1))}
            aria-label="Back"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: playSize[size] - 4, height: playSize[size] - 4, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", color: "var(--c-text-2)" }}
          >
            <SkipBackIcon size={skipIconSize[size]} />
          </button>
        )}

        {/* Play / Pause */}
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause" : "Play"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: playSize[size],
            height: playSize[size],
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            background: fill,
            color: "#fff",
            transition: "opacity 0.12s",
            flexShrink: 0,
          }}
        >
          {playing ? <PauseIcon size={playIconSize[size]} /> : <PlayIcon size={playIconSize[size]} />}
        </button>

        {!hideSkip && (
          <button
            onClick={() => setSeekRatio((r) => clamp(r + 0.01, 0, 1))}
            aria-label="Forward"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", width: playSize[size] - 4, height: playSize[size] - 4, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", color: "var(--c-text-2)" }}
          >
            <SkipFwdIcon size={skipIconSize[size]} />
          </button>
        )}

        {!hideVolume && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 4 }}>
            <button
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Unmute" : "Mute"}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer", color: "var(--c-text-2)", flexShrink: 0 }}
            >
              {muted ? <VolXIcon size={skipIconSize[size]} /> : <Vol2Icon size={skipIconSize[size]} />}
            </button>
            <Track ratio={muted ? 0 : volRatio} onSeek={setVolRatio} label="Volume" width={52} accent={fill} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Fake cover art (gradient circle as placeholder)
───────────────────────────────────────────── */
const COVERS = [
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=80&h=80&fit=crop",
];

/* ─────────────────────────────────────────────
   Section
───────────────────────────────────────────── */
export default function AudioPlayerSection() {
  return (
    <section id="audio-player">
      <SectionHead
        eyebrow="Audio Player"
        title="Compact, pill-shaped audio controls"
        desc="A fully-featured audio player component with seek bar, volume slider, skip controls, cover art, and three visual variants — all contained in a sleek rounded-pill layout."
      />

      {/* ── Main grid: preview + code ── */}
      <div className="nx-grid-2 r-4060" style={{ marginBottom: 32 }}>
        <div className="nx-preview-pane" style={{ padding: "24px 24px 28px" }}>
          <div className="nx-preview-label">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="2" /><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" opacity=".3" />
            </svg>
            Preview — click play to simulate
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* size=md, default, with cover + title */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--c-text-3)", marginBottom: 10 }}>
                Default · md · with cover art
              </p>
              <PreviewPlayer
                title="Midnight in Tokyo"
                subtitle="Lo-fi Collective"
                imageSrc={COVERS[0]}
                initProgress={0.38}
              />
            </div>

            {/* size=sm, ghost, no image */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--c-text-3)", marginBottom: 10 }}>
                Ghost · sm · no cover
              </p>
              <PreviewPlayer
                size="sm"
                variant="ghost"
                title="Rain on Glass"
                subtitle="Ambient Series"
                initProgress={0.6}
              />
            </div>

            {/* size=lg, elevated, with cover, no skip */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--c-text-3)", marginBottom: 10 }}>
                Elevated · lg · no skip buttons
              </p>
              <PreviewPlayer
                size="lg"
                variant="elevated"
                title="Synthwave Drive"
                subtitle="Neon Pulse"
                imageSrc={COVERS[1]}
                hideSkip
                initProgress={0.2}
              />
            </div>

            {/* hideVolume + hideSkip — minimal */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--c-text-3)", marginBottom: 10 }}>
                Minimal — hide volume & skip
              </p>
              <PreviewPlayer
                title="Morning Calm"
                hideSkip
                hideVolume
                initProgress={0.15}
                accentColor="var(--c-accent)"
              />
            </div>
          </div>
        </div>

        <CodeBlock
          filename="audio-player-demo.tsx"
          code={`import { AudioPlayer } from "@/components/audio-player";

// Default with cover art and metadata
<AudioPlayer
  src="/audio/track.mp3"
  title="Midnight in Tokyo"
  subtitle="Lo-fi Collective"
  imageSrc="/covers/midnight.jpg"
/>

// Small ghost variant, no image
<AudioPlayer
  src="/audio/rain.mp3"
  title="Rain on Glass"
  subtitle="Ambient Series"
  size="sm"
  variant="ghost"
/>

// Large elevated, skip hidden
<AudioPlayer
  src="/audio/synth.mp3"
  title="Synthwave Drive"
  size="lg"
  variant="elevated"
  imageSrc="/covers/synth.jpg"
  hideSkip
/>

// Minimal — just play + seek
<AudioPlayer
  src="/audio/calm.mp3"
  title="Morning Calm"
  hideSkip
  hideVolume
/>

// With callbacks
<AudioPlayer
  src="/audio/track.mp3"
  skipSeconds={10}
  defaultVolume={0.6}
  loop
  onTimeUpdate={(t, dur) => console.log(t, dur)}
  onEnded={() => playNext()}
/>`}
        />
      </div>

      {/* ── Variant showcase strip ── */}
      <div
        style={{
          marginBottom: 32,
          padding: "24px",
          borderRadius: 12,
          border: "1px solid var(--c-border)",
          background: "var(--c-surface)",
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400" style={{ marginBottom: 20 }}>
          Variant Comparison
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {(["default", "elevated", "ghost"] as const).map((v) => (
            <div key={v} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ width: 68, flexShrink: 0, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--c-text-3)" }}>
                {v}
              </span>
              <div style={{ flex: 1 }}>
                <PreviewPlayer
                  variant={v}
                  title={v === "default" ? "Default Variant" : v === "elevated" ? "Elevated Variant" : "Ghost Variant"}
                  subtitle="AudioPlayer"
                  initProgress={v === "default" ? 0.45 : v === "elevated" ? 0.3 : 0.65}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Size showcase strip ── */}
      <div
        style={{
          marginBottom: 32,
          padding: "24px",
          borderRadius: 12,
          border: "1px solid var(--c-border)",
          background: "var(--c-surface)",
        }}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400" style={{ marginBottom: 20 }}>
          Size Variants
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {(["sm", "md", "lg"] as const).map((sz) => (
            <div key={sz} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ width: 68, flexShrink: 0, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--c-text-3)" }}>
                size=&apos;{sz}&apos;
              </span>
              <div style={{ flex: 1 }}>
                <PreviewPlayer
                  size={sz}
                  title={sz === "sm" ? "Small (h-12)" : sz === "md" ? "Medium (h-14)" : "Large (h-16)"}
                  subtitle="pill height"
                  initProgress={sz === "sm" ? 0.55 : sz === "md" ? 0.35 : 0.7}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tables ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <DocsTable
          headers={["Prop", "Type / Values", "Default"]}
          rows={[
            ["src",           "string — audio source URL (required)",                            "—"],
            ["title",         "string — track name shown above the seek bar",                    "—"],
            ["subtitle",      "string — artist or secondary info below title",                   "—"],
            ["imageSrc",      "string — cover art URL rendered as a circle on the left",         "—"],
            ["imageAlt",      "string — alt text for the cover image",                           '""'],
            ["variant",       "default · elevated · ghost — visual style of the pill",           "default"],
            ["size",          "sm (h-12) · md (h-14) · lg (h-16) — controls all element sizes", "md"],
            ["autoPlay",      "boolean — start playing on mount",                                "false"],
            ["loop",          "boolean — loop playback when track ends",                         "false"],
            ["defaultVolume", "number 0–1 — initial volume level",                              "0.8"],
            ["skipSeconds",   "number — seconds skipped per ±skip button press",                 "2"],
            ["hideVolume",    "boolean — hide the mute button and volume slider",                "false"],
            ["hideSkip",      "boolean — hide the SkipBack and SkipForward buttons",             "false"],
            ["width",         "number | string — explicit width; defaults to 100%",              "100%"],
            ["onTimeUpdate",  "(currentTime, duration) => void — fires on every tick",           "—"],
            ["onEnded",       "() => void — fires when playback reaches the end",                "—"],
            ["className",     "string — extra classes on the outer pill element",                "—"],
          ]}
        />

        <DocsTable
          headers={["Feature", "Description"]}
          rows={[
            ["Seek bar",        "Click or drag anywhere on the progress track to jump. Keyboard arrows also work (5% per step)."],
            ["Volume slider",   "Horizontal slider beside the mute icon. Draggable, hover-reveals handle."],
            ["Cover art",       "Pass imageSrc to show a circular thumbnail on the left of the pill."],
            ["Skip buttons",    "SkipBack / SkipForward buttons jump by skipSeconds (default 2s). Hide with hideSkip."],
            ["Mute toggle",     "Volume icon button toggles mute. Restores previous volume on unmute."],
            ["Accessible",      "Seek and volume sliders use role=\"slider\" with aria-valuenow/min/max."],
            ["Pointer events",  "All sliders use the Pointer Events API — works on mouse, touch, and stylus."],
          ]}
        />
      </div>
    </section>
  );
}
