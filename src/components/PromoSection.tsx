"use client";

import { ShieldCheck, Award, ArrowRight, RefreshCw, BadgePercent } from "lucide-react";

export default function PromoSection() {
  return (
    <section id="offers" className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Promo Card 1: LG Best Care */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-[#13070b] to-[#250d15] text-white p-8 md:p-10 flex flex-col justify-between h-[300px] md:h-[350px] shadow-lg group hover:shadow-2xl transition-all duration-300">
            
            {/* Background glowing sphere */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl group-hover:bg-brand-red/20 transition-all duration-500 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-start gap-4">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-brand-red text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                <ShieldCheck className="h-3 w-3" /> LG Best Care®
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight leading-tight mt-1">
                Annual Maintenance & Warranty
              </h3>
              <p className="text-xs md:text-sm text-gray-300 max-w-sm mt-1 font-light leading-relaxed">
                Protect your home electronics with certified LG spare parts, free labor coverage, and support by factory-trained expert engineers.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-white/10 w-full">
              <span className="text-xs font-semibold text-red-300">
                15% Discount on AMC Bookings this week
              </span>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold rounded-full transition-colors cursor-pointer self-start sm:self-auto group-hover:translate-x-1 duration-200">
                Register AMC Plan <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>

          {/* Promo Card 2: Upgrade and Save */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-50 to-zinc-100 border border-gray-200 p-8 md:p-10 flex flex-col justify-between h-[300px] md:h-[350px] shadow-sm hover:shadow-lg transition-all duration-300 group">
            
            {/* Background glowing sphere */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-start gap-4">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-[#202020] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                <RefreshCw className="h-3 w-3 animate-spin-slow" /> Exchange Promo
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight leading-tight mt-1 text-[#202020]">
                Upgrade Your Home & Save Big
              </h3>
              <p className="text-xs md:text-sm text-gray-600 max-w-sm mt-1 font-light leading-relaxed">
                Trade in your old television, refrigerator, or washing machine of any brand and receive up to <span className="font-bold text-brand-red">₹15,000 instant cashback</span>.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-gray-200 w-full">
              <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                <BadgePercent className="h-4 w-4 text-brand-red" /> No-cost EMIs starting from ₹2,999/month
              </span>
              <button className="flex items-center gap-2 px-6 py-2.5 bg-[#202020] hover:bg-brand-red hover:text-white text-white text-xs font-bold rounded-full transition-colors cursor-pointer self-start sm:self-auto group-hover:translate-x-1 duration-200">
                Check Value <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
