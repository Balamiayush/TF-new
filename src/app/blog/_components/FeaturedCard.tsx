import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FeaturedCardProps } from "../type";

export default function FeaturedCard({
  post,
  reversed = false,
  className = "",
}: FeaturedCardProps) {
  const getImageUrl = (imageSrc: string) => {
    if (!imageSrc) return "/placeholder-image.webp";
    if (
      imageSrc.startsWith("http://") ||
      imageSrc.startsWith("https://") ||
      imageSrc.startsWith("/")
    ) {
      return imageSrc;
    }
    const pbUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || "";
    return `${pbUrl}/api/files/${post.collectionId || "blog_posts"}/${post.id}/${imageSrc}`;
  };

  const imageSrc = getImageUrl(post.image);
  const slugPath = post.slug || post.id;

  return (
    <Link
      href={`/blog/${slugPath}`}
      className={`group flex cursor-pointer flex-col justify-between rounded-[8px] border border-slate-200 bg-slate-50 p-2 transition-all duration-300 hover:translate-y-[-2.5%] hover:bg-slate-100 md:col-span-2 md:flex-row md:gap-6 ${className}`}
    >
      <div
        className={`relative h-[240px] w-full overflow-hidden rounded-[6px] border border-black/5 md:h-full md:w-1/2 ${
          reversed ? "max-md:order-1" : ""
        }`}
      >
        <Image
          src={imageSrc}
          alt={post.title || "Blog featured image"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      <div
        className={`flex flex-1 flex-col justify-between p-4 max-md:mt-4 ${
          reversed ? "max-md:order-2" : ""
        }`}
      >
        <div>
          <div className="font-inter text-[12px] font-medium text-slate-800">
            {post.category}
          </div>

          <h3 className="font-geist mt-3 text-[20px] leading-[130%] font-medium tracking-[-0.3px] text-slate-900 transition-colors lg:text-[22px]">
            {post.title}
          </h3>

          <div className="font-inter mt-6 flex items-center gap-2 text-[12px] font-medium text-slate-800">
            <span>{post.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}