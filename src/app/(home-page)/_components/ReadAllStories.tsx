import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import React from "react";

const storiesData = [
  {
    id: 1,
    category: "Marketing",
    date: "JUL 7, 2026",
    title: "From Endpoint to API",
    bgClass: "bg-[#CB6BED]", // Solid Purple
    imageSrc: "https://images.pexels.com/photos/4427925/pexels-photo-4427925.jpeg", // Replace with image path if available
  },
  {
    id: 2,
    category: "Marketing",
    date: "JUL 7, 2026",
    title: "From Endpoint to API",
    bgClass: "bg-[#121317]", // Dark Card
    imageSrc: "https://images.pexels.com/photos/4427925/pexels-photo-4427925.jpeg", // Contains the "From Endpoint to API" preview design
  },
  {
    id: 3,
    category: "Marketing",
    date: "JUL 7, 2026",
    title: "From Endpoint to API",
    bgClass: "bg-[#0088D4]", // Solid Blue
    imageSrc: "https://images.pexels.com/photos/4427925/pexels-photo-4427925.jpeg", // Replace with image path if available
  },
];

export default function ReadAllStories() {
  return (
    <section className="relative w-full bg-white py-21">
      <LayoutWrapper>
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="font-geist max-w-[500px] text-[40px] font-normal leading-[120%] tracking-[0px] text-[#1A1A1A]">
            Get insights, tips, and updates from our team.
          </h2>

          <a
            href="#stories"
            className="rounded-lg bg-[#F8FAFC] px-5 py-3 font-inter text-xs font-medium text-[#1A1A1A] hover:bg-gray-100 transition-colors border border-gray-100"
          >
            Read all stories
          </a>
        </div>

        {/* Stories Grid Container */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {storiesData.map((story) => (
            <div key={story.id} className="group flex flex-col cursor-pointer">
              {/* Card Image / Background Banner Container */}
              <div
                className={`relative h-[256.5px] w-full overflow-hidden rounded-lg border border-gray-100 ${story.bgClass}`}
              >
                {story.imageSrc ? (
                  <img
                    src={story.imageSrc}
                    alt={story.title}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                ) : null}
              </div>

              {/* Card Metadata */}
              <div className="mt-4 flex items-center gap-1.5 font-inter text-[12px] font-medium uppercase leading-[100%] tracking-[0%] text-[#1A1A1A]/60">
                <span>{story.category}</span>
                <span>•</span>
                <span>{story.date}</span>
              </div>

              {/* Card Title */}
              <h3 className="font-geist mt-2 text-[18px] font-medium leading-[120%] tracking-tight text-[#1A1A1A] group-hover:text-blue-600 transition-colors">
                {story.title}
              </h3>
            </div>
          ))}
        </div>
      </LayoutWrapper>
    </section>
  );
}