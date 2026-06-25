"use client";

import React, { useState, useEffect } from "react";
import {
  navItems,
  navIcons,
  IconGitHub,
  IconSun,
  IconMoon,
  IconArrow,
} from "@/components/DocsShared";

import OverviewSection from "@/components/sections/OverviewSection";
import InstallSection from "@/components/sections/InstallSection";
import CliSection from "@/components/sections/CliSection";
import AvatarSection from "@/components/sections/AvatarSection";
import BadgeSection from "@/components/sections/BadgeSection";
import ButtonSection from "@/components/sections/ButtonSection";
import CardSection from "@/components/sections/CardSection";
import IconSection from "@/components/sections/IconSection";
import InputSection from "@/components/sections/InputSection";
import SliderSection from "@/components/sections/SliderSection";
import LoaderSection from "@/components/sections/LoaderSection";
import SeparatorSection from "@/components/sections/SeparatorSection";
import TypographySection from "@/components/sections/TypographySection";
import RegistrySection from "@/components/sections/RegistrySection";
import CustomizeSection from "@/components/sections/CustomizeSection";

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const attr = document.documentElement.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") {
      setTimeout(() => setTheme(attr as "light" | "dark"), 0);
    }
    setTimeout(() => setMounted(true), 0);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("nx-theme", next);
    } catch (_) {}
  };

  return (
    <div className="nx-page">
      <header className="nx-header">
        <div className="nx-header-inner">
          <a href="#overview" className="nx-logo">
            <div className="nx-logo-mark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" opacity=".95">
                <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div className="nx-logo-text flex gap-2 items-center">
              <span className="nx-logo-name">Nexonx</span>
              <span className="nx-logo-sub hidden sm:block">Component Library</span>
            </div>
          </a>

          <div className="nx-spacer" />

          <div className="nx-header-actions">
            <a
              href="https://github.com/someswargorai/nexonx_lib.git"
              target="_blank"
              rel="noreferrer"
              className="nx-theme-btn"
              aria-label="GitHub Repository"
            >
              <IconGitHub />
            </a>
            <button
              className="nx-theme-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              suppressHydrationWarning
            >
              {mounted ? (theme === "dark" ? <IconSun /> : <IconMoon />) : <IconSun />}
            </button>
            <a href="#install" className="nx-btn-cta">
              Get started <IconArrow />
            </a>
          </div>
        </div>
      </header>

      <div className="nx-body">
        {/* Sidebar */}
        <aside className="nx-sidebar">
          <div className="nx-sidebar-inner">
            <p className="nx-sidebar-label">On this page</p>
            <nav className="nx-sidebar-nav">
              {navItems.map((item) => {
                const Icon = navIcons[item.id];
                return (
                  <a key={item.id} href={`#${item.id}`} className="nx-sidebar-link">
                    <Icon />
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="nx-content">
          <OverviewSection />
          <InstallSection />
          <CliSection />
          
          <AvatarSection />
          <BadgeSection />
          <ButtonSection />
          <CardSection />
          <IconSection />
          <InputSection />
          <SliderSection />
          <LoaderSection />
          <SeparatorSection />
          <TypographySection />
          
          <RegistrySection />
          <CustomizeSection />
        </main>
      </div>

      <footer className="nx-footer">
        <div className="nx-footer-brand">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          Built with <strong>Nexonx</strong>
        </div>
        <div className="nx-footer-links">
          <a href="https://github.com/someswargorai/nexonx_lib.git" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/someswar-gorai-3a12582b3/" target="_blank" rel="noreferrer">
            Linkedin
          </a>
        </div>
      </footer>
    </div>
  );
}
