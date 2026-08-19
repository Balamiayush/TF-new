"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Image from "next/image";
import ArrowIcon from "@/shared/icons/ArrowIcon";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";
import { calculateReadTime } from "@/utils/get-calculate-time";
import { getPocketBaseImageUrl } from "@/utils/get-pocket-base-img";
import { formatDate } from "@/utils/get-format-date";
import { scrollToSection } from "@/utils/get-scroll-to";
import { TocItem, ArticleData } from "@/app/blog/type";
import SameCategoryBlog from "./SameCategoryBlog";

export default function BlogDetailsPage({
  blogDetails,
  relatedArticles = [],
}: {
  blogDetails: ArticleData;
  relatedArticles?: ArticleData[];
}) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [formattedContent, setFormattedContent] = useState<string>("");

  const rafRef = useRef<number | null>(null);

  const imageUrl = getPocketBaseImageUrl(
    blogDetails?.collectionId,
    blogDetails?.id,
    blogDetails?.image,
  );

  const formattedDate = formatDate(blogDetails?.created);

  const readTimeMinutes = useMemo(() => {
    if (!blogDetails?.description) return 1;
    return calculateReadTime(blogDetails.description);
  }, [blogDetails?.description]);

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
    if (toc.length === 0) return;

    const handleScroll = () => {
      if (rafRef.current !== null) return; // already scheduled

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

        const headings = document.querySelectorAll("article h2");
        let currentActiveId = "";

        headings.forEach((heading) => {
          const rect = heading.getBoundingClientRect();
          if (rect.top <= 120) {
            currentActiveId = heading.id;
          }
        });

        if (currentActiveId) {
          setActiveId((prev) =>
            prev === currentActiveId ? prev : currentActiveId,
          );
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [toc]);

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
                <p>{readTimeMinutes} min read</p>
                <div className="h-2 w-2 bg-slate-200"></div>
                <p>{formattedDate}</p>
              </div>
            </div>
          </div>
        </div>

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

        <div className="flex flex-col gap-12 pb-20 lg:mt-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <article
            className="font-inter flex-1 space-y-4 text-[16px] leading-[160%] text-[#232529] lg:max-w-[810px]"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />

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
                        onClick={(e) =>
                          scrollToSection({
                            e,
                            id: item.id,
                            offset: 100,
                            onScrollComplete: (id) => setActiveId(id),
                          })
                        }
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

      <SameCategoryBlog relatedArticles={relatedArticles} />
    </article>
  );
}
