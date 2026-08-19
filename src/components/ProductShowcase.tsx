"use client";

import { useState, useEffect } from "react";
import { Star, Heart, ShoppingCart, Info, Award, HelpCircle } from "lucide-react";
import Image from "next/image";
import { useApp } from "../context/AppContext";

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
  tab?: "trending" | "new" | "bestseller";
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
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { triggerEnquiry } = useApp();
  const [enquiredProducts, setEnquiredProducts] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        if (data.success) {
          const mapped: Product[] = data.data.map((p: any) => ({
            id: p._id || p.id,
            category: p.category,
            name: p.name,
            model: p.model,
            image: p.image,
            rating: p.rating || 5,
            reviews: p.reviews || 0,
            features: p.features || [],
            mrp: p.mrp,
            price: p.price,
            badge: p.badge,
          }));
          setDbProducts(mapped.filter((p: any) => p.tab === undefined || ["trending", "new", "bestseller"].includes(data.data.find((item: any) => item._id === p.id)?.tab)));
          
          // Re-map with tab configuration from response
          const fullMapped = data.data.map((p: any) => ({
            id: p._id || p.id,
            category: p.category,
            name: p.name,
            model: p.model,
            image: p.image,
            rating: p.rating || 5,
            reviews: p.reviews || 0,
            features: p.features || [],
            mrp: p.mrp,
            price: p.price,
            badge: p.badge,
            tab: p.tab || "trending",
          }));
          setDbProducts(fullMapped);
        }
      } catch (err) {
        console.error("Error fetching products in showcase:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const currentProducts = dbProducts.filter((p) => p.tab === activeTab);

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
            <p className="text-sm text-gray-500 mt-1 font-medium">Explore handpicked deals and new technology from KEUKEN</p>
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
          {loading ? (
            [...Array(4)].map((_, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs p-5 space-y-4 animate-pulse">
                <div className="bg-gray-150 h-48 rounded-xl w-full"></div>
                <div className="space-y-2">
                  <div className="bg-gray-150 h-4 rounded-md w-1/3"></div>
                  <div className="bg-gray-150 h-5 rounded-md w-3/4"></div>
                  <div className="bg-gray-150 h-4 rounded-md w-1/2"></div>
                </div>
                <div className="bg-gray-150 h-10 rounded-lg w-full mt-4"></div>
              </div>
            ))
          ) : currentProducts.length === 0 ? (
            <div className="col-span-full py-16 text-center text-gray-500 font-medium bg-white rounded-2xl border border-gray-200">
              No products found in this category.
            </div>
          ) : (
            currentProducts.map((prod) => {
              const isWishlisted = wishlistIds.includes(prod.id);
              const discountPercent = Math.round(((prod.mrp - prod.price) / prod.mrp) * 100);

            return (
              <div
                key={prod.id}
                id={prod.category}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col group relative"
              >
                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                  {prod.badge && (
                    <span className="bg-brand-red text-white text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-xs bg-gradient-to-r from-[#A50034] via-red-400 to-[#A50034] bg-[length:200%_auto] animate-shimmer">
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
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
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
                        onClick={() => {
                          if (!enquiredProducts.includes(prod.id)) {
                            setEnquiredProducts((prev) => [...prev, prod.id]);
                          }
                          triggerEnquiry(prod.name);
                        }}
                        className="flex-1 py-2 px-3 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold rounded-lg transition-colors cursor-pointer hover:scale-102 transform duration-200 text-center"
                      >
                        {enquiredProducts.includes(prod.id) ? "Enquire Now" : "Order Now"}
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
          }))}
        </div>

      </div>
    </section>
  );
}
