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
      image: "/images/hero_water_purifier.jpg",
      badge: "MODEL MAHANADI",
      title: "KEUKEN Smart Water Purifier",
      description: "Advanced Purification. Pure Perfection. Powered by Zinc + Copper + Alkaline filtration technology with smart LED display for 100% healthy pure water.",
      features: ["Smart LED Display", "Zinc + Copper + Alkaline", "Advanced RO Purification", "Food-Grade Metallic Body"],
      ctaUrl: "#enquire",
      ctaText: "Get Best Quote",
      bgColor: "from-zinc-950 via-[#1a0a1e] to-[#250d2b]",
    },
    {
      id: 2,
      image: "/images/hero_inverter_ac.jpg",
      badge: "5-IN-1 CONVERTIBLE",
      title: "KEUKEN Inverter Air Conditioner",
      description: "Supercharged cooling with 5-in-1 convertible modes, 100% Copper Golden Fin Evaporator, and Rapid Cooling: 18°C in just 45 seconds.",
      features: ["Rapid Cooling: 18°C in 45s", "Golden Fin Evaporator", "12m Long Air Throw", "Anti-Viral Dust Filter"],
      ctaUrl: "#appliances",
      ctaText: "Explore Smart ACs",
      bgColor: "from-[#08131e] via-[#091b2c] to-[#040e18]",
    },
    {
      id: 3,
      image: "/images/hero_washing_machine.jpg",
      badge: "VEGA & AROHAN SERIES",
      title: "KEUKEN Twin Tub Washers",
      description: "Heavy Duty Motor powered top load washing machines. Featuring toughened glass lids, rust-proof body, and powerful roller pulsator.",
      features: ["Heavy Duty Motor", "Toughened Glass Lids", "Rust-Proof Body", "Multiple Wash Programs"],
      ctaUrl: "#appliances",
      ctaText: "Explore Washers",
      bgColor: "from-[#171615] via-[#211f1c] to-[#121110]",
    },
    {
      id: 4,
      image: "/images/hero_smart_tv.jpg",
      badge: "ANDROID AOSP SMART TV",
      title: "KEUKEN Smart TV Series",
      description: "Experience ultra-vivid entertainment with A+ Grade Panels, Quad Core Processor, Side Firing Box Speakers, and Voice Command Remote.",
      features: ["A+ Grade HD/FHD Panel", "Quad Core Processor", "Side Firing Box Speaker", "Voice Command Remote"],
      ctaUrl: "/products",
      ctaText: "View TV Range",
      bgColor: "from-black via-[#0d0d0d] to-zinc-900",
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
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-85 z-0`}></div>
            
            {/* Slide Image */}
            <div className="absolute inset-0 w-full h-full z-0 opacity-50 sm:opacity-65 mix-blend-screen md:mix-blend-normal">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={idx === 0}
                className={`object-cover object-right md:object-center ${idx === currentSlide ? "animate-ken-burns" : ""}`}
              />
            </div>

            {/* Content Content Container */}
            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 w-full z-20 flex flex-col md:grid md:grid-cols-12 gap-8 items-center pt-8">
              
              {/* Text Area */}
              <div className="md:col-span-7 flex flex-col items-start gap-4 sm:gap-6 animate-slide-up">
                <span className="px-3 py-1 bg-brand-red text-white text-xs font-bold rounded-md tracking-widest uppercase animate-float">
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
