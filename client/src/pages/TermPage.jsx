import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  const sections = [
    { id: '01', title: 'Introduction' },
    { id: '02', title: 'Intellectual Property' },
    { id: '03', title: 'Terms of Sale' },
    { id: '04', title: 'Shipping & Delivery' },
    { id: '05', title: 'Liability' },
    { id: '06', title: 'Governing Law' },
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#1A1A1A] font-sans antialiased select-none">
      
      <div className="max-w-7xl mx-auto pt-36 sm:pt-40 pb-24 px-6 sm:px-12 lg:px-16">
        
        {/* Header Block Frame */}
        <header className="relative border-b border-[#1A1A1A]/10 pb-12 mb-16 w-full">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#A8A29E] uppercase block mb-3">
            Legal Framework
          </span>
          <h1 className="text-5xl md:text-6xl font-serif text-[#1A1A1A] tracking-tight mb-8">
            Terms and Conditions
          </h1>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 max-w-5xl">
            <p className="text-sm text-[#1A1A1A]/80 leading-relaxed font-light max-w-2xl">
              These terms constitute a legally binding agreement between you and Nestora. 
              By accessing our gallery or acquiring our architectural pieces, you acknowledge 
              and agree to the following standards of craftsmanship and conduct.
            </p>
            <div className="md:text-right shrink-0">
              <span className="block text-[9px] font-bold tracking-widest uppercase text-[#A8A29E] mb-1">
                Last Updated
              </span>
              <span className="text-xs font-bold tracking-wider text-[#1A1A1A]">
                OCTOBER 24, 2024
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Inner Layout Frame Split */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start w-full">
          
          {/* Left Anchor Section Menu Index */}
          <aside className="lg:sticky lg:top-40 w-full lg:w-64 shrink-0 space-y-4">
            <span className="block text-[10px] font-bold tracking-[0.25em] text-[#A8A29E] uppercase mb-6">
              Sections
            </span>
            <nav className="flex flex-col space-y-3">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#section-${section.id}`}
                  className="group flex items-center text-xs font-medium tracking-wide text-[#A8A29E] hover:text-[#1A1A1A] transition-colors duration-200"
                >
                  <span className="w-4 inline-block font-light text-[#1A1A1A]/30 group-hover:text-[#1A1A1A]/70 transition-colors mr-1">
                    |
                  </span>
                  <span className="font-mono text-[11px] mr-2 text-[#1A1A1A]/50 group-hover:text-[#1A1A1A]">
                    {section.id}.
                  </span>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Right Core Content Stream Frame */}
          <main className="flex-1 space-y-20 max-w-3xl">
            
            {/* 01. Introduction */}
            <section id="section-01" className="scroll-mt-40 space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] tracking-wide flex items-baseline gap-3">
                <span className="font-mono text-base font-light text-[#1A1A1A]/60">01.</span> Introduction
              </h2>
              <div className="text-xs md:text-sm font-light text-[#1A1A1A]/80 leading-relaxed space-y-4 tracking-wide">
                <p>
                  Welcome to Nestora. These Terms and Conditions govern your use of our website and the purchase 
                  of our products. Throughout the site, the terms "we", "us", and "our" refer to Nestora Architectural 
                  Furniture.
                </p>
                <p>
                  By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to 
                  be bound by the following terms and conditions. These Terms of Service apply to all users of the site, 
                  including without limitation users who are browsers, vendors, customers, merchants, and/or 
                  contributors of content.
                </p>
              </div>
            </section>

            {/* 02. Intellectual Property */}
            <section id="section-02" className="scroll-mt-40 space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] tracking-wide flex items-baseline gap-3">
                <span className="font-mono text-base font-light text-[#1A1A1A]/60">02.</span> Intellectual Property
              </h2>
              <div className="text-xs md:text-sm font-light text-[#1A1A1A]/80 leading-relaxed space-y-4 tracking-wide">
                <p>
                  All content included on this site, such as furniture designs, architectural plans, text, graphics, logos, 
                  button icons, images, audio clips, digital downloads, data compilations, and software, is the property 
                  of Nestora or its content suppliers and protected by international copyright laws.
                </p>
                <p>
                  Our designs are the result of rigorous craftsmanship and artistic endeavor. Any reproduction, 
                  modification, distribution, transmission, republication, display, or performance of the content on this 
                  site is strictly prohibited without prior written consent from Nestora.
                </p>
                <div className="pt-2 space-y-2">
                  <div className="flex items-center gap-3 text-xs tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6B543D]"></span>
                    <p>Nestora™ is a registered trademark of Nestora Furniture Group.</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6B543D]"></span>
                    <p>All product silhouettes are proprietary intellectual property.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 03. Terms of Sale Split Card Container Layout */}
            <section id="section-03" className="scroll-mt-40 space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] tracking-wide flex items-baseline gap-3">
                <span className="font-mono text-base font-light text-[#1A1A1A]/60">03.</span> Terms of Sale
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#F4F1EA]/50 border border-[#1A1A1A]/5 p-6 space-y-3">
                  <span className="block text-[9px] font-bold tracking-widest uppercase text-[#A8A29E]">
                    Custom Pieces
                  </span>
                  <p className="text-xs font-light text-[#1A1A1A]/80 leading-relaxed tracking-wide">
                    Orders for bespoke or customized furniture require a 50% non-refundable deposit. Production timelines are estimates and subject to material availability.
                  </p>
                </div>
                <div className="bg-[#F4F1EA]/50 border border-[#1A1A1A]/5 p-6 space-y-3">
                  <span className="block text-[9px] font-bold tracking-widest uppercase text-[#A8A29E]">
                    Cancellations
                  </span>
                  <p className="text-xs font-light text-[#1A1A1A]/80 leading-relaxed tracking-wide">
                    Orders for standard catalog items may be cancelled within 24 hours of placement. After this window, a 15% restocking fee applies.
                  </p>
                </div>
              </div>
            </section>

            {/* 04. Shipping & Delivery */}
            <section id="section-04" className="scroll-mt-40 space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] tracking-wide flex items-baseline gap-3">
                <span className="font-mono text-base font-light text-[#1A1A1A]/60">04.</span> Shipping & Delivery
              </h2>
              <div className="text-xs md:text-sm font-light text-[#1A1A1A]/80 leading-relaxed space-y-4 tracking-wide">
                <p>
                  Due to the architectural scale and weight of our pieces, shipping is handled via specialized "White 
                  Glove" logistics partners. We ship globally to over 40 countries, with specific quotes provided at 
                  checkout based on crate dimensions and destination requirements.
                </p>
                <p>
                  Delivery includes placement in the room of your choice, assembly (if required), and removal of all 
                  packaging materials. The customer is responsible for ensuring that the piece can physically fit 
                  through entrances and hallways.
                </p>
              </div>
            </section>

            {/* 05. Liability Quote Split Layout Frame */}
            <section id="section-05" className="scroll-mt-40 space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] tracking-wide flex items-baseline gap-3">
                <span className="font-mono text-base font-light text-[#1A1A1A]/60">05.</span> Liability
              </h2>
              <div className="flex flex-col md:flex-row gap-6 md:items-start md:justify-between pt-2">
                <div className="w-full md:w-1/3">
                  {/* Empty or Left Alignment Space to match empty baseline column block */}
                </div>
                <div className="flex-1 border-l-2 border-[#1A1A1A]/10 pl-6 space-y-2">
                  <p className="text-xs md:text-sm italic font-light text-[#1A1A1A]/70 leading-relaxed tracking-wide">
                    "Nestora shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses."
                  </p>
                  <span className="block text-[10px] text-[#A8A29E] tracking-wide pt-1">
                    Section 5.4 - Limitation of Damages
                  </span>
                </div>
              </div>
            </section>

            {/* 06. Governing Law */}
            <section id="section-06" className="scroll-mt-40 space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] tracking-wide flex items-baseline gap-3">
                <span className="font-mono text-base font-light text-[#1A1A1A]/60">06.</span> Governing Law
              </h2>
              <div className="text-xs md:text-sm font-light text-[#1A1A1A]/80 leading-relaxed tracking-wide">
                <p>
                  These Terms of Service and any separate agreements whereby we provide you Services shall be 
                  governed by and construed in accordance with the laws of the jurisdiction in which Nestora is 
                  registered, without regard to conflict of law principles.
                </p>
              </div>
            </section>

          </main>
        </div>

      </div>
    </div>
  );
};

export default TermsAndConditions;