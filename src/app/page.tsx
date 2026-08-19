"use client";

import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import Header from "../components/Header";
import HeroCarousel from "../components/HeroCarousel";
import CategoryGrid from "../components/CategoryGrid";
import ProductShowcase from "../components/ProductShowcase";
import ThinQSection from "../components/ThinQSection";
import PromoSection from "../components/PromoSection";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import EnquirySection from "../components/EnquirySection";
import { X, Heart, ShoppingCart, ArrowRight } from "lucide-react";
import Image from "next/image";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function Home() {
  const {
    cartCount,
    setCartCount,
    wishlistIds,
    setWishlistIds,
    postalCode,
    setPostalCode,
    showWishlistModal,
    setShowWishlistModal,
    addToCart,
    toggleWishlist,
    cartNotification,
  } = useApp();

  const [allProducts, setAllProducts] = useState<Record<string, WishlistItem>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        if (data.success) {
          const map: Record<string, WishlistItem> = {};
          data.data.forEach((p: any) => {
            const id = p._id || p.id;
            map[id] = {
              id: id,
              name: p.name,
              price: p.price,
              image: p.image,
            };
          });
          setAllProducts(map);
        }
      } catch (err) {
        console.error("Error fetching homepage products:", err);
      }
    };
    fetchProducts();
  }, []);


  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        postalCode={postalCode}
        setPostalCode={setPostalCode}
        openWishlistModal={() => setShowWishlistModal(true)}
      />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Hero Banner Slider */}
        <HeroCarousel />

        {/* Product Categories Selector */}
        <ScrollReveal direction="up" delay={50} duration={800}>
          <CategoryGrid />
        </ScrollReveal>

        {/* Dynamic Products Showcase tabbed grid */}
        <ScrollReveal direction="up" delay={50} duration={800}>
          <ProductShowcase
            wishlistIds={wishlistIds}
            toggleWishlist={toggleWishlist}
            addToCart={addToCart}
            postalCode={postalCode}
          />
        </ScrollReveal>

        {/* ThinQ IoT Connected Ecosystem Dashboard showcase */}
        <ScrollReveal direction="up" delay={50} duration={800}>
          <ThinQSection />
        </ScrollReveal>

        {/* Promos, Maintenance & AMC section */}
        <ScrollReveal direction="up" delay={50} duration={800}>
          <PromoSection />
        </ScrollReveal>

        {/* Product & Service Enquiry Form */}
        <ScrollReveal direction="up" delay={50} duration={800}>
          <EnquirySection />
        </ScrollReveal>
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Add Floating Notification */}
      {cartNotification && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#202020] text-white py-3.5 px-6 rounded-xl shadow-2xl flex items-center gap-3 border border-white/15 animate-slide-up max-w-sm">
          <div className="h-5 w-5 bg-brand-red rounded-full flex items-center justify-center text-[10px] font-bold">✓</div>
          <span className="text-xs sm:text-sm font-semibold tracking-wide">{cartNotification}</span>
        </div>
      )}

      {/* Wishlist Drawer Modal */}
      {showWishlistModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between p-6 animate-slide-up">
            
            {/* Drawer Header */}
            <div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-brand-red fill-brand-red" />
                  <h3 className="font-bold text-lg text-[#111111] uppercase tracking-wide">My Wishlist ({wishlistIds.length})</h3>
                </div>
                <button
                  onClick={() => setShowWishlistModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              {/* Items List */}
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
                {wishlistIds.length === 0 ? (
                  <div className="text-center py-12 flex flex-col items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                      <Heart className="h-6 w-6 text-gray-300" />
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Your wishlist is empty.</p>
                    <p className="text-xs text-gray-400 max-w-xs font-light">Explore our premium catalog of OLED TVs and Home Appliances to add items.</p>
                  </div>
                ) : (
                  wishlistIds.map((id) => {
                    const item = allProducts[id];
                    if (!item) return null;
                    return (
                      <div key={id} className="flex gap-4 p-3 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                        <div className="relative h-16 w-16 bg-white border border-gray-200 rounded-lg overflow-hidden shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between text-xs">
                          <div>
                            <h4 className="font-bold text-gray-900 line-clamp-1 leading-snug">{item.name}</h4>
                            <span className="text-brand-red font-extrabold text-sm block mt-1">{formatPrice(item.price)}</span>
                          </div>
                          <div className="flex gap-4 mt-2 font-bold uppercase tracking-wider text-[10px]">
                            <button
                              onClick={() => {
                                addToCart(item.name);
                                setShowWishlistModal(false);
                              }}
                              className="text-brand-red hover:underline cursor-pointer flex items-center gap-1"
                            >
                              <ShoppingCart className="h-3 w-3" /> Add to Basket
                            </button>
                            <button
                              onClick={() => toggleWishlist(id)}
                              className="text-gray-400 hover:text-black cursor-pointer"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-gray-100 pt-4 space-y-3">
              <button
                disabled={wishlistIds.length === 0}
                onClick={() => {
                  alert("Proceeding to checkout with wishlisted items.");
                  setCartCount((prev) => prev + wishlistIds.length);
                  setWishlistIds([]);
                  setShowWishlistModal(false);
                }}
                className="w-full py-3 bg-brand-red hover:bg-brand-red-hover disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl text-center flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md"
              >
                Checkout All Items <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setShowWishlistModal(false)}
                className="w-full py-3 border border-gray-300 hover:border-black text-gray-700 hover:text-black font-semibold rounded-xl text-center text-xs transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
