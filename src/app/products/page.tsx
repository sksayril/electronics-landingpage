"use client";

import { useState, useMemo, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useApp } from "../../context/AppContext";
import { Search, ShoppingCart, Heart, Filter, ArrowUpDown, Download, FileText } from "lucide-react";
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

export default function ProductsPage() {
  const { addToCart, wishlistIds, toggleWishlist, triggerEnquiry } = useApp();
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [enquiredProducts, setEnquiredProducts] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "tv" | "appliance" | "ac" | "laptop">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "rating">("rating");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        if (data.success) {
          const mapped: Product[] = data.data.map((p: any) => {
            // Map DB category to catalog categories
            let cat: "tv" | "appliance" | "ac" | "laptop" = "tv";
            if (p.category === "appliances") cat = "appliance";
            else if (p.category === "ac") cat = "ac";
            else if (p.category === "monitors") cat = "laptop";

            return {
              id: p._id || p.id,
              name: p.name,
              category: cat,
              price: p.price,
              mrp: p.mrp,
              image: p.image,
              tag: p.badge || "",
              features: p.features || [],
              rating: p.rating || 5,
            };
          });
          setProductsData(mapped);
        }
      } catch (err) {
        console.error("Error fetching catalog products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filtering and sorting logic
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return b.rating - a.rating; // Default rating sort
    });
  }, [productsData, selectedCategory, searchQuery, sortBy]);

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
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8 pb-6 border-b border-gray-100">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#111111]">
              Premium Catalog
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-light mt-1">
              Explore and purchase the latest in KEUKEN smart technology.
            </p>
          </div>

          {/* Search & Catalogue Download CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <a
              href="/KeuKen_Product_Catalogue_2026_2027_Printable.pdf"
              download="KeuKen_Product_Catalogue_2026_2027.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-zinc-900 hover:bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md border border-zinc-800 whitespace-nowrap"
            >
              <Download className="h-4 w-4 text-brand-red" /> Download Catalogue PDF
            </a>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-11 pr-4 rounded-full border border-gray-300 focus:outline-none focus:border-brand-red text-sm text-[#111111]"
              />
              <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-gray-400" />
            </div>
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
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-gray-200 p-5 space-y-4 animate-pulse">
                <div className="bg-gray-150 aspect-square rounded-2xl w-full"></div>
                <div className="space-y-2">
                  <div className="bg-gray-150 h-4 rounded-md w-1/3"></div>
                  <div className="bg-gray-150 h-5 rounded-md w-3/4"></div>
                  <div className="bg-gray-150 h-4 rounded-md w-1/2"></div>
                </div>
                <div className="bg-gray-150 h-10 rounded-xl w-full mt-4"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
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
                          {enquiredProducts.includes(prod.id) ? "Enquire Now" : "Order Now"}
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
