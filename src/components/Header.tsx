"use client";

import { useState } from "react";
import { Search, ShoppingBag, Heart, MapPin, User, Menu, X, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  postalCode: string;
  setPostalCode: (code: string) => void;
  openWishlistModal: () => void;
}

export default function Header({
  cartCount,
  wishlistCount,
  postalCode,
  setPostalCode,
  openWishlistModal,
}: HeaderProps) {
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [tempPincode, setTempPincode] = useState(postalCode);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{6}$/.test(tempPincode)) {
      setPostalCode(tempPincode);
      setShowPincodeModal(false);
    } else {
      alert("Please enter a valid 6-digit postal code.");
    }
  };

  const trendingSearches = [
    "LG OLED C4 55 inch",
    "InstaView Refrigerator",
    "AI Front Load Washing Machine",
    "UltraGear OLED Gaming Monitor",
    "Dualcool Inverter AC",
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-brand-red text-white py-2 px-4 text-center text-xs sm:text-sm font-medium tracking-wide">
        <span className="inline-block animate-pulse mr-2">🔥</span>
        Freedom Sale: Save up to 26% + 3 Year Warranty on Premium Smart TVs.{" "}
        <a href="#offers" className="underline hover:text-gray-200 ml-1 font-semibold">
          Shop Now <ArrowRight className="inline h-3 w-3 sm:h-4 sm:w-4" />
        </a>
      </div>

      {/* Utility Bar */}
      <div className="bg-gray-100 border-b border-gray-200 text-[11px] sm:text-xs text-gray-600 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-9 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <span className="font-semibold text-brand-red">ThinQ® Smart Connection</span>
            <span className="h-3 w-px bg-gray-300"></span>
            <a href="#find-store" className="hover:text-black flex items-center gap-1">
              <MapPin className="h-3 w-3" /> Find a Store
            </a>
          </div>
          <div className="flex gap-4 items-center">
            <a href="#support" className="hover:text-black flex items-center gap-1">
              <HelpCircle className="h-3 w-3" /> Support & Help
            </a>
            <span className="h-3 w-px bg-gray-300"></span>
            <a href="#warranty" className="hover:text-black flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> LG Care & Warranty
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex justify-between items-center gap-4">
          
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-1 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* LG Logo SVG */}
            <a href="#" className="flex items-center gap-2">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-brand-red rounded-full flex items-center justify-center text-white shadow-md">
                {/* SVG representing LG smiley face */}
                <svg viewBox="0 0 100 100" className="w-6 h-6 sm:w-8 sm:h-8 fill-none stroke-white stroke-[6]">
                  {/* Outer circle */}
                  <circle cx="50" cy="50" r="42" className="stroke-white" />
                  {/* Eye dot */}
                  <circle cx="38" cy="35" r="5" className="fill-white stroke-none" />
                  {/* Nose 'L' */}
                  <path d="M 52 28 L 52 50 L 68 50" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Smile 'G' */}
                  <path d="M 76 50 A 26 26 0 1 1 50 24" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tighter text-[#202020] uppercase font-sans">
                  LG
                </span>
                <span className="text-[7px] sm:text-[9px] font-bold text-gray-500 tracking-widest uppercase">
                  Life's Good
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 lg:gap-8 font-semibold text-[#111111] text-[13px] lg:text-[14px]">
            <a href="#tvs" className="hover:text-brand-red transition-colors py-2 border-b-2 border-transparent hover:border-brand-red">TV & Audio</a>
            <a href="#appliances" className="hover:text-brand-red transition-colors py-2 border-b-2 border-transparent hover:border-brand-red">Home Appliances</a>
            <a href="#ac" className="hover:text-brand-red transition-colors py-2 border-b-2 border-transparent hover:border-brand-red">Air Conditioners</a>
            <a href="#monitors" className="hover:text-brand-red transition-colors py-2 border-b-2 border-transparent hover:border-brand-red">Monitors & Laptops</a>
            <a href="#thinq" className="hover:text-brand-red transition-colors py-2 border-b-2 border-transparent hover:border-brand-red text-brand-red">ThinQ® AI</a>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-4 flex-1 md:flex-none justify-end">
            
            {/* Search Input Bar (Desktop) */}
            <div className="relative hidden lg:block w-64 xl:w-72">
              <input
                type="text"
                placeholder="Search OLED TVs, Washing Machines..."
                className="w-full h-10 pl-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:border-brand-red text-sm"
                onClick={() => setShowSearchOverlay(true)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Mobile/Tablet Search Button */}
            <button 
              className="lg:hidden p-2 text-gray-700 hover:text-brand-red hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setShowSearchOverlay(true)}
            >
              <Search className="h-5 sm:h-6 sm:w-6 w-5" />
            </button>

            {/* Postal Code / Location Selector */}
            <button
              onClick={() => setShowPincodeModal(true)}
              className="flex items-center gap-1 text-[11px] sm:text-xs text-gray-700 hover:text-brand-red hover:bg-gray-100 px-2 py-1.5 rounded-md border border-gray-200 transition-colors"
            >
              <MapPin className="h-3.5 w-3.5 text-brand-red" />
              <span className="hidden sm:inline font-medium">Deliver to:</span>
              <span className="font-bold">{postalCode || "Set Pincode"}</span>
            </button>

            {/* User Icon */}
            <button className="p-2 text-gray-700 hover:text-brand-red hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
              <User className="h-5 sm:h-6 sm:w-6 w-5" />
            </button>

            {/* Wishlist Icon */}
            <button 
              onClick={openWishlistModal}
              className="relative p-2 text-gray-700 hover:text-brand-red hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="h-5 sm:h-6 sm:w-6 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-brand-red text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button 
              className="relative p-2 text-gray-700 hover:text-brand-red hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="h-5 sm:h-6 sm:w-6 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-brand-red text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 sm:top-20 left-0 w-full bg-white border-b border-gray-200 shadow-lg py-4 px-6 flex flex-col gap-4 z-50 animate-slide-up">
            <a href="#tvs" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-lg hover:text-brand-red py-1">TV & Audio</a>
            <a href="#appliances" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-lg hover:text-brand-red py-1">Home Appliances</a>
            <a href="#ac" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-lg hover:text-brand-red py-1">Air Conditioners</a>
            <a href="#monitors" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-lg hover:text-brand-red py-1">Monitors & Laptops</a>
            <a href="#thinq" onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-brand-red py-1">ThinQ® AI Smart Home</a>
            <div className="h-px bg-gray-200 my-2"></div>
            <div className="flex justify-between text-sm text-gray-500 font-medium pb-2">
              <a href="#support">Customer Support</a>
              <a href="#find-store">Find Store</a>
            </div>
          </div>
        )}
      </header>

      {/* Pincode Selector Modal */}
      {showPincodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-gray-100 animate-slide-up">
            <div className="bg-brand-red text-white px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Change Delivery Pincode</h3>
              <button 
                onClick={() => setShowPincodeModal(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handlePincodeSubmit} className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Enter your 6-digit postal code to check product availability, estimated delivery times, and local installation options.
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g., 110001"
                  value={tempPincode}
                  onChange={(e) => setTempPincode(e.target.value.replace(/\D/g, ""))}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent font-bold tracking-widest text-center text-lg"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-brand-red hover:bg-brand-red-hover text-white rounded-lg font-semibold transition-colors"
                >
                  Verify
                </button>
              </div>
              <div className="mt-4 flex gap-4 text-xs text-gray-500 justify-center">
                <span className="flex items-center gap-1">📍 New Delhi: 110001</span>
                <span className="flex items-center gap-1">📍 Mumbai: 400001</span>
                <span className="flex items-center gap-1">📍 Bangalore: 560001</span>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Search Overlay */}
      {showSearchOverlay && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border-b border-gray-200 shadow-xl w-full p-6 animate-slide-up">
            <div className="max-w-3xl mx-auto">
              {/* Search Bar Inner */}
              <div className="flex items-center gap-4 border-b-2 border-brand-red pb-3">
                <Search className="h-6 w-6 text-brand-red" />
                <input
                  type="text"
                  placeholder="What electronics are you looking for today?"
                  className="flex-1 bg-transparent text-xl font-medium focus:outline-none text-[#111111]"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  onClick={() => {
                    setShowSearchOverlay(false);
                    setSearchQuery("");
                  }}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              {/* Trending Searches Grid */}
              <div className="mt-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Trending Searches</h4>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(term);
                        setShowSearchOverlay(false);
                        // Optional scroll to corresponding section
                        const section = term.toLowerCase().includes("tv") ? "tvs" :
                                        term.toLowerCase().includes("refrigerator") || term.toLowerCase().includes("washing") ? "appliances" :
                                        term.toLowerCase().includes("ac") ? "ac" : "monitors";
                        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-4 py-2 bg-gray-100 hover:bg-brand-red hover:text-white rounded-full text-sm text-gray-700 transition-all font-medium cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Click outside to close */}
          <div className="h-full w-full" onClick={() => setShowSearchOverlay(false)}></div>
        </div>
      )}
    </>
  );
}
