"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import remarkGfm from "remark-gfm";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";

interface TermsClientProps {
  markdownContent: string;
  initialTab?: "terms" | "privacy";
}

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};


const markdownComponents = {
  h1: ({ children }: any) => (
    <h1 className="font-geist text-[28px] sm:text-[36px] md:text-[40px] leading-[1.2] tracking-[0px] text-slate-900 mb-6">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => {
    const rawText = Array.isArray(children)
      ? children.join("")
      : String(children ?? "");

    const id = slugify(rawText);

    return (
      <h2
        id={id}
        className="font-geist text-[20px] sm:text-[24px] leading-[1.3] tracking-[0px] text-slate-900 mt-8 mb-4 scroll-mt-28"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }: any) => (
    <h3 className="font-geist text-[16px] sm:text-[18px] text-slate-800 mt-4 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }: any) => (
    <p className="font-inter text-[15px] sm:text-[16px] font-normal leading-[24px] tracking-[0px] text-slate-600 mb-4 break-words">
      {children}
    </p>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc pl-5 sm:pl-6 space-y-2 mb-4 font-inter text-[15px] sm:text-[16px] leading-[24px] text-slate-600">
      {children}
    </ul>
  ),
  a: ({ href, children }: any) => (
    <a href={href} className="text-blue-600 hover:underline break-all">
      {children}
    </a>
  ),
  hr: () => <hr className="my-6 sm:my-8 border-slate-200" />,
};

export default function TermsClient({
  markdownContent,
  initialTab = "terms",
}: TermsClientProps) {
  const router = useRouter();
  const [activeTab] = useState<"privacy" | "terms">(initialTab);

  const sections = useMemo(() => {
    const h2Regex = /^##\s+(.+)$/gm;
    const matches: { id: string; label: string }[] = [];
    let match;

    while ((match = h2Regex.exec(markdownContent)) !== null) {
      const label = match[1].trim();
      matches.push({
        id: slugify(label),
        label,
      });
    }

    return matches;
  }, [markdownContent]);

  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || ""
  );
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    if (sections.length > 0) {
      setActiveSection(sections[0].id);
    }
  }, [sections]);

  useEffect(() => {
    if (sections.length === 0) return;

    const computeActiveSection = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection((prev) => {
              if (prev !== sections[i].id) {
                const activePill = document.getElementById(
                  `pill-${sections[i].id}`
                );
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

      tickingRef.current = false;
    };

    // Throttle to one scroll-position check per animation frame instead of
    // running the DOM lookup loop on every scroll event.
    const handleScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(computeActiveSection);
      }
    };

    computeActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = useCallback((id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  const handleTabChange = useCallback(
    (tab: "terms" | "privacy") => {
      router.push(
        tab === "terms" ? "/terms-and-conditions" : "/privacy-policy"
      );
    },
    [router]
  );

  return (
    <div className="w-full bg-[#EDF4FF14] h-full py-21 md:py-[120px] overflow-clip">
      <LayoutWrapper>
        <div className="flex flex-col gap-6 sm:gap-10">
          <div className="flex items-start flex-col lg:flex-row justify-between border-b border-slate-200/80 pb-4 sm:pb-6 gap-4">
            <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
              <Button
                className={
                  activeTab === "terms" ? "bg-alpha-light-50" : "bg-transparent text-slate-700"
                }
                onClick={() => handleTabChange("terms")}
                variant="secondary"
              >
                Terms & Conditions
              </Button>
              <Button
                className={
                  activeTab === "privacy"
                    ? " bg-alpha-light-50"
                    : " text-slate-700"
                }
                onClick={() => handleTabChange("privacy")}
                variant="secondary"
              >
                Privacy Policy
              </Button>
            </div>

            <span className="text-[12px] sm:text-[14px] text-slate-900">
              Last Updated: September 10, 2025
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <aside className="lg:col-span-4 sticky top-12 hidden lg:block pr-4">
              <h4 className="font-geist text-[18px] leading-[100%] text-slate-900 tracking-[0px] mb-6">
                {activeTab === "terms"
                  ? "Terms and Conditions"
                  : "Privacy Policy"}
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

            <main className="lg:col-span-8 min-w-0">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {markdownContent}
              </ReactMarkdown>
            </main>
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}