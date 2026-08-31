"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EnquirySection from "../../components/EnquirySection";
import ScrollReveal from "../../components/ScrollReveal";
import { Phone, Mail, MapPin, Globe, Download } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow">
        
        {/* Title Banner */}
        <section className="relative py-20 bg-zinc-950 text-white overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-red/15 to-transparent pointer-events-none"></div>
          <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-4">
            <span className="px-4 py-1.5 bg-brand-red text-white text-[10px] font-bold rounded-full uppercase tracking-widest inline-block">
              INNOVATION | QUALITY | RELIABILITY
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight">
              Connect With Us
            </h1>
            <p className="text-sm sm:text-base text-gray-300 font-normal max-w-xl mx-auto leading-relaxed">
              "Bringing smart technology and elegant design together to create better homes."
            </p>
          </div>
        </section>

        {/* Contact Info cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Call Support */}
            <ScrollReveal direction="up" delay={50}>
              <div className="border border-gray-150 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 space-y-3 h-full flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
                    <Phone className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mt-3">Contact No</h3>
                  <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                    Speak directly with our advisors & support team.
                  </p>
                </div>
                <div className="text-xs font-bold text-brand-red pt-2 space-y-0.5 border-t border-gray-100">
                  <div><a href="tel:03335386816" className="hover:underline">033 35386816</a></div>
                  <div><a href="tel:8240717312" className="hover:underline">8240717312</a></div>
                </div>
              </div>
            </ScrollReveal>

            {/* Email Us */}
            <ScrollReveal direction="up" delay={100}>
              <div className="border border-gray-150 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 space-y-3 h-full flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
                    <Mail className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mt-3">Email Us</h3>
                  <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                    Send us your product, warranty & corporate queries.
                  </p>
                </div>
                <div className="text-xs font-bold text-brand-red pt-2 border-t border-gray-100">
                  <a href="mailto:info@keuken.in" className="hover:underline">info@keuken.in</a>
                </div>
              </div>
            </ScrollReveal>

            {/* Corporate HQ */}
            <ScrollReveal direction="up" delay={150}>
              <div className="border border-gray-150 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 space-y-3 h-full flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mt-3">Corporate HQ</h3>
                  <p className="text-[11px] text-gray-600 font-normal leading-relaxed">
                    UNIT-1111A, 11TH FLOOR, PS QUBE BUILDING, NEWTOWN, KOLKATA-700161
                  </p>
                </div>
                <div className="text-xs font-bold text-gray-900 pt-2 border-t border-gray-100">
                  PIN: 700161
                </div>
              </div>
            </ScrollReveal>

            {/* Web Portal */}
            <ScrollReveal direction="up" delay={200}>
              <div className="border border-gray-150 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 space-y-3 h-full flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center">
                    <Globe className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mt-3">Official Web</h3>
                  <p className="text-[11px] text-gray-500 font-light leading-relaxed">
                    Visit our official portal for products & customer support.
                  </p>
                </div>
                <div className="text-xs font-bold text-brand-red pt-2 border-t border-gray-100">
                  <a href="https://www.keuken.in" target="_blank" rel="noopener noreferrer" className="hover:underline">WWW.KEUKEN.IN</a>
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
