"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";

const sections = [
  { id: "1-definitions", label: "1. Definitions" },
  { id: "2-account-registration", label: "2. Account Registration" },
  { id: "3-acceptable-use-of-the-service", label: "3. Acceptable Use of the Service" },
  { id: "4-payment-and-credits", label: "4. Payment and Credits" },
  { id: "5-intellectual-property", label: "5. Intellectual Property" },
  { id: "6-data-privacy-and-security", label: "6. Data Privacy and Security" },
  { id: "7-service-availability-and-limitation-of-liability", label: "7. Service Availability and Limitation of Liability" },
  { id: "8-client-liability-and-indemnification", label: "8. Client Liability and Indemnification" },
  { id: "9-termination", label: "9. Termination" },
  { id: "10-privacy-policy", label: "10. Privacy Policy" },
  { id: "11-governing-law", label: "11. Governing Law" },
  { id: "12-changes-to-the-terms", label: "12. Changes to the Terms" },
  { id: "contact-us", label: "13. Contact Us" },
];

interface TermsClientProps {
  markdownContent: string;
}

export default function TermsClient({ markdownContent }: TermsClientProps) {
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">("terms");
  const [activeSection, setActiveSection] = useState("1-definitions");
  
  // Ref for auto-scrolling mobile nav pills
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Offset position to account for sticky headers on desktop/mobile
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection((prev) => {
              if (prev !== sections[i].id) {
                // Scroll active pill into view on mobile
                const activePill = document.getElementById(`pill-${sections[i].id}`);
                if (activePill && mobileNavRef.current) {
                  activePill.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest",
                  });
                }
              }
              return sections[i].id;
            });
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [markdownContent]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120; // Offset for sticky navbar & mobile pill-bar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen py-6 sm:py-12 md:py-[64px] overflow-clip">
      <LayoutWrapper>
        <div className="flex flex-col gap-6 sm:gap-10">
          {/* Header Switcher Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-200/80 pb-4 sm:pb-6 gap-4">
            <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-100/80 p-1 rounded-lg w-full sm:w-auto">
              <button
                onClick={() => setActiveTab("privacy")}
                className={`flex-1 sm:flex-none text-center px-3 sm:px-4 py-2 text-[13px] sm:text-[14px] font-medium transition-all rounded-md ${
                  activeTab === "privacy"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setActiveTab("terms")}
                className={`flex-1 sm:flex-none text-center px-3 sm:px-4 py-2 text-[13px] sm:text-[14px] font-medium transition-all rounded-md ${
                  activeTab === "terms"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Terms & Condition
              </button>
            </div>

            <span className="text-[12px] sm:text-[14px] font-medium text-slate-500">
              Last Updated: September 10, 2025
            </span>
          </div>

          {/* Sticky Mobile Section Scroll Navigation (Visible on < lg) */}
          <div className="lg:hidden sticky top-0 z-20 -mx-4 px-4 py-3 bg-[#F8FAFC]/90 backdrop-blur-md border-b border-slate-200/80">
            <div
              ref={mobileNavRef}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth"
            >
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={`mobile-${section.id}`}
                    id={`pill-${section.id}`}
                    onClick={() => scrollToSection(section.id)}
                    className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                      isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {section.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Desktop Sidebar Navigation */}
            <aside className="lg:col-span-4 sticky top-12 hidden lg:block pr-4">
              <h4 className="font-geist text-[18px] font-medium leading-[100%] text-slate-900 tracking-[0px] mb-6">
                Terms and Condition
              </h4>
              <nav className="flex flex-col gap-3">
                {sections.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`text-left font-geist text-[16px] leading-[110%] tracking-[0px] transition-colors ${
                        isActive
                          ? "font-semibold text-slate-900"
                          : "font-normal text-slate-400 hover:text-slate-700"
                      }`}
                    >
                      {section.label}
                    </button>
                  );
                })}
              </nav>
            </aside>

            {/* Rendered Markdown Body */}
            <main className="lg:col-span-8 min-w-0">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="font-geist text-[28px] sm:text-[36px] md:text-[40px] font-medium leading-[1.2] tracking-[0px] text-slate-900 mb-6">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => {
                    const id = String(children)
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")
                      .replace(/(^-|-$)/g, "");
                    return (
                      <h2
                        id={id}
                        className="font-geist text-[20px] sm:text-[24px] font-medium leading-[1.3] tracking-[0px] text-slate-900 mt-8 mb-4 scroll-mt-28"
                      >
                        {children}
                      </h2>
                    );
                  },
                  h3: ({ children }) => (
                    <h3 className="font-geist text-[16px] sm:text-[18px] font-medium text-slate-800 mt-4 mb-2">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="font-inter text-[15px] sm:text-[16px] font-normal leading-[24px] tracking-[0px] text-slate-600 mb-4 break-words">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4 font-inter text-[15px] sm:text-[16px] leading-[24px] text-slate-600">
                      {children}
                    </ul>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-blue-600 font-medium hover:underline break-all"
                    >
                      {children}
                    </a>
                  ),
                  hr: () => <hr className="my-6 sm:my-8 border-slate-200" />,
                }}
              >
                {markdownContent}
              </ReactMarkdown>
            </main>
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}