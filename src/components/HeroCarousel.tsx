"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight } from "lucide-react";
import Image from "next/image";

interface Slide {
  id: number;
  image: string;
  badge: string;
  title: string;
  description: string;
  features: string[];
  ctaUrl: string;
  ctaText: string;
  bgColor: string;
}

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides: Slide[] = [
    {
      id: 1,
      image: "/images/hero_oled_tv.png",
      badge: "NEW LAUNCH",
      title: "LG OLED evo C4 Series",
      description: "Experience the pinnacle of brightness and detail. Driven by the new α9 Gen7 AI Processor, pixel-level dimming delivers pure blacks and endless contrast.",
      features: ["α9 AI Processor Gen7", "Brightness Booster Max", "144Hz Gaming Refresh Rate", "Dolby Vision & Atmos"],
      ctaUrl: "#tvs",
      ctaText: "Buy OLED TV",
      bgColor: "from-black via-[#0d0d0d] to-zinc-900",
    },
    {
      id: 2,
      image: "/images/hero_refrigerator.png",
      badge: "EXCLUSIVE UPGRADE",
      title: "InstaView® Door-in-Door®",
      description: "Knock twice and see inside without losing cold air. Featuring Linear Cooling™ and Door Cooling+™ to keep food fresh for up to 7 days.",
      features: ["ThinQ® Connected App", "Hygiene Fresh+™ UV Filter", "Craft Ice Maker Built-in", "Inverter Linear Compressor"],
      ctaUrl: "#appliances",
      ctaText: "Explore InstaView",
      bgColor: "from-[#1a1a1a] via-[#101010] to-[#121212]",
    },
    {
      id: 3,
      image: "/images/hero_oled_tv.png", // Re-use or use a CSS/gradient presentation
      badge: "SMART LIVING",
      title: "AI Dual Inverter Air Conditioner",
      description: "Supercharged cooling powered by AI DUAL Inverter technology. Adjusts fan speeds and compressor output automatically based on ambient room diagnostics.",
      features: ["Super Convertible 6-in-1", "PM 1.0 Smart Air Purifier", "100% Copper with Ocean Black protection", "10-Year Compressor Warranty"],
      ctaUrl: "#ac",
      ctaText: "Explore Smart ACs",
      bgColor: "from-zinc-950 via-[#0a0f1d] to-[#0c142c]",
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[550px] sm:h-[650px] lg:h-[720px] bg-black text-white overflow-hidden">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out flex flex-col justify-center ${
              idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image / Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-90 z-0`}></div>
            
            {/* Slide Image */}
            <div className="absolute inset-0 w-full h-full z-0 opacity-40 sm:opacity-55 mix-blend-screen md:mix-blend-normal">
              {/* If it's slide 3, we can render a beautiful CSS grid graphic overlay for smart AC to make it look unique */}
              {slide.id === 3 ? (
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/40 via-blue-900/20 to-brand-red/10 flex items-center justify-end pr-20">
                  <div className="w-[450px] h-[450px] border border-cyan-500/20 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-[300px] h-[300px] border border-cyan-500/30 rounded-full flex items-center justify-center">
                      <div className="w-[150px] h-[150px] bg-gradient-to-br from-cyan-500/20 to-blue-600/30 rounded-full blur-xl"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={idx === 0}
                  className="object-cover object-right md:object-center"
                />
              )}
            </div>

            {/* Content Content Container */}
            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 w-full z-20 flex flex-col md:grid md:grid-cols-12 gap-8 items-center pt-8">
              
              {/* Text Area */}
              <div className="md:col-span-7 flex flex-col items-start gap-4 sm:gap-6 animate-slide-up">
                <span className="px-3 py-1 bg-brand-red text-white text-xs font-bold rounded-md tracking-widest uppercase">
                  {slide.badge}
                </span>
                
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight uppercase font-sans">
                  {slide.title}
                </h1>
                
                <p className="text-sm sm:text-lg text-gray-300 max-w-xl font-light">
                  {slide.description}
                </p>

                {/* Key Features Bullet List */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-2 w-full max-w-md">
                  {slide.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand-red"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex gap-4 mt-4 w-full sm:w-auto">
                  <a
                    href={slide.ctaUrl}
                    className="flex-1 sm:flex-none text-center px-8 py-3 bg-brand-red hover:bg-brand-red-hover text-white text-sm sm:text-base font-semibold rounded-full shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    {slide.ctaText}
                  </a>
                  <a
                    href="#learn-more"
                    className="flex-1 sm:flex-none text-center px-8 py-3 border border-white hover:bg-white hover:text-black text-sm sm:text-base font-semibold rounded-full transition-all duration-300"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Manual Arrow Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 bg-black/30 hover:bg-brand-red/90 text-white rounded-full transition-all border border-white/10 hover:border-transparent cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 bg-black/30 hover:bg-brand-red/90 text-white rounded-full transition-all border border-white/10 hover:border-transparent cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Progress Indicators & Play/Pause */}
      <div className="absolute bottom-8 left-6 sm:left-12 z-30 flex items-center gap-4">
        {/* Play/Pause Toggle */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 bg-white/10 hover:bg-brand-red hover:text-white rounded-full text-gray-300 transition-colors cursor-pointer"
          aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>

        {/* Slide Indicators */}
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className="group relative h-2 cursor-pointer transition-all duration-300 rounded-full"
              style={{ width: idx === currentSlide ? "40px" : "12px" }}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <div 
                className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? "bg-brand-red" : "bg-white/40 group-hover:bg-white/80"
                }`}
              ></div>
              {idx === currentSlide && isPlaying && (
                <div 
                  className="absolute left-0 top-0 h-full bg-white rounded-full animate-[fade-in_6s_linear_infinite]"
                  style={{ width: "100%" }}
                ></div>
              )}
            </button>
          ))}
        </div>

        {/* Textual Counter */}
        <span className="text-xs sm:text-sm font-semibold tracking-widest text-gray-400">
          0{currentSlide + 1} <span className="text-white/20">/</span> 0{slides.length}
        </span>
      </div>
    </section>
  );
}
