"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "@/shared/icons/ArrowIcon";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";
import CardCom from "@/shared/ui/card/CardCom";
import GitterImage from "@/shared/ui/GitterImg";

type TocItem = {
  id: string;
  text: string;
};

interface ArticleData {
  id: string;
  collectionId: string;
  title: string;
  author: string;
  author_role: string;
  created: string;
  description: string;
  image: string;
  category: string;
}

export default function BlogDetailsPage({
  blogDetails,
  relatedArticles = [],
}: {
  blogDetails: ArticleData;
  relatedArticles?: ArticleData[];
}) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [formattedContent, setFormattedContent] = useState<string>("");

  useEffect(() => {
    if (!blogDetails?.description) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(blogDetails.description, "text/html");
    const headings = doc.querySelectorAll("h2");
    const extractedToc: TocItem[] = [];

    headings.forEach((heading, index) => {
      const id = heading.id || `section-${index + 1}`;
      heading.id = id;

      heading.className =
        "font-geist text-[26px] leading-[130%] font-medium text-slate-900 md:text-[32px] pt-8 pb-3";

      extractedToc.push({
        id,
        text: heading.textContent || `Section ${index + 1}`,
      });
    });

    setToc(extractedToc);
    setFormattedContent(doc.body.innerHTML);
  }, [blogDetails?.description]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Track Active Heading Position
      const headings = document.querySelectorAll("article h2");
      let currentActiveId = "";

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 120) {
          currentActiveId = heading.id;
        }
      });

      if (currentActiveId) setActiveId(currentActiveId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const offset = 100; // Account for fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  const imageUrl = blogDetails?.image
    ? `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${blogDetails.collectionId}/${blogDetails.id}/${blogDetails.image}`
    : "/placeholder-image.webp";

  return (
    <article className="relative min-h-screen w-full bg-white pt-21 text-slate-900">
      <LayoutWrapper>
        <div className="flex flex-col items-start gap-[32px] pt-6 pb-8">
          <Button href="/blog" variant="tertiary">
            <ArrowIcon className="rotate-180" strokeWidth={2} />
            Back
          </Button>

          <h1 className="max-w-[703px] text-[28px] leading-[1.2] font-medium max-md:text-[32px] md:text-[42px]">
            {blogDetails?.title}
          </h1>

          <div className="flex items-center justify-between gap-2">
            <div className="box h-9.5 w-9.5 rounded-sm bg-[#110017]"></div>
            <div className="flex flex-col gap-1.5">
              <p className="text-[16px] leading-[100%] font-medium">
                {blogDetails?.author_role || blogDetails?.author}
              </p>
              <div className="font-inter flex items-center gap-2.5 text-sm leading-[1.1] text-slate-700">
                <p>7 min read</p>
                <div className="h-2 w-2 bg-slate-200"></div>
                <p>
                  {blogDetails?.created
                    ? new Date(blogDetails.created).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="py-8">
          <div className="relative h-[240px] w-full max-w-[834px] overflow-hidden rounded-lg bg-[#C5ADEC] md:h-[437px]">
            <Image
              src={imageUrl}
              alt={blogDetails?.title || "Blog cover image"}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>

        {/* Main Content Area + Sidebar */}
        <div className="flex flex-col gap-12 pb-20 lg:mt-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          {/* Dynamic Article HTML */}
          <article
            className="font-inter flex-1 space-y-4 text-[16px] leading-[160%] text-[#232529] lg:max-w-[810px]"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />

          {/* Table of Contents Sticky Sidebar */}
          <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:w-[286px]">
            {toc.length > 0 && (
              <div>
                <h4 className="font-geist mb-5 text-[18px] leading-none font-medium text-slate-900">
                  In this article
                </h4>
                <nav className="relative flex flex-col gap-4 border-l-2 border-slate-200/80">
                  {toc.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => scrollToSection(e, item.id)}
                        className={`font-inter relative pl-4 text-[14px] leading-[135%] transition-colors hover:text-[#D14FFF] ${
                          isActive
                            ? "font-medium text-[#D14FFF]"
                            : "text-slate-500"
                        }`}
                      >
                        {isActive && (
                          <span className="absolute top-0 -left-[2px] h-full w-[2px] rounded-full bg-[#D14FFF]" />
                        )}
                        {item.text}
                      </a>
                    );
                  })}
                </nav>
              </div>
            )}
          </aside>
        </div>
      </LayoutWrapper>

      {/* Same Categories Articles Section */}
      <section className="relative z-[10] w-full bg-slate-50 pt-16 pb-12">
        <LayoutWrapper>
          <h3 className="font-geist mb-4.5 text-[28px] font-medium text-slate-900 md:text-[48px]">
            Explore more articles
          </h3>
        </LayoutWrapper>

        <div className="relative flex flex-col gap-12 py-8">
          <GitterImage />
          <LayoutWrapper>
            {relatedArticles.length > 0 ? (
              <div className="relative z-[10] grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((article) => {
                  const cardImg = article.image
                    ? `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/${article.collectionId}/${article.id}/${article.image}`
                    : "/placeholder-image.webp";

                  return (
                    <CardCom
                      key={article.id}
                      story={{
                        id: article.id,
                        title: article.title,
                        category: article.category,
                        date: new Date(article.created).toLocaleDateString(),
                        imageSrc: cardImg,
                      }}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-500">
                No related articles found in this category.
              </p>
            )}
          </LayoutWrapper>
        </div>
      </section>
    </article>
  );
}
