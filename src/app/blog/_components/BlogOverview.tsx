"use client";

import React, { useMemo, useState } from "react";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";
import CardCom from "@/shared/ui/card/CardCom";
import FeaturedCard from "./FeaturedCard";
import CategoryFilter from "./CategoryFilter";
import { BlogOverviewProps, BlogPost, CardStory } from "../type";

const ALL_CATEGORY_ID = "-1";

function toCardStory(post: BlogPost): CardStory {
  return {
    id: post.id,
    slug: post.slug || post.id,
    title: post.title,
    category: post.category,
    date: post.date,
    imageSrc: post.image,
  };
}

export default function BlogOverview({
  categories = [],
  initialPosts = [],
}: BlogOverviewProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORY_ID);

  const filteredPosts = useMemo(() => {
    if (String(activeCategory) === ALL_CATEGORY_ID) {
      return initialPosts;
    }
    return initialPosts.filter(
      (post) => String(post.categoryId) === String(activeCategory)
    );
  }, [initialPosts, activeCategory]);

  const isAllCategory = String(activeCategory) === ALL_CATEGORY_ID;

  // Destructure for editorial layout when viewing "All"
  const [featured1, second, featured2, fourth, ...rest] = filteredPosts;

  return (
    <div className="min-h-screen bg-slate-50/50 pt-[120px] pb-20 lg:pt-[188px]">
      <LayoutWrapper>
        <div className="flex flex-col gap-12">
          <h2 className="text-[26px] leading-[1.2] font-medium text-black max-md:max-w-[201px] lg:text-[48px]">
            The Thirdfactor Blogs
          </h2>

          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>

        <div className="mt-8 h-px w-full bg-slate-200" />

        <div className="blog-cards-container mt-12 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isAllCategory ? (
            // Layout for "All": Mixed featured and regular grid
            <>
              {featured1 && <FeaturedCard post={featured1} />}
              {second && <CardCom story={toCardStory(second)} />}
              {featured2 && (
                <FeaturedCard
                  className="lg:flex-row-reverse!"
                  post={featured2}
                  reversed
                />
              )}
              {fourth && <CardCom story={toCardStory(fourth)} />}
              {rest.map((post) => (
                <CardCom key={post.id} story={toCardStory(post)} />
              ))}
            </>
          ) : (
            // Specific Category Selected: Standard CardCom Grid
            filteredPosts.map((post) => (
              <CardCom key={post.id} story={toCardStory(post)} />
            ))
          )}
        </div>

        {filteredPosts.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Button variant="primary">View more blog</Button>
          </div>
        )}
      </LayoutWrapper>
    </div>
  );
}