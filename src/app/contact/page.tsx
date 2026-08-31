"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EnquirySection from "../../components/EnquirySection";
import ScrollReveal from "../../components/ScrollReveal";
import { Phone, Mail, MapPin, Clock, Download } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow">
        
        {/* Title Banner */}
        <section className="relative py-20 bg-zinc-950 text-white overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-red/15 to-transparent pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4">
            <span className="px-3 py-1 bg-brand-red text-white text-[10px] font-bold rounded-full uppercase tracking-wider inline-block">
              Get in touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight">
              Contact KEUKEN
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 font-light max-w-lg mx-auto leading-relaxed">
              Reach out to our customer care team, corporate headquarters, or download our official product catalogue. We're here to help.
            </p>
          </div>
        </section>

        {/* Contact Info cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Call */}
            <ScrollReveal direction="up" delay={50}>
              <div className="border border-gray-150 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 space-y-3 h-full">
                <div className="h-10 w-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
                  <Phone className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Call Support</h3>
                <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                  Speak to our product advisors or support engineers.
                </p>
                <div className="text-xs font-bold text-brand-red pt-1">
                  1800-123-4567 (Toll Free)
                </div>
              </div>
            </ScrollReveal>

            {/* Email */}
            <ScrollReveal direction="up" delay={100}>
              <div className="border border-gray-150 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 space-y-3 h-full">
                <div className="h-10 w-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Email Us</h3>
                <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                  Send us your warranty, business or general queries.
                </p>
                <div className="text-xs font-bold text-brand-red pt-1">
                  <a href="mailto:info@keuken.in" className="hover:underline">info@keuken.in</a>
                </div>
              </div>
            </ScrollReveal>

            {/* Address */}
            <ScrollReveal direction="up" delay={150}>
              <div className="border border-gray-150 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 space-y-3 h-full">
                <div className="h-10 w-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Corporate HQ</h3>
                <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                  KEUKEN Tower, Sector 62, Gurgaon, Haryana, India.
                </p>
                <div className="text-xs font-bold text-gray-700 pt-1">
                  PIN: 122001
                </div>
              </div>
            </ScrollReveal>

            {/* Timings */}
            <ScrollReveal direction="up" delay={200}>
              <div className="border border-gray-150 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 space-y-3 h-full">
                <div className="h-10 w-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Service Hours</h3>
                <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                  Our service centers operate throughout the week.
                </p>
                <div className="text-xs font-bold text-gray-700 pt-1">
                  Mon - Sun: 9:00 AM - 8:00 PM
                </div>
              </div>
            </ScrollReveal>

            {/* Catalogue Download */}
            <ScrollReveal direction="up" delay={250}>
              <div className="border border-brand-red/30 bg-gradient-to-b from-brand-red/5 to-transparent rounded-2xl p-6 hover:shadow-lg transition-all duration-300 space-y-3 h-full flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-brand-red text-white flex items-center justify-center shadow-md">
                    <Download className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mt-3">2026-27 Catalogue</h3>
                  <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                    Download full high-res printable product brochure.
                  </p>
                </div>
                <a
                  href="/KeuKen_Product_Catalogue_2026_2027_Printable.pdf"
                  download="KeuKen_Product_Catalogue_2026_2027.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 bg-brand-red hover:bg-brand-red-hover text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors text-center"
                >
                  Download PDF
                </a>
              </div>
            </ScrollReveal>

          </div>
        </section>

        {/* Embedded Enquiry Form */}
        <EnquirySection />

      </main>

      <Footer />
    </div>
  );
}
