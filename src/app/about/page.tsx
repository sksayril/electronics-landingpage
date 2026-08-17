"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollReveal from "../../components/ScrollReveal";
import { Award, Compass, Heart, ShieldCheck, Cpu, Leaf } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow">
        
        {/* Hero Section */}
        <section className="relative py-24 bg-zinc-950 text-white overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-red/15 to-transparent pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
            <span className="px-3 py-1 bg-brand-red text-white text-[10px] font-bold rounded-full uppercase tracking-wider inline-block">
              Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-tight">
              Pioneering Tomorrow's Smart Living
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
              At KEUKEN, we design premium home electronics and appliances that connect seamlessly, run efficiently, and elevate the daily lives of millions.
            </p>
          </div>
        </section>

        {/* Brand Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left" delay={50}>
              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold uppercase tracking-tight text-[#111111] border-l-4 border-brand-red pl-4">
                  The KEUKEN Philosophy
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  Originally established as a pioneer in kitchen technologies, KEUKEN has expanded its horizons into a complete consumer electronics ecosystem. Today, we are one of India's fastest-growing premium brands, offering cutting-edge OLED televisions, energy-efficient inverter air conditioners, smart refrigerators, and high-performance IT solutions.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  Our name is synonymous with quality, durability, and innovation. Every product we manufacture undergoes rigorous quality testing to ensure it stands the test of time, backed by our legendary KEUKEN Care service network.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" delay={100}>
              <div className="relative rounded-3xl overflow-hidden aspect-video shadow-2xl border border-gray-150">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
                  alt="KEUKEN Advanced Lab" 
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-gray-50 border-t border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
            <div className="space-y-3">
              <h2 className="text-3xl font-extrabold uppercase tracking-tight text-[#111111]">
                What Defines Us
              </h2>
              <p className="text-xs sm:text-sm text-gray-550 max-w-md mx-auto font-light">
                Our core values guide every engineering breakthrough and customer service interaction.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Value 1 */}
              <ScrollReveal direction="up" delay={50}>
                <div className="bg-white border border-gray-200/60 rounded-3xl p-8 text-center space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="h-12 w-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mx-auto">
                    <Cpu className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">AI-Powered Tech</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    From α5 AI TV processors to smart ThinQ IoT refrigerator compressors, we embed intelligent technology in everything we make.
                  </p>
                </div>
              </ScrollReveal>

              {/* Value 2 */}
              <ScrollReveal direction="up" delay={100}>
                <div className="bg-white border border-gray-200/60 rounded-3xl p-8 text-center space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="h-12 w-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mx-auto">
                    <Leaf className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">Green Engineering</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    We commit to 5-star energy ratings, eco-friendly refrigerant gases, and green packaging to build a sustainable future.
                  </p>
                </div>
              </ScrollReveal>

              {/* Value 3 */}
              <ScrollReveal direction="up" delay={150}>
                <div className="bg-white border border-gray-200/60 rounded-3xl p-8 text-center space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="h-12 w-12 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center mx-auto">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 uppercase tracking-wide">Absolute Quality</h3>
                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    Backed by up to 10-year compressor warranties and our expert customer service network, peace of mind is guaranteed.
                  </p>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
