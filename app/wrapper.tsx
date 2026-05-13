"use client";

import Sidebar from "@/components/navigation/Sidebar";
import "./globals.css";
import type { ReactNode } from "react";

export function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="c64-layout-wrapper">
      <Sidebar />
      <main className="c64-main-content">
        <div className="c64-screen-container c64-flicker">
          {children}
        </div>
      </main>
    </div>
  );
}

export function LessonWrapper({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="c64-lesson-wrapper">
      <h1 className="c64-lesson-title">{title}</h1>
      <div className="c64-lesson-content c64-scanner">
        {children}
      </div>
    </div>
  );
}

export function GameWrapper({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="c64-game-wrapper">
      <h1 className="c64-game-title">{title}</h1>
      <div className="c64-game-canvas">
        {children}
      </div>
    </div>
  );
}

export function defaultStyles(): string {
  return "c64-theme";
}

export default AppWrapper;
