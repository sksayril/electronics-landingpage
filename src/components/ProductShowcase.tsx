"use client";

import { useState } from "react";
import { Star, Heart, ShoppingCart, Info, Award, HelpCircle } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  category: "tvs" | "appliances" | "ac" | "monitors";
  name: string;
  model: string;
  image: string;
  rating: number;
  reviews: number;
  features: string[];
  mrp: number;
  price: number;
  badge?: string;
}

interface ProductShowcaseProps {
  wishlistIds: string[];
  toggleWishlist: (id: string) => void;
  addToCart: (productName: string) => void;
  postalCode: string;
}

export default function ProductShowcase({
  wishlistIds,
  toggleWishlist,
  addToCart,
  postalCode,
}: ProductShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"trending" | "new" | "bestseller">("trending");

  const products: Record<"trending" | "new" | "bestseller", Product[]> = {
    trending: [
      {
        id: "tv-oled-55",
        category: "tvs",
        name: "LG OLED evo AI C4 55\" Smart TV",
        model: "OLED55C4PSA",
        image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=400&q=80",
        rating: 4.9,
        reviews: 248,
        features: ["α9 AI Processor Gen7", "Pixel Dimming OLED", "Brightness Booster Max", "144Hz VRR Gaming"],
        mrp: 189990,
        price: 139990,
        badge: "HOT DEAL",
      },
      {
        id: "fridge-instaview",
        category: "appliances",
        name: "InstaView® French Door Refrigerator",
        model: "GR-X29FMBIL",
        image: "https://images.unsplash.com/photo-1571175432247-f404af3a0ca5?auto=format&fit=crop&w=400&q=80",
        rating: 4.8,
        reviews: 112,
        features: ["Knock Twice to See Inside", "UVnano™ Water Dispenser", "Dual Craft Ice Maker", "Smart ThinQ® Wifi"],
        mrp: 249990,
        price: 194990,
        badge: "PREMIUM",
      },
      {
        id: "washer-ai",
        category: "appliances",
        name: "AI Direct Drive™ 9kg Front Load Washer",
        model: "FHP1209Z5M",
        image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80",
        rating: 4.7,
        reviews: 319,
        features: ["AI DD™ Fabric Sensor", "TurboWash™ 39 Mins", "Steam™ Allergen Removal", "6 Motion Technology"],
        mrp: 58990,
        price: 43990,
        badge: "AI SMART",
      },
      {
        id: "monitor-ultragear-34",
        category: "monitors",
        name: "UltraGear™ 34\" Curved OLED Gaming Monitor",
        model: "34GS95QE",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80",
        rating: 4.9,
        reviews: 86,
        features: ["0.03ms Response Time", "240Hz Refresh Rate", "VESA DisplayHDR 400", "AMD FreeSync Premium"],
        mrp: 99990,
        price: 79990,
        badge: "GAMING EXCLUSIVE",
      },
    ],
    new: [
      {
        id: "ac-dualcool-1.5",
        category: "ac",
        name: "DUALCOOL Inverter 1.5 Ton 5-Star AC",
        model: "TS-Q19YNZE",
        image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=400&q=80",
        rating: 4.6,
        reviews: 43,
        features: ["AI Convertible 6-in-1 Cooling", "PM 1.0 Smart Air Filter", "Ocean Black Anti-Corrosive", "ADC Safety Sensors"],
        mrp: 72990,
        price: 47990,
        badge: "2026 MODEL",
      },
      {
        id: "laptop-gram-16",
        category: "monitors",
        name: "LG Gram 16\" Intel Core Ultra 7 Laptop",
        model: "16Z90S-G.AH78A2",
        image: "https://images.unsplash.com/photo-1496181130204-755241544e35?auto=format&fit=crop&w=400&q=80",
        rating: 4.8,
        reviews: 31,
        features: ["Intel® Core™ Ultra 7 Evo", "1.19kg Super Lightweight", "16:10 WQXGA IPS Display", "77Wh Battery Capacity"],
        mrp: 142990,
        price: 119990,
        badge: "NEW",
      },
    ],
    bestseller: [
      {
        id: "tv-uhd-43",
        category: "tvs",
        name: "LG UHD 4K 43\" Smart WebOS TV",
        model: "43UR7500PSC",
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=400&q=80",
        rating: 4.7,
        reviews: 1485,
        features: ["α5 AI Processor 4K Gen6", "webOS 23 Smart Platform", "HDR10 Pro Detail Enhancement", "Game Optimizer Module"],
        mrp: 49990,
        price: 32990,
        badge: "BESTSELLER",
      },
      {
        id: "dishwasher-steam",
        category: "appliances",
        name: "TrueSteam™ 14 Place Settings Dishwasher",
        model: "DFB424FP",
        image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=80",
        rating: 4.8,
        reviews: 955,
        features: ["TrueSteam™ High Temp Sanitizing", "QuadWash™ Multi-Directional Blades", "EasyRack™ Plus Adjustable Rack", "Inverter Direct Drive Motor"],
        mrp: 64990,
        price: 52990,
        badge: "99% SANITIZED",
      },
    ],
  };

  const currentProducts = products[activeTab];

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getDeliveryDate = () => {
    if (!postalCode) return "Select pincode for delivery dates";
    // Check code prefix for random simulated day ranges
    const prefix = parseInt(postalCode.substring(0, 2));
    if (prefix === 11 || prefix === 40 || prefix === 56) {
      return "Express Free Delivery: Tomorrow!";
    }
    return "Delivered in 2 to 3 Business Days";
  };

  return (
    <section className="py-16 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#111111] tracking-tight font-sans">
              Featured Innovations
            </h2>
            <p className="text-sm text-gray-500 mt-1 font-medium">Explore handpicked deals and new technology from LG</p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-white rounded-full p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab("trending")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "trending" ? "bg-brand-red text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              Trending Now
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "new" ? "bg-brand-red text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveTab("bestseller")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "bestseller" ? "bg-brand-red text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              Best Sellers
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentProducts.map((prod) => {
            const isWishlisted = wishlistIds.includes(prod.id);
            const discountPercent = Math.round(((prod.mrp - prod.price) / prod.mrp) * 100);

            return (
              <div
                key={prod.id}
                id={prod.category}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group relative"
              >
                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                  {prod.badge && (
                    <span className="bg-brand-red text-white text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-xs">
                      {prod.badge}
                    </span>
                  )}
                  <span className="bg-emerald-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {discountPercent}% OFF
                  </span>
                </div>

                {/* Wishlist Button Overlay */}
                <button
                  onClick={() => toggleWishlist(prod.id)}
                  className="absolute top-3 right-3 z-10 p-2 bg-white/95 hover:bg-brand-red text-gray-500 hover:text-white rounded-full shadow-md border border-gray-100 transition-colors cursor-pointer group-hover:scale-105"
                  aria-label="Add to Wishlist"
                >
                  <Heart className={`h-4.5 w-4.5 transition-colors ${isWishlisted ? "fill-brand-red text-brand-red group-hover:fill-white group-hover:text-white" : ""}`} />
                </button>

                {/* Product Image */}
                <div className="relative w-full h-48 bg-gray-50 overflow-hidden">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Model & Category Header */}
                    <div className="flex justify-between items-center text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                      <span>{prod.category}</span>
                      <span>{prod.model}</span>
                    </div>

                    {/* Product Title */}
                    <h3 className="font-bold text-sm sm:text-base text-gray-900 line-clamp-2 leading-snug hover:text-brand-red transition-colors min-h-[44px]">
                      {prod.name}
                    </h3>

                    {/* Ratings */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < Math.floor(prod.rating)
                                ? "fill-amber-500 stroke-amber-500"
                                : "stroke-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-800">{prod.rating}</span>
                      <span className="text-[10px] text-gray-400 font-medium">({prod.reviews} reviews)</span>
                    </div>

                    {/* Bullet Specs */}
                    <ul className="mt-4 space-y-1.5 border-t border-gray-100 pt-3">
                      {prod.features.map((feature, fIdx) => (
                        <li key={fIdx} className="text-xs text-gray-500 flex items-start gap-1.5">
                          <span className="h-1 w-1 bg-brand-red rounded-full mt-1.5 shrink-0"></span>
                          <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Delivery Location Status */}
                  <div className="mt-4 bg-gray-50 rounded-lg p-2 flex items-center gap-2 border border-gray-100">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-600 line-clamp-1">
                      {getDeliveryDate()}
                    </span>
                  </div>

                  {/* Pricing and CTAs */}
                  <div className="mt-5 pt-3 border-t border-gray-100">
                    {/* Prices */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg sm:text-xl font-extrabold text-brand-red">
                        {formatPrice(prod.price)}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        {formatPrice(prod.mrp)}
                      </span>
                    </div>
                    <span className="text-[10px] text-brand-red font-semibold">Includes GST & Free Shipping</span>

                    {/* Buttons */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => addToCart(prod.name)}
                        className="flex-1 py-2 px-3 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold rounded-lg transition-colors cursor-pointer hover:scale-102 transform duration-200"
                      >
                        Buy Now
                      </button>
                      <button
                        onClick={() => addToCart(prod.name)}
                        className="p-2 border border-gray-300 hover:border-black text-gray-700 hover:text-black rounded-lg transition-colors cursor-pointer"
                        aria-label="Add to cart"
                      >
                        <ShoppingCart className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
