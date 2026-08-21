"use client";

import React from "react";
import LayoutWrapper from "../wrapper/LayoutWrapper";
import Image from "next/image";
import CardCom from "@/shared/ui/card/CardCom";
import { motion, AnimatePresence } from "framer-motion";
import BookADemoPageArrowIcon from "@/shared/icons/BookADemoPageArrowIcon";


export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  imageSrc?: string;
  hasArrow?: boolean;
}

export const RESOURCE_ITEMS: ResourceItem[] = [
  {
    id: "blog",
    title: "Blog",
    description: "Stories and solutions for the modern entrepreneur.",
    imageSrc:
      "https://res.cloudinary.com/dfajjqglx/image/upload/v1787305443/681a747e016303ee4eeaf811877cfc47feb39dd4_jmaa5b.png",
  },
  {
    id: "career",
    title: "Career",
    description:
      "Empowering narratives and practical solutions for today's entrepreneurs.",
    imageSrc:
      "https://res.cloudinary.com/dfajjqglx/image/upload/v1787305443/681a747e016303ee4eeaf811877cfc47feb39dd4_jmaa5b.png",
  },
  {
    id: "changelog",
    title: "Changelog",
    description: "Explore updates for entrepreneurs and solutions for success.",
    hasArrow: true,
  },
  {
    id: "case-studies",
    title: "Case studies",
    description:
      "Strategies help entrepreneurs. Our studies show ventures overcoming challenges.",
    hasArrow: true,
  },
];

const FEATURED_STORY = {
  category: "Marketing",
  date: "JUL 7, 2026",
  title:
    "Fraudology: Closing the chargeback representment gap between issuers and",
  imageSrc:
    "https://images.pexels.com/photos/4427925/pexels-photo-4427925.jpeg",
};


function ResourceCard({ item }: { item: ResourceItem }) {
  return (
    <div className="relative flex min-h-[180px] sm:h-[225px] w-full items-end overflow-hidden rounded-lg bg-[#F1F5F9] p-4 sm:p-6">
      <div className="z-10 flex max-w-[220px] flex-col gap-1.5 sm:gap-2">
        <p className="text-[22px] sm:text-[30px] leading-[110%] font-medium">
          {item.title}
        </p>
        <p className="text-[14px] sm:text-[16px] leading-[135%] text-slate-600">
          {item.description}
        </p>
      </div>

      {item.hasArrow ? (
        <div className="absolute top-4  right-4 sm:top-6 sm:right-6">
          <BookADemoPageArrowIcon className="w-[56px] h-[56px]" />
        </div>
      ) : item.imageSrc ? (
        <div className="absolute right-[-15%] sm:right-[-10%] bottom-0 opacity-80 sm:opacity-100">
          <div className="relative h-[140px] w-[200px] sm:h-[193px] sm:w-[280px]">
            <Image
              src={item.imageSrc}
              fill
              alt={item.title}
              className="object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

interface ResourcesDropdownProps {
  isOpen: boolean;
  onClose?: () => void;
}

export function ResourcesDropdown({ isOpen }: ResourcesDropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          data-lenis-prevent
          className="absolute top-full left-0 w-full rounded-b-[8px] bg-white pt-4 pb-6 shadow-xl"
        >
          <LayoutWrapper className="flex flex-col lg:flex-row gap-6">
            <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 gap-4">
              {RESOURCE_ITEMS.map((item) => (
                <ResourceCard key={item.id} item={item} />
              ))}
            </div>

            <div className="hidden lg:block w-[1px] bg-[#E2E8F0]" />

            <div className="w-full lg:w-[408px] shrink-0">
              <p className="mb-2 text-[14px] sm:text-[16px] text-slate-500">
                Recently updated blog
              </p>
              <CardCom className="flex flex-col" story={FEATURED_STORY} />
            </div>
          </LayoutWrapper>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ResourcesDropdown;