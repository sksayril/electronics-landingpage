"use client";

import { Tv, Refrigerator, Wind, Monitor, Disc, Laptop, ShieldAlert } from "lucide-react";

interface Category {
  name: string;
  hash: string;
  icon: React.ReactNode;
  bgGradient: string;
  borderColor: string;
  tag?: string;
}

export default function CategoryGrid() {
  const categories: Category[] = [
    {
      name: "OLED TVs & Audio",
      hash: "#tvs",
      icon: <Tv className="h-8 w-8 text-rose-600" />,
      bgGradient: "from-rose-50 to-red-100/50",
      borderColor: "hover:border-rose-300",
      tag: "OLED evo",
    },
    {
      name: "Smart Refrigerators",
      hash: "#appliances",
      icon: <Refrigerator className="h-8 w-8 text-blue-600" />,
      bgGradient: "from-blue-50 to-sky-100/50",
      borderColor: "hover:border-blue-300",
    },
    {
      name: "Washing Machines",
      hash: "#appliances",
      icon: <Disc className="h-8 w-8 text-amber-600" />,
      bgGradient: "from-amber-50 to-yellow-100/50",
      borderColor: "hover:border-amber-300",
      tag: "AI Wash",
    },
    {
      name: "Air Conditioners",
      hash: "#ac",
      icon: <Wind className="h-8 w-8 text-teal-600" />,
      bgGradient: "from-teal-50 to-emerald-100/50",
      borderColor: "hover:border-teal-300",
      tag: "5 Star",
    },
    {
      name: "UltraGear Monitors",
      hash: "#monitors",
      icon: <Monitor className="h-8 w-8 text-indigo-600" />,
      bgGradient: "from-indigo-50 to-purple-100/50",
      borderColor: "hover:border-indigo-300",
    },
    {
      name: "Gram Laptops",
      hash: "#monitors",
      icon: <Laptop className="h-8 w-8 text-purple-600" />,
      bgGradient: "from-purple-50 to-pink-100/50",
      borderColor: "hover:border-purple-300",
      tag: "Ultra Light",
    },
  ];

  const handleCategoryClick = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111111] uppercase font-sans">
            Explore KEUKEN Product Categories
          </h2>
          <div className="h-1 w-16 bg-brand-red mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Categories Flex/Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 justify-center">
          {categories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => handleCategoryClick(category.hash)}
              className={`group flex flex-col items-center p-5 rounded-2xl border border-gray-100 bg-white shadow-xs hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 ${category.borderColor} text-center relative cursor-pointer`}
            >
              {/* Optional Hot Tag */}
              {category.tag && (
                <span className="absolute -top-2.5 bg-brand-red text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider scale-95 group-hover:scale-100 transition-transform">
                  {category.tag}
                </span>
              )}

              {/* Icon Circle */}
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${category.bgGradient} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-inner`}
              >
                {category.icon}
              </div>

              {/* Title */}
              <span className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-brand-red transition-colors font-sans">
                {category.name}
              </span>
              
              {/* Subtle hover prompt */}
              <span className="text-[10px] text-gray-400 font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                View All &rarr;
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
