"use client";

import { useState, useMemo } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useApp } from "../../context/AppContext";
import { Search, ShoppingCart, Heart, Filter, ArrowUpDown } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  category: "tv" | "appliance" | "ac" | "laptop";
  price: number;
  mrp: number;
  image: string;
  tag?: string;
  features: string[];
  rating: number;
}

const PRODUCTS_DATA: Product[] = [
  {
    id: "tv-oled-55",
    name: "KEUKEN OLED evo AI C4 55\" Smart TV",
    category: "tv",
    price: 139990,
    mrp: 189990,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80",
    tag: "Trending",
    rating: 4.9,
    features: ["α9 AI Processor Gen7", "Brightness Booster Max", "144Hz Refresh Rate", "webOS 26 Smart Platform"],
  },
  {
    id: "fridge-instaview",
    name: "InstaView® French Door Refrigerator",
    category: "appliance",
    price: 194990,
    mrp: 249990,
    image: "https://images.unsplash.com/photo-1571175432247-f404af3a0ca5?auto=format&fit=crop&w=600&q=80",
    tag: "Premium Choice",
    rating: 4.8,
    features: ["Knock Twice & See Inside", "Linear Cooling™", "Craft Ice™ Maker", "ThinQ IoT WiFi Control"],
  },
  {
    id: "washer-ai",
    name: "AI Direct Drive™ 9kg Front Load Washer",
    category: "appliance",
    price: 43990,
    mrp: 59990,
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80",
    tag: "Best Seller",
    rating: 4.7,
    features: ["AI DD™ Fabric Protection", "TurboWash™ 360", "Steam+™ Allergen Care", "6 Motion Direct Drive"],
  },
  {
    id: "monitor-ultragear-34",
    name: "UltraGear™ 34\" Curved OLED Gaming Monitor",
    category: "laptop",
    price: 79990,
    mrp: 99990,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
    tag: "Pro Gaming",
    rating: 4.9,
    features: ["240Hz Refresh Rate", "0.03ms GtG Response Time", "VESA DisplayHDR True Black 400", "800R Curved Screen"],
  },
  {
    id: "ac-dualcool-1.5",
    name: "DUALCOOL Inverter 1.5 Ton 5-Star AC",
    category: "ac",
    price: 47990,
    mrp: 65990,
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=600&q=80",
    tag: "Energy Efficient",
    rating: 4.6,
    features: ["AI Convertible 6-in-1 Cooling", "Super Convertible modes", "Gold Fin™ Anti-Corrosive Condenser", "Vanguard Filtration"],
  },
  {
    id: "laptop-gram-16",
    name: "KEUKEN Gram 16\" Intel Core Ultra 7 Laptop",
    category: "laptop",
    price: 119990,
    mrp: 149990,
    image: "https://images.unsplash.com/photo-1496181130204-755241544e35?auto=format&fit=crop&w=600&q=80",
    tag: "Ultra Light",
    rating: 4.8,
    features: ["1.19kg Lightweight Body", "Intel Core Ultra 7 CPU", "WQXGA IPS Display", "77Wh High Capacity Battery"],
  },
  {
    id: "tv-uhd-43",
    name: "KEUKEN UHD 4K 43\" Smart WebOS TV",
    category: "tv",
    price: 32990,
    mrp: 45990,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    features: ["α5 AI Processor 4K Gen6", "webOS 23 Smart Platform", "HDR10 Pro", "Game Optimizer Mode"],
  },
  {
    id: "dishwasher-steam",
    name: "TrueSteam™ 14 Place Settings Dishwasher",
    category: "appliance",
    price: 52990,
    mrp: 69990,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=600&q=80",
    tag: "New Launch",
    rating: 4.7,
    features: ["TrueSteam™ sanitizing cycles", "QuadWash™ Multi-Motion spray arms", "EasyRack™ Plus flexible tines", "Inverter Direct Drive Motor"],
  },
];

export default function ProductsPage() {
  const { addToCart, wishlistIds, toggleWishlist, triggerEnquiry } = useApp();
  const [enquiredProducts, setEnquiredProducts] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "tv" | "appliance" | "ac" | "laptop">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "rating">("rating");

  // Filtering and sorting logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return b.rating - a.rating; // Default rating sort
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 py-12">
        
        {/* Page Title & Search Bar Area */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10 pb-6 border-b border-gray-100">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#111111]">
              Premium Catalog
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-light mt-1">
              Explore and purchase the latest in KEUKEN smart technology.
            </p>
          </div>

          {/* Search input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search products or features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-full border border-gray-300 focus:outline-none focus:border-brand-red text-sm text-[#111111]"
            />
            <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-gray-400" />
          </div>
        </div>

        {/* Category & Sorting Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto no-scrollbar pb-1 sm:pb-0">
            {(["all", "tv", "appliance", "ac", "laptop"] as const).map((cat) => {
              const label = cat === "all" ? "All Products" : cat === "tv" ? "TVs & Audio" : cat === "appliance" ? "Appliances" : cat === "ac" ? "Air Conditioners" : "Laptops/Monitors";
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? "bg-[#202020] text-white" 
                      : "bg-white text-gray-600 hover:text-black border border-gray-200"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
            <ArrowUpDown className="h-4.5 w-4.5 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-brand-red text-gray-700 cursor-pointer"
            >
              <option value="rating">Popularity (Rating)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-150 space-y-4">
            <p className="text-sm font-semibold text-gray-500">No products found matching your criteria.</p>
            <p className="text-xs text-gray-400 font-light">Try modifying your search or select a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((prod) => {
              const isLiked = wishlistIds.includes(prod.id);
              return (
                <div 
                  key={prod.id} 
                  className="group bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-350 flex flex-col justify-between"
                >
                  {/* Product Image Area */}
                  <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
                    {prod.tag && (
                      <span className="absolute top-4 left-4 z-10 bg-brand-red text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {prod.tag}
                      </span>
                    )}
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className={`absolute top-4 right-4 z-10 p-2.5 rounded-full shadow-md border cursor-pointer hover:scale-105 transition-all ${
                        isLiked 
                          ? "bg-brand-red text-white border-transparent" 
                          : "bg-white text-gray-550 border-gray-200 hover:text-brand-red"
                      }`}
                      aria-label="Wishlist"
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                    </button>
                    
                    <Image 
                      src={prod.image} 
                      alt={prod.name} 
                      fill 
                      sizes="(max-w-720px) 100vw, (max-w-1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                  </div>

                  {/* Product Details Area */}
                  <div className="p-6 flex-grow flex flex-col justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-red">
                        <span>⭐ {prod.rating}</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-gray-500">{prod.category === "tv" ? "TV & Audio" : prod.category === "appliance" ? "Appliance" : prod.category === "ac" ? "Air Conditioner" : "Laptop"}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug line-clamp-2">
                        {prod.name}
                      </h3>
                      
                      {/* Features Bullet List */}
                      <ul className="space-y-1.5 pt-2">
                        {prod.features.map((feature, idx) => (
                          <li key={idx} className="text-[11px] text-gray-500 font-light flex items-start gap-1.5">
                            <span className="text-brand-red leading-none shrink-0">•</span>
                            <span className="line-clamp-1 leading-tight">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Price and Add Button */}
                    <div className="space-y-3 pt-4 border-t border-gray-100 mt-auto">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-extrabold text-brand-red">{formatPrice(prod.price)}</span>
                        <span className="text-xs text-gray-400 line-through font-medium">{formatPrice(prod.mrp)}</span>
                      </div>
                      
                      {/* Buttons */}
                      <div className="flex gap-2 w-full">
                        <button
                          onClick={() => {
                            if (!enquiredProducts.includes(prod.id)) {
                              setEnquiredProducts((prev) => [...prev, prod.id]);
                            }
                            triggerEnquiry(prod.name);
                          }}
                          className="flex-grow py-2.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold rounded-xl transition-colors cursor-pointer hover:scale-102 transform duration-200 text-center"
                        >
                          {enquiredProducts.includes(prod.id) ? "Enquire Now" : "Buy Now"}
                        </button>
                        <button
                          onClick={() => addToCart(prod.name)}
                          className="p-2.5 border border-gray-300 hover:border-black text-gray-700 hover:text-black rounded-xl transition-colors cursor-pointer"
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
        )}

      </main>

      <Footer />
    </div>
  );
}
