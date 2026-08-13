"use client";

import React, { useState } from "react";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";
import CardCom from "@/shared/ui/card/CardCom";
import FeaturedCard from "./_components/FeaturedCard";
import CategoryFilter from "./_components/CategoryFilter";
import { BlogPost, Category } from "./type";

const CATEGORIES: Category[] = [
  { id: 1, name: "All", count: 12 },
  { id: 2, name: "Identity", count: 10 },
  { id: 3, name: "Compliance", count: 10 },
  { id: 4, name: "AI", count: 10 },
  { id: 5, name: "Security", count: 10 },
  { id: 6, name: "Product", count: 10 },
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    category: "Marketing",
    title:
      "Fraudology: Closing the chargeback representment gap between issuers and",
    date: "JUL 7, 2026",
    image:
      "https://res.cloudinary.com/dfajjqglx/image/upload/v1786620030/Container-5_l5etry.png",
  },
  {
    id: 2,
    category: "Marketing",
    title:
      "Fraudology: Closing the chargeback representment gap between issuers and",
    date: "JUL 7, 2026",
    image:
      "https://res.cloudinary.com/dfajjqglx/image/upload/v1786620030/Container-4_dwkcl2.png",
  },
  {
    id: 3,
    category: "Marketing",
    title:
      "Fraudology: Closing the chargeback representment gap between issuers and",
    date: "JUL 7, 2026",
    image:
      "https://res.cloudinary.com/dfajjqglx/image/upload/v1786620030/Container-3_oqvwkv.png",
  },
  {
    id: 4,
    category: "Marketing",
    title:
      "Fraudology: Closing the chargeback representment gap between issuers and",
    date: "JUL 7, 2026",
    image:
      "https://res.cloudinary.com/dfajjqglx/image/upload/v1786620030/Container-2_vn1r0l.png",
  },
  {
    id: 5,
    category: "Marketing",
    title:
      "Fraudology: Closing the chargeback representment gap between issuers and",
    date: "JUL 7, 2026",
    image:
      "https://res.cloudinary.com/dfajjqglx/image/upload/v1786620030/Container-4_dwkcl2.png",
  },
  {
    id: 6,
    category: "Marketing",
    title:
      "Fraudology: Closing the chargeback representment gap between issuers and",
    date: "JUL 7, 2026",
    image:
      "https://res.cloudinary.com/dfajjqglx/image/upload/v1786620030/Container-1_prgxtp.png",
  },
  {
    id: 7,
    category: "Marketing",
    title:
      "Fraudology: Closing the chargeback representment gap between issuers and",
    date: "JUL 7, 2026",
    image:
      "https://res.cloudinary.com/dfajjqglx/image/upload/v1786620030/Container_xcsols.png",
  },
  {
    id: 8,
    category: "Marketing",
    title:
      "Fraudology: Closing the chargeback representment gap between issuers and",
    date: "JUL 7, 2026",
    image:
      "https://res.cloudinary.com/dfajjqglx/image/upload/v1786620030/Container-4_dwkcl2.png",
  },
  {
    id: 9,
    category: "Marketing",
    title:
      "Fraudology: Closing the chargeback representment gap between issuers and",
    date: "JUL 7, 2026",
    image:
      "https://res.cloudinary.com/dfajjqglx/image/upload/v1786620030/Container-4_dwkcl2.png",
  },
  {
    id: 10,
    category: "Marketing",
    title:
      "Fraudology: Closing the chargeback representment gap between issuers and",
    date: "JUL 7, 2026",
    image:
      "https://res.cloudinary.com/dfajjqglx/image/upload/v1786620030/Container-5_l5etry.png",
  },
  {
    id: 11,
    category: "Marketing",
    title:
      "Fraudology: Closing the chargeback representment gap between issuers and",
    date: "JUL 7, 2026",
    image:
      "https://res.cloudinary.com/dfajjqglx/image/upload/v1786620030/Container-5_l5etry.png",
  },
  {
    id: 12,
    category: "Marketing",
    title:
      "Fraudology: Closing the chargeback representment gap between issuers and",
    date: "JUL 7, 2026",
    image:
      "https://res.cloudinary.com/dfajjqglx/image/upload/v1786620030/Container-4_dwkcl2.png",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<number>(
    CATEGORIES[0].id,
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pt-[120px] pb-20 lg:pt-[188px]">
      <LayoutWrapper>
        <div className="flex flex-col gap-12">
          <h2 className="text-[26px] leading-[1.2] font-medium text-black max-md:max-w-[201px] lg:text-[48px]">
            The Thirdfactor Blogs
          </h2>

          <CategoryFilter
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>
        <div  className="w-full h-px bg-slate-200 lg:mt-8"/>

        <div className="blog-cards-container mt-12 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS[0] && <FeaturedCard post={BLOG_POSTS[0]} />}

          {BLOG_POSTS[1] && (
            <CardCom
              story={{
                id: BLOG_POSTS[1].id,
                title: BLOG_POSTS[1].title,
                category: BLOG_POSTS[1].category,
                date: BLOG_POSTS[1].date,
                imageSrc: BLOG_POSTS[1].image,
              }}
            />
          )}

          {BLOG_POSTS[2] && <FeaturedCard className=" lg:flex-row-reverse!" post={BLOG_POSTS[2]} reversed />}

          {BLOG_POSTS[3] && (
            <CardCom
              story={{
                id: BLOG_POSTS[3].id,
                title: BLOG_POSTS[3].title,
                category: BLOG_POSTS[3].category,
                date: BLOG_POSTS[3].date,
                imageSrc: BLOG_POSTS[3].image,
              }}
            />
          )}

          {BLOG_POSTS.slice(4).map((post) => (
            <CardCom
              key={post.id}
              story={{
                id: post.id,
                title: post.title,
                category: post.category,
                date: post.date,
                imageSrc: post.image,
              }}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="primary">View more blog</Button>
        </div>
      </LayoutWrapper>
    </div>
  );
}
