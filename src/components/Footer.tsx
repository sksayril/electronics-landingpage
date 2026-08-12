"use client";

import { useState, useEffect } from "react";
import { ArrowUp, MessageSquare, Send, X } from "lucide-react";

const FacebookIcon = () => (
  <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" className="fill-current" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showChatbox, setShowChatbox] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ sender: "user" | "bot"; text: string }[]>([
    { sender: "bot", text: "Hello! Welcome to LG Smart Assistant. How can we help you today?" },
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userMsg = chatMessage;
    setChatHistory((prev) => [...prev, { sender: "user", text: userMsg }]);
    setChatMessage("");

    // Simulate bot response after 1s
    setTimeout(() => {
      let botResponse = "Thank you for contacting us! An LG representative will connect with you shortly.";
      const lower = userMsg.toLowerCase();
      if (lower.includes("oled") || lower.includes("tv")) {
        botResponse = "Our brand new LG OLED C4 series is eligible for a free soundbar and 3-year warranty. Would you like us to schedule a home demo?";
      } else if (lower.includes("delivery") || lower.includes("shipping")) {
        botResponse = "We offer free delivery and installation within 2-3 business days. Enter your pincode in the top bar to verify exact dates!";
      } else if (lower.includes("ac") || lower.includes("cooling")) {
        botResponse = "All LG 2026 Dual Inverter Air Conditioners are equipped with AI Convertible cooling and carry a 10-year compressor warranty.";
      }
      setChatHistory((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 1000);
  };

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 text-gray-400 text-xs sm:text-sm pt-16 pb-8 relative">
      
      {/* Footer Top Links */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        
        {/* Col 1 */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-wider text-xs sm:text-sm mb-4 border-l-2 border-brand-red pl-2.5">
            TV & Audio
          </h4>
          <ul className="space-y-2 font-medium">
            <li><a href="#tvs" className="hover:text-white transition-colors">OLED evo TVs</a></li>
            <li><a href="#tvs" className="hover:text-white transition-colors">QNED MiniLED TVs</a></li>
            <li><a href="#tvs" className="hover:text-white transition-colors">UHD 4K Smart TVs</a></li>
            <li><a href="#tvs" className="hover:text-white transition-colors">LG Soundbars & Speakers</a></li>
          </ul>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-wider text-xs sm:text-sm mb-4 border-l-2 border-brand-red pl-2.5">
            Appliances
          </h4>
          <ul className="space-y-2 font-medium">
            <li><a href="#appliances" className="hover:text-white transition-colors">InstaView® Refrigerators</a></li>
            <li><a href="#appliances" className="hover:text-white transition-colors">AI Front Load Washers</a></li>
            <li><a href="#appliances" className="hover:text-white transition-colors">Steam Dishwashers</a></li>
            <li><a href="#appliances" className="hover:text-white transition-colors">Smart Microwaves</a></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-wider text-xs sm:text-sm mb-4 border-l-2 border-brand-red pl-2.5">
            Air Conditioners
          </h4>
          <ul className="space-y-2 font-medium">
            <li><a href="#ac" className="hover:text-white transition-colors">AI Dual Inverter split ACs</a></li>
            <li><a href="#ac" className="hover:text-white transition-colors">Window Inverter ACs</a></li>
            <li><a href="#ac" className="hover:text-white transition-colors">Multi-V VRF Systems</a></li>
            <li><a href="#ac" className="hover:text-white transition-colors">Eco-friendly Gas Refills</a></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="text-white font-bold uppercase tracking-wider text-xs sm:text-sm mb-4 border-l-2 border-brand-red pl-2.5">
            Support & Help
          </h4>
          <ul className="space-y-2 font-medium">
            <li><a href="#support" className="hover:text-white transition-colors">Register a Product</a></li>
            <li><a href="#support" className="hover:text-white transition-colors">Request Repair Service</a></li>
            <li><a href="#support" className="hover:text-white transition-colors">Download User Manuals</a></li>
            <li><a href="#support" className="hover:text-white transition-colors">Track Service Request</a></li>
          </ul>
        </div>

      </div>

      {/* Social, Copyright, Disclaimer */}
      <div className="max-w-7xl mx-auto px-6 border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Side */}
        <div className="flex flex-col gap-2 text-center md:text-left">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} LG Electronics India. All rights reserved.
          </p>
          <p className="text-[10px] text-gray-600 max-w-md leading-relaxed font-light">
            Disclaimer: This application is a high-fidelity simulated landing page showcase demonstrating Next.js App Router and Tailwind CSS. All trademarks are the property of their respective owners.
          </p>
        </div>

        {/* Right Side: Social Media Links */}
        <div className="flex flex-col gap-3 items-center md:items-end">
          <div className="flex gap-4 text-gray-500">
            <a href="#" className="hover:text-white transition-colors" aria-label="Facebook"><FacebookIcon /></a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter"><TwitterIcon /></a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram"><InstagramIcon /></a>
            <a href="#" className="hover:text-white transition-colors" aria-label="YouTube"><YoutubeIcon /></a>
            <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn"><LinkedinIcon /></a>
          </div>
          <div className="flex gap-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
            <a href="#" className="hover:text-brand-red">Privacy</a>
            <a href="#" className="hover:text-brand-red">Terms</a>
            <a href="#" className="hover:text-brand-red">Cookies</a>
            <a href="#" className="hover:text-brand-red text-brand-red">India (English)</a>
          </div>
        </div>

      </div>

      {/* Floating Action Button: Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-30 p-3 bg-brand-red hover:bg-brand-red-hover text-white rounded-full shadow-2xl transition-all cursor-pointer hover:scale-105 border border-white/10"
          aria-label="Back to Top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Floating Action Button: WhatsApp Customer Agent Simulator */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
        {showChatbox && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl w-80 h-96 overflow-hidden flex flex-col justify-between animate-slide-up text-[#111111]">
            {/* Chat header */}
            <div className="bg-[#25D366] text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-white rounded-full animate-ping"></div>
                <div className="h-3 w-3 bg-white rounded-full absolute"></div>
                <div>
                  <h4 className="font-bold text-sm">LG Smart Assistant</h4>
                  <span className="text-[10px] text-white/95">Typically replies instantly</span>
                </div>
              </div>
              <button 
                onClick={() => setShowChatbox(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 no-scrollbar text-xs">
              {chatHistory.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl shadow-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#25D366] text-white rounded-tr-none"
                        : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat input box */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-100 bg-white flex gap-2">
              <input
                type="text"
                placeholder="Ask about OLEDs, ACs, warranty..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-full focus:outline-none focus:border-[#25D366] text-xs"
              />
              <button
                type="submit"
                className="p-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full transition-colors cursor-pointer"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        )}

        <button
          onClick={() => setShowChatbox(!showChatbox)}
          className="p-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl transition-all cursor-pointer hover:scale-105 flex items-center justify-center border border-white/10"
          aria-label="Toggle Support Chat"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      </div>

    </footer>
  );
}
