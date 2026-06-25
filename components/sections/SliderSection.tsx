"use client";

import React, { useState } from "react";
import { CodeBlock, SectionHead, DocsTable } from "@/components/DocsShared";

export default function SliderSection() {
  const [value1, setValue1] = useState(72);
  const [value2, setValue2] = useState(35);
  const [value3, setValue3] = useState(50);

  /* ── track geometry (matches component defaults) ── */
  const trackWidth = 280;
  const trackPad = 3;
  const outerW = trackWidth + trackPad * 2;

  /* ── default color tokens ── */
  const c = {
    trackGradient: "linear-gradient(180deg, #1C1E24 0%, #0E0F12 100%)",
    channelBg: "#1A1C22",
    fillGradient: "linear-gradient(90deg, #3D4B66 0%, #5B7FE0 60%, #7FB2FF 100%)",
    glow: "127,178,255",
    handleGradient: "linear-gradient(155deg, #4A4D57 0%, #232529 70%)",
    dotColor: "#7FB2FF",
    readoutBg: "#1A1C22",
    readoutBorder: "#3A4254",
    readoutText: "#9CC4FF",
    readoutSuffix: "#5B7FE0",
    label: "#4A4D57",
  };

  /* ── warm color tokens for second slider ── */
  const warm = {
    trackGradient: "linear-gradient(180deg, #241C1C 0%, #120E0E 100%)",
    channelBg: "#221A1A",
    fillGradient: "linear-gradient(90deg, #664B3D 0%, #E07F5B 60%, #FF9F7F 100%)",
    glow: "255,159,127",
    handleGradient: "linear-gradient(155deg, #574D4A 0%, #292523 70%)",
    dotColor: "#FF9F7F",
    readoutBg: "#221A1A",
    readoutBorder: "#544238",
    readoutText: "#FFC49C",
    readoutSuffix: "#E07F5B",
    label: "#574A4A",
  };

  const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

  /* ── mini-slider renderer ── */
  const MiniSlider = ({
    val,
    setVal,
    colors,
    unit = "%",
    labelText = "Drag to adjust",
    min = 0,
    max = 100,
  }: {
    val: number;
    setVal: (v: number) => void;
    colors: typeof c;
    unit?: string;
    labelText?: string;
    min?: number;
    max?: number;
  }) => {
    const range = max - min;
    const ratio = range === 0 ? 0 : (val - min) / range;
    const fillW = clamp(ratio, 0, 1) * trackWidth;
    const display = String(Math.round(val)).padStart(2, "0");

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      const track = e.currentTarget;
      const rect = track.getBoundingClientRect();

      const update = (clientX: number) => {
        const x = clamp(clientX - rect.left - trackPad, 0, trackWidth);
        const raw = min + (x / trackWidth) * range;
        setVal(Math.round(raw));
      };

      update(e.clientX);

      const onMove = (ev: PointerEvent) => update(ev.clientX);
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", userSelect: "none" }}>
        {/* Readout tooltip */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `translateX(${fillW - trackWidth / 2}px)`,
            marginBottom: 6,
            transition: "transform 60ms ease-out",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 3,
              borderRadius: 8,
              padding: "5px 10px",
              background: colors.readoutBg,
              border: `1px solid ${colors.readoutBorder}`,
              boxShadow: `0 8px 20px -4px rgba(0,0,0,0.5), 0 0 18px -2px rgba(${colors.glow},0.4), inset 0 1px 0 rgba(255,255,255,0.06)`,
            }}
          >
            <span
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                fontSize: 20,
                fontWeight: 500,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: colors.readoutText,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {display}
            </span>
            {unit && (
              <span
                style={{
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                  fontSize: 11,
                  lineHeight: 1,
                  color: colors.readoutSuffix,
                }}
              >
                {unit}
              </span>
            )}
          </div>
          <div
            style={{
              width: 7,
              height: 7,
              marginTop: -4,
              transform: "rotate(45deg)",
              background: colors.readoutBg,
              borderRight: `1px solid ${colors.readoutBorder}`,
              borderBottom: `1px solid ${colors.readoutBorder}`,
            }}
          />
        </div>

        {/* Track */}
        <div
          onPointerDown={handlePointerDown}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            borderRadius: 9999,
            padding: trackPad,
            width: outerW,
            background: colors.trackGradient,
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.6), inset 0 -1px 0 rgba(255,255,255,0.03)",
            touchAction: "none",
            cursor: "pointer",
          }}
        >
          {/* Channel */}
          <div
            style={{
              position: "relative",
              height: 10,
              width: "100%",
              overflow: "hidden",
              borderRadius: 9999,
              background: colors.channelBg,
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.7)",
            }}
          >
            {/* Fill */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: fillW,
                borderRadius: 9999,
                background: colors.fillGradient,
                boxShadow: `0 0 14px 1px rgba(${colors.glow},0.55), inset 0 1px 1px rgba(255,255,255,0.25)`,
                transition: "width 60ms ease-out",
              }}
            />
          </div>

          {/* Handle */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: fillW + trackPad,
              transform: "translate(-50%, -50%)",
              width: 28,
              height: 28,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: colors.handleGradient,
              cursor: "grab",
              boxShadow: `0 0 0 5px rgba(${colors.glow},0.18), 0 2px 8px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.35), inset 0 -1px 2px rgba(0,0,0,0.4)`,
              transition: "left 60ms ease-out",
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: colors.dotColor,
                boxShadow: `0 0 6px 1px ${colors.dotColor}`,
              }}
            />
          </div>
        </div>

        {/* Label */}
        <p
          style={{
            marginTop: 28,
            fontSize: 11,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: colors.label,
          }}
        >
          {labelText}
        </p>
      </div>
    );
  };

  return (
    <section id="slider">
      <SectionHead
        eyebrow="Slider"
        title="Range sliders with precision and style"
        desc="A dark, premium slider control with animated fill, glowing handle, floating readout tooltip, full keyboard accessibility, and customizable color palettes."
      />

      <div className="nx-grid-2 r-4060" style={{ marginBottom: 16 }}>
        <div className="nx-preview-pane">
          <div className="nx-preview-label">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="2"/><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" opacity=".3"/></svg>
            Preview
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 40, padding: "24px 0", alignItems: "center" }}>
            {/* Default blue slider */}
            <MiniSlider val={value1} setVal={setValue1} colors={c} />

            {/* Warm orange slider */}
            <MiniSlider val={value2} setVal={setValue2} colors={warm} unit="px" labelText="Adjust size" />

            {/* Disabled-look slider */}
            <div style={{ opacity: 0.45, pointerEvents: "none" }}>
              <MiniSlider val={value3} setVal={setValue3} colors={c} labelText="Disabled" />
            </div>
          </div>
        </div>

        <CodeBlock
          filename="slider-demo.tsx"
          code={`import { Slider } from "@/components/slider";

export function SliderDemo() {
  const [volume, setVolume] = useState(72);
  const [size, setSize] = useState(35);

  return (
    <div className="space-y-8">
      {/* Default Slider */}
      <Slider
        value={volume}
        onChange={setVolume}
        unit="%"
        label="Drag to adjust"
      />

      {/* Custom colors (warm) */}
      <Slider
        value={size}
        onChange={setSize}
        unit="px"
        label="Adjust size"
        colors={{
          fillGradient: "linear-gradient(90deg, #664B3D, #E07F5B, #FF9F7F)",
          handleDotColor: "#FF9F7F",
          glowColor: "255,159,127",
        }}
      />

      {/* Disabled */}
      <Slider
        value={50}
        onChange={() => {}}
        disabled
        label="Disabled"
      />
    </div>
  );
}`}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <DocsTable
          headers={["Prop", "Type / Values", "Default"]}
          rows={[
            ["value",              "number — current value (controlled)",                 "—"],
            ["onChange",           "(value: number) => void — fires on every change",     "—"],
            ["onChangeCommitted",  "(value: number) => void — fires on drag release",    "—"],
            ["min",                "number — minimum value",                              "0"],
            ["max",                "number — maximum value",                              "100"],
            ["step",               "number — increment per arrow key press",              "1"],
            ["disabled",           "boolean — disables interaction",                      "false"],
            ["trackWidth",         "number — visual track width in px",                   "320"],
            ["unit",               'string — suffix in the readout tooltip',              '"%"'],
            ["padDigits",          "number — zero-pad readout (0 to disable)",            "2"],
            ["label",              "ReactNode — text below the track (null to hide)",     '"Drag to adjust"'],
            ["showReadoutAlways",  "boolean — always show the floating tooltip",          "false"],
            ["hideReadout",        "boolean — completely hide the readout tooltip",       "false"],
            ["formatValue",        "(v: number) => string — custom readout formatter",    "—"],
            ["colors",             "SliderColors — override any color token",             "Default blue theme"],
            ["className",          "string — extra classes on outer wrapper",             "—"],
            ["ariaLabel",          "string — accessible label for screen readers",        '"Slider"'],
          ]}
        />

        <DocsTable
          headers={["Color Token", "Description"]}
          rows={[
            ["trackGradient",     "Outer track bezel gradient (top → bottom)"],
            ["channelBackground", "Unfilled groove background"],
            ["fillGradient",      "Filled portion gradient (left → right)"],
            ["glowColor",         "RGB string for glow effects, e.g. \"127,178,255\""],
            ["handleGradient",    "Metal-look handle gradient"],
            ["handleDotColor",    "Glowing dot inside the handle"],
            ["readoutBackground", "Tooltip background"],
            ["readoutBorder",     "Tooltip border color"],
            ["readoutTextColor",  "Value number text color"],
            ["readoutSuffixColor","Unit suffix text color"],
            ["labelColor",        "Label text below the track"],
            ["pageBackground",    "Standalone demo page background"],
          ]}
        />
      </div>
    </section>
  );
}
