import React from "react";
import Image from "next/image";

export interface StoryItem {
  id?: string | number;
  title: string;
  category?: string;
  date?: string;
  imageSrc?: string;
}

interface CardComProps {
  story: StoryItem;
  className?: string;
}

export default function CardCom({ story, className = "" }: CardComProps) {
  return (
    <div
      className={`group flex shrink-0 cursor-pointer snap-start flex-col justify-between rounded-[8px] border border-slate-200 bg-slate-50 p-2 transition-all duration-300 md:w-full ${className}hover:bg-slate-100 hover:translate-y-[-2.5%] `}
    >
      <div>
        <div className="relative h-[256.5px] w-full overflow-hidden rounded-[6px] border border-black/5">
          {story?.imageSrc ? (
            <Image
              src={story.imageSrc}
              alt={story.title || "Blog cover image"}
              fill
              sizes="(max-width: 768px) 320px, (max-width: 1200px) 50vw, 33vw"
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          ) : null}
        </div>
        <div className="flex flex-col p-3">
          {story?.category && (
            <div className="font-inter text-[14px] leading-none font-medium text-slate-700">
              {story.category}
            </div>
          )}

          <h3 className="font-geist mt-4 text-[18px] leading-[125%] font-medium tracking-[-0.3px] text-slate-900 transition-colors">
            {story?.title}
          </h3>

          {story?.date && (
            <div className="font-inter mt-6 flex items-center gap-2 text-[12px] font-medium text-slate-800">
              <span>{story.date}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
