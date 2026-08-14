"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function GateLoader() {
  const [percent, setPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shouldDestroy, setShouldDestroy] = useState(false);

  useEffect(() => {
    // Prevent scrolling during loading phase
    document.body.style.overflow = "hidden";

    // Progress counter animation
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            // Restore body scroll
            document.body.style.overflow = "";
            // Destroy loader node after slide animations complete (1.2s delay)
            setTimeout(() => {
              setShouldDestroy(true);
            }, 1200);
          }, 300);
          return 100;
        }
        // Random incremental jumps for realistic feel
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 60);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (shouldDestroy) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center pointer-events-none" 
      style={{ zIndex: 9999 }}
    >
      {/* Left Gate Panel */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-zinc-950 border-r border-zinc-900/30 transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] pointer-events-auto origin-left ${
          isDone ? "-translate-x-full" : "translate-x-0"
        }`}
      />
      
      {/* Right Gate Panel */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-zinc-950 border-l border-zinc-900/30 transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] pointer-events-auto origin-right ${
          isDone ? "translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Center Logo & Progress overlay */}
      <div
        className={`relative z-10 flex flex-col items-center gap-6 transition-all duration-500 ${
          isDone ? "opacity-0 scale-95 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Pulsating Glowing Logo Container */}
        <div className="relative w-48 h-20 sm:w-56 sm:h-24 bg-white rounded-3xl flex items-center justify-center p-5 shadow-2xl animate-pulse">
          <Image
            src="/images/keuken-logo.png"
            alt="KEUKEN Loading"
            width={180}
            height={60}
            className="w-auto h-12 sm:h-14 object-contain"
            priority
          />
        </div>

        {/* Loading progress bar & label */}
        <div className="flex flex-col items-center gap-2.5 w-48 sm:w-56">
          <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-red transition-all duration-150 ease-out"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
          <div className="flex justify-between w-full text-[9px] sm:text-[10px] text-gray-500 font-extrabold tracking-widest uppercase">
            <span>Configuring Connect™</span>
            <span>{percent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
