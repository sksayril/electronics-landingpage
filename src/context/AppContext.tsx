"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AppContextType {
  cartCount: number;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  wishlistIds: string[];
  setWishlistIds: React.Dispatch<React.SetStateAction<string[]>>;
  postalCode: string;
  setPostalCode: React.Dispatch<React.SetStateAction<string>>;
  showWishlistModal: boolean;
  setShowWishlistModal: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (productName: string) => void;
  toggleWishlist: (id: string) => void;
  cartNotification: string | null;
  setCartNotification: React.Dispatch<React.SetStateAction<string | null>>;
  enquiryMessage: string;
  setEnquiryMessage: React.Dispatch<React.SetStateAction<string>>;
  triggerEnquiry: (productName: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [postalCode, setPostalCode] = useState("700161");
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [cartNotification, setCartNotification] = useState<string | null>(null);
  const [enquiryMessage, setEnquiryMessage] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("keuken_cart_count");
    if (savedCart) setCartCount(parseInt(savedCart, 10));

    const savedWishlist = localStorage.getItem("keuken_wishlist_ids");
    if (savedWishlist) {
      try {
        setWishlistIds(JSON.parse(savedWishlist));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Default item to start with
      setWishlistIds(["tv-oled-55"]);
    }

    const savedPostal = localStorage.getItem("keuken_postal_code");
    if (savedPostal) setPostalCode(savedPostal);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem("keuken_cart_count", cartCount.toString());
  }, [cartCount]);

  useEffect(() => {
    localStorage.setItem("keuken_wishlist_ids", JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem("keuken_postal_code", postalCode);
  }, [postalCode]);

  const addToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    setCartNotification(`"${productName}" added to shopping basket!`);
    setTimeout(() => {
      setCartNotification((prev) => (prev === `"${productName}" added to shopping basket!` ? null : prev));
    }, 4500);
  };

  const toggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const triggerEnquiry = (productName: string) => {
    const messageText = `I am interested in buying: ${productName}. Please provide more details and the best offer quote.`;
    setEnquiryMessage(messageText);

    // Scroll to the enquire section if it exists
    const enquireSection = document.getElementById("enquire");
    if (enquireSection) {
      enquireSection.scrollIntoView({ behavior: "smooth" });
      
      // Focus on the name input field after the scroll finishes
      setTimeout(() => {
        const nameInput = document.getElementById("name");
        if (nameInput) {
          nameInput.focus();
        }
      }, 800);
    } else {
      // If the section doesn't exist (e.g., on About or Products page), navigate to Contact page
      window.location.href = `/contact?product=${encodeURIComponent(productName)}`;
    }
  };

  return (
    <AppContext.Provider
      value={{
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
        setCartNotification,
        enquiryMessage,
        setEnquiryMessage,
        triggerEnquiry,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
