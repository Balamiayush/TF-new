import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getPocketBaseImageUrl } from "@/utils/get-pocket-base-img";
import { FeaturedCardProps } from "../type";

export default function FeaturedCard({
  post,
  reversed = false,
  className = "",
}: FeaturedCardProps) {
  const isExternalOrPath =
    post.image?.startsWith("http://") ||
    post.image?.startsWith("https://") ||
    post.image?.startsWith("/");

  const imageSrc = isExternalOrPath
    ? post.image
    : getPocketBaseImageUrl(
        post.collectionId || "blog_posts",
        post.id,
        post.image,
      );

  const slugPath = post.slug || post.id;

  return (
    <Link
      href={`/blog/${slugPath}`}
      className={`group flex cursor-pointer flex-col justify-between rounded-[12px] border border-slate-200 bg-slate-50 p-3 transition-all duration-300 hover:translate-y-[-2.5%] hover:bg-slate-100/80 md:col-span-2 ${
        reversed ? "md:flex-row-reverse" : "md:flex-row"
      } gap-4 md:gap-6 ${className}`}
    >

      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-[8px] border border-black/5 md:w-1/2">
        <Image
          src={imageSrc}
          alt={post.title || "Blog featured image"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-between py-2 pr-2 max-md:p-2">
        <div>
          <div className="font-inter text-[12px] font-medium text-slate-500">
            {post.category}
          </div>

          <h3 className="font-geist mt-3 text-[18px] leading-[130%] font-medium tracking-[-0.3px] text-slate-900 lg:text-[22px]">
            {post.title}
          </h3>
        </div>

        <div className="font-inter mt-6 flex items-center text-[12px] font-medium text-slate-500">
          <span>{post.date}</span>
        </div>
      </div>
    </Link>
  );
}