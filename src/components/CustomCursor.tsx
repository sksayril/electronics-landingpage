"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Using refs for animation loop to achieve smooth 60fps trail lag
  const trailPosition = useRef({ x: -100, y: -100 });
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Disable on touch devices
    const isTouchDevice = 
      "ontouchstart" in window || 
      navigator.maxTouchPoints > 0 || 
      (window.matchMedia && window.matchMedia("(max-width: 768px)").matches);
      
    if (isTouchDevice) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive = 
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("cursor-pointer") ||
        target.getAttribute("role") === "button";
        
      setIsHovered(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Smooth trail calculation inside animation loop
  useEffect(() => {
    if (!isVisible) return;
    
    let animationFrameId: number;
    
    const updateTrail = () => {
      const dx = position.x - trailPosition.current.x;
      const dy = position.y - trailPosition.current.y;
      
      // Interpolate coordinates
      trailPosition.current.x += dx * 0.15;
      trailPosition.current.y += dy * 0.15;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${trailPosition.current.x}px, ${trailPosition.current.y}px, 0) translate(-50%, -50%) scale(${isHovered ? 1.5 : 1})`;
      }
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`;
      }
      
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    animationFrameId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, isVisible, isHovered]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Lag Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-red pointer-events-none z-50 transition-all duration-300 ease-out mix-blend-difference"
        style={{
          backgroundColor: isHovered ? "rgba(165, 0, 52, 0.15)" : "transparent",
          borderColor: isHovered ? "rgba(165, 0, 52, 0.8)" : "rgba(165, 0, 52, 0.5)",
        }}
      />
      
      {/* Inner Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-brand-red rounded-full pointer-events-none z-50"
      />

      {/* Hide default cursor on desktop screens */}
      <style jsx global>{`
        @media (min-width: 769px) {
          body, a, button, [role="button"], input, select, textarea {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
