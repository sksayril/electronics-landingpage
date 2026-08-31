"use client";

import { useState, useEffect } from "react";
import { Send, CheckCircle, AlertCircle, Phone, Mail, User, MessageSquare, Download, FileText } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function EnquirySection() {
  const { enquiryMessage } = useApp();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  // Pre-fill from Context State
  useEffect(() => {
    if (enquiryMessage) {
      setFormData((prev) => ({ ...prev, message: enquiryMessage }));
    }
  }, [enquiryMessage]);

  // Pre-fill from URL Search Params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productParam = params.get("product");
    if (productParam) {
      const msg = `I am interested in buying: ${decodeURIComponent(productParam)}. Please provide more details and the best offer quote.`;
      setFormData((prev) => ({ ...prev, message: msg }));
    }
  }, []);

  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Front-end Validation
    if (!formData.name.trim()) {
      setStatus({ type: "error", message: "Name is required" });
      return;
    }
    if (!formData.email.trim()) {
      setStatus({ type: "error", message: "Email is required" });
      return;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus({ type: "error", message: "Please enter a valid email address" });
      return;
    }
    if (!formData.mobile.trim()) {
      setStatus({ type: "error", message: "Mobile number is required" });
      return;
    }
    // Simple mobile format validation (allow digits, spaces, hyphens, plus sign)
    const mobileRegex = /^[+]?[0-9\s-]{10,15}$/;
    if (!mobileRegex.test(formData.mobile.replace(/\s+/g, ""))) {
      setStatus({ type: "error", message: "Please enter a valid 10-15 digit mobile number" });
      return;
    }

    setStatus({ type: "loading", message: "Submitting your enquiry..." });

    try {
      const response = await fetch("/api/enquire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus({
        type: "success",
        message: "Your enquiry has been submitted! A KEUKEN specialist will contact you shortly.",
      });

      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: "",
      });
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error.message || "Failed to submit enquiry. Please check your connection.",
      });
    }
  };

  return (
    <section id="enquire" className="py-20 bg-zinc-950 text-white relative overflow-hidden border-t border-zinc-900">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="px-3 py-1 bg-brand-red text-white text-[10px] font-bold rounded-full uppercase tracking-wider inline-block">
              Enquire Now
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight leading-tight">
              Let Our Experts Help You Upgrade
            </h2>
            <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
              Have questions about our premium OLED TVs, Smart Refrigerators, AI Washers, or Inverter ACs? Want to learn about our best care warranty plans and corporate solutions? 
            </p>
            <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
              Fill out the enquiry form, and our representative will provide a personalized product demo and best-offer quote.
            </p>

            <div className="pt-6 border-t border-zinc-900 space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="h-9 w-9 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 shrink-0">
                  <Phone className="h-4 w-4 text-brand-red" />
                </div>
                <div>
                  <p className="font-semibold">Toll-Free Customer Support</p>
                  <p className="text-xs text-gray-450 font-light">1800-KEUKEN-CARE (1800-123-4567)</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="h-9 w-9 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 shrink-0">
                  <Mail className="h-4 w-4 text-brand-red" />
                </div>
                <div>
                  <p className="font-semibold">Email Enquiries</p>
                  <a href="mailto:info@keuken.in" className="text-xs text-brand-red hover:underline font-light">info@keuken.in</a>
                </div>
              </div>

              {/* Product Catalogue Download Card */}
              <div className="pt-2">
                <a
                  href="/KeuKen_Product_Catalogue_2026_2027_Printable.pdf"
                  download="KeuKen_Product_Catalogue_2026_2027.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-900/80 border border-zinc-800 hover:border-brand-red/60 text-gray-300 hover:text-white transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-brand-red/5"
                >
                  <div className="h-10 w-10 rounded-xl bg-brand-red/15 group-hover:bg-brand-red text-brand-red group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <Download className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-xs text-white uppercase tracking-wider">2026-2027 Catalogue</p>
                      <span className="text-[9px] bg-brand-red/20 text-brand-red px-1.5 py-0.5 rounded font-mono">PDF</span>
                    </div>
                    <p className="text-[11px] text-gray-400 group-hover:text-gray-200 font-light mt-0.5">
                      Download printable product brochure
                    </p>
                  </div>
                  <FileText className="h-4 w-4 text-gray-500 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="glass-panel-dark p-8 sm:p-10 rounded-3xl border border-zinc-850 relative shadow-2xl">
              
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-white tracking-wide uppercase">
                Product & Service Enquiry
              </h3>

              {status.type === "success" ? (
                <div className="text-center py-10 space-y-4 animate-fade-in">
                  <div className="inline-flex items-center justify-center h-16 w-16 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white uppercase tracking-wide">Thank You!</h4>
                  <p className="text-sm text-gray-400 max-w-md mx-auto font-light leading-relaxed">
                    {status.message}
                  </p>
                  <button
                    onClick={() => setStatus({ type: "idle", message: "" })}
                    className="mt-4 px-6 py-2 border border-zinc-700 hover:border-white text-zinc-300 hover:text-white rounded-full text-xs font-bold transition-all cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                      Full Name <span className="text-brand-red">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-red focus:bg-zinc-900 text-white placeholder-gray-600 transition-all duration-250"
                      />
                    </div>
                  </div>

                  {/* Email & Mobile Number Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    
                    {/* Email field */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                        Email Address <span className="text-brand-red">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                          <Mail className="h-4 w-4" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="e.g. john@example.com"
                          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-red focus:bg-zinc-900 text-white placeholder-gray-600 transition-all duration-250"
                        />
                      </div>
                    </div>

                    {/* Mobile number field */}
                    <div className="space-y-2">
                      <label htmlFor="mobile" className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                        Mobile Number <span className="text-brand-red">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                          <Phone className="h-4 w-4" />
                        </div>
                        <input
                          type="tel"
                          name="mobile"
                          id="mobile"
                          required
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="e.g. 9876543210"
                          className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-red focus:bg-zinc-900 text-white placeholder-gray-600 transition-all duration-250"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Message field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-400">
                      Your Message / Inquiry Details
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3.5 pointer-events-none text-gray-500">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <textarea
                        name="message"
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please tell us which product or plan you are looking for..."
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-red focus:bg-zinc-900 text-white placeholder-gray-600 transition-all duration-250 resize-none"
                      />
                    </div>
                  </div>

                  {/* Status Indicator */}
                  {status.type === "error" && (
                    <div className="flex items-center gap-2 p-3 bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs font-semibold rounded-xl animate-fade-in">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{status.message}</span>
                    </div>
                  )}

                  {status.type === "loading" && (
                    <div className="flex items-center gap-2 p-3 bg-zinc-900 border border-zinc-850 text-gray-405 text-xs rounded-xl">
                      <div className="h-3.5 w-3.5 border-2 border-brand-red border-t-transparent rounded-full animate-spin"></div>
                      <span>{status.message}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status.type === "loading"}
                    className="w-full py-4 bg-brand-red hover:bg-brand-red-hover disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-brand-red/10 flex items-center justify-center gap-2.5 cursor-pointer transform hover:scale-101 active:scale-99 duration-200"
                  >
                    Send Inquiry <Send className="h-4.5 w-4.5" />
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
